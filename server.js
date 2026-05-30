/**
 * 智职AI — AI Model Gateway Server
 * Express backend with multi-model support, SSE streaming, token management
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const { generate, generateStream, PROVIDERS } = require('./lib/ai-gateway');
const { PROMPTS } = require('./lib/prompts');

const app = express();
const PORT = process.env.PORT || 3099;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// ============================================================
// API: List available models
// ============================================================
app.get('/api/models', (req, res) => {
  const modelList = Object.entries(PROVIDERS).map(([id, cfg]) => ({
    id,
    provider: cfg.api,
    model: cfg.model,
    context: cfg.context,
    // Determine "group" for UI
    group: (() => {
      if (cfg.api === 'openai') return 'OpenAI';
      if (cfg.api === 'anthropic') return 'Anthropic';
      if (cfg.api === 'gemini') return 'Google';
      if (cfg.api === 'deepseek') return 'DeepSeek';
      if (cfg.api === 'qwen') return '阿里云';
      if (cfg.api === 'doubao') return '字节跳动';
      if (cfg.api === 'minimax') return 'MiniMax';
      return '其他';
    })(),
  }));
  res.json({ models: modelList });
});

// ============================================================
// API: Unified generate (non-stream)
// ============================================================
app.post('/api/generate', async (req, res) => {
  try {
    const { model, messages, prompt, system, temperature, maxTokens, apiKey, endpoint, userModelConfig } = req.body;
    const result = await generate({
      model, messages, prompt, system,
      temperature, maxTokens, apiKey, endpoint,
      userModelConfig: userModelConfig || {},
    });
    res.json(result);
  } catch (err) {
    console.error('[/api/generate] 错误:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: Streaming generate (SSE)
// ============================================================
app.post('/api/generate/stream', async (req, res) => {
  const { model, messages, prompt, system, temperature, maxTokens, apiKey, endpoint, userModelConfig } = req.body;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const result = await generate({
      model, messages, prompt, system,
      temperature, maxTokens, apiKey, endpoint,
      userModelConfig: userModelConfig || {},
      stream: true,
    });

    const stream = result.content;
    if (!stream || typeof stream.pipe !== 'function') {
      res.write(`data: ${JSON.stringify({ content: result.content, done: true })}\n\n`);
      res.end();
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    stream.on('data', (chunk) => {
      buffer += decoder.decode(chunk, { stream: true });
      // Parse SSE chunks depending on provider
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content ||
                           parsed.choices?.[0]?.text ||
                           parsed.content?.[0]?.text ||
                           '';
            if (content) {
              res.write(`data: ${JSON.stringify({ content, done: false })}\n\n`);
            }
          } catch (e) { /* skip parse errors */ }
        }
      }
    });

    stream.on('end', () => {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    });

    stream.on('error', (err) => {
      res.write(`data: ${JSON.stringify({ error: err.message, done: true })}\n\n`);
      res.end();
    });

    req.on('close', () => {
      stream.destroy?.();
    });

  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message, done: true })}\n\n`);
    res.end();
  }
});

// ============================================================
// API: Resume Analysis
// ============================================================
app.post('/api/resume/analyze', async (req, res) => {
  try {
    const { resume_text, model, userModelConfig } = req.body;
    const prompt = PROMPTS.resumeAnalyze(resume_text);
    const result = await generate({
      model: model || 'deepseek-v4-flash',
      system: prompt.system,
      prompt: prompt.user,
      maxTokens: 4096,
      userModelConfig: userModelConfig || {},
    });
    // Try to parse JSON from response
    let parsed;
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: result.content };
    } catch (e) {
      parsed = { raw: result.content };
    }
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: Job Matching
// ============================================================
app.post('/api/job/match', async (req, res) => {
  try {
    const { skills, experience, model, userModelConfig } = req.body;
    const prompt = PROMPTS.jobMatch(skills, experience);
    const result = await generate({
      model: model || 'deepseek-v4-flash',
      system: prompt.system,
      prompt: prompt.user,
      maxTokens: 4096,
      userModelConfig: userModelConfig || {},
    });
    let parsed;
    try {
      const arrMatch = result.content.match(/\[[\s\S]*\]/);
      parsed = arrMatch ? JSON.parse(arrMatch[0]) : { raw: result.content };
    } catch (e) {
      parsed = { raw: result.content };
    }
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: Interview Evaluation
// ============================================================
app.post('/api/interview/evaluate', async (req, res) => {
  try {
    const { answer, question, position, model, userModelConfig } = req.body;
    const prompt = PROMPTS.interviewEvaluate(question, answer, position || '前端开发');
    const result = await generate({
      model: model || 'deepseek-v4-flash',
      system: prompt.system,
      prompt: prompt.user,
      maxTokens: 2048,
      userModelConfig: userModelConfig || {},
    });
    let parsed;
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 10, feedback: result.content };
    } catch (e) {
      parsed = { score: 10, feedback: result.content };
    }
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: Interview Report
// ============================================================
app.post('/api/interview/report', async (req, res) => {
  try {
    const { conversation, model, userModelConfig } = req.body;
    const prompt = PROMPTS.interviewReport(conversation);
    const result = await generate({
      model: model || 'deepseek-v4-flash',
      system: prompt.system,
      prompt: prompt.user,
      maxTokens: 4096,
      userModelConfig: userModelConfig || {},
    });
    let parsed;
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: result.content };
    } catch (e) {
      parsed = { raw: result.content };
    }
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: Resume Generation
// ============================================================
app.post('/api/resume/generate', async (req, res) => {
  try {
    const { formData, model, userModelConfig } = req.body;
    const prompt = PROMPTS.resumeGenerate(formData);
    const result = await generate({
      model: model || 'deepseek-v4-flash',
      system: prompt.system,
      prompt: prompt.user,
      maxTokens: 8192,
      userModelConfig: userModelConfig || {},
    });
    res.json({ content: result.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: General Chat
// ============================================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, model, userModelConfig } = req.body;
    const prompt = PROMPTS.generalChat(message, context);
    const result = await generate({
      model: model || 'gpt-4o-mini',
      system: prompt.system,
      prompt: prompt.user,
      context: context,
      maxTokens: 2048,
      userModelConfig: userModelConfig || {},
    });
    res.json({ content: result.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// API: Health Check
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now(), models_available: Object.keys(PROVIDERS).length });
});

// ============================================================
// Start Server
// ============================================================
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║        智职AI · AI Gateway Server           ║
║──────────────────────────────────────────────║
║  API:   http://localhost:${PORT}/api          ║
║  Web:   http://localhost:${PORT}/app.html     ║
║  Models: ${Object.keys(PROVIDERS).length} 种模型已注册        ║
╚══════════════════════════════════════════════╝
  `);
});

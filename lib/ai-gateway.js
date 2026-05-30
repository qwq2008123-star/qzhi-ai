/**
 * AI Provider Gateway — Unified Model Interface
 * Each model has INDEPENDENT API endpoint + API Key configuration
 * 
 * aiProvider.generate({ model, messages, apiKey, endpoint })
 *   → automatically routes to correct provider with user's own config
 */

// ============================================================
// PROVIDER CONFIG — each model has its own API details
// ============================================================
const PROVIDERS = {
  // ===== OpenAI =====
  'gpt-4o': {
    api: 'openai',
    model: 'gpt-4o',
    context: 128000,
    defaultEndpoint: 'https://api.openai.com/v1',
    docs: 'https://platform.openai.com/api-keys',
  },
  'gpt-4o-mini': {
    api: 'openai',
    model: 'gpt-4o-mini',
    context: 128000,
    defaultEndpoint: 'https://api.openai.com/v1',
    docs: 'https://platform.openai.com/api-keys',
  },

  // ===== Anthropic Claude =====
  'claude-3-opus': {
    api: 'anthropic',
    model: 'claude-3-opus-20240229',
    context: 200000,
    defaultEndpoint: 'https://api.anthropic.com/v1',
    docs: 'https://console.anthropic.com/',
  },
  'claude-3-sonnet': {
    api: 'anthropic',
    model: 'claude-3-sonnet-20240229',
    context: 200000,
    defaultEndpoint: 'https://api.anthropic.com/v1',
    docs: 'https://console.anthropic.com/',
  },

  // ===== Google Gemini =====
  'gemini-1.5-pro': {
    api: 'gemini',
    model: 'gemini-1.5-pro',
    context: 1000000,
    defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta',
    docs: 'https://aistudio.google.com/app/apikey',
  },
  'gemini-1.5-flash': {
    api: 'gemini',
    model: 'gemini-1.5-flash',
    context: 1000000,
    defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta',
    docs: 'https://aistudio.google.com/app/apikey',
  },

  // ===== DeepSeek =====
  'deepseek-v4': {
    api: 'deepseek',
    model: 'deepseek-chat',
    context: 64000,
    defaultEndpoint: 'https://api.deepseek.com',
    docs: 'https://platform.deepseek.com/api_keys',
  },
  'deepseek-v4-flash': {
    api: 'deepseek',
    model: 'deepseek-chat',
    context: 64000,
    defaultEndpoint: 'https://api.deepseek.com',
    docs: 'https://platform.deepseek.com/api_keys',
  },

  // ===== 阿里云 通义千问 =====
  'qwen-max': {
    api: 'qwen',
    model: 'qwen-max',
    context: 32000,
    defaultEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    docs: 'https://help.aliyun.com/document_detail/2712195.html',
  },
  'qwen-plus': {
    api: 'qwen',
    model: 'qwen-plus',
    context: 32000,
    defaultEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    docs: 'https://help.aliyun.com/document_detail/2712195.html',
  },

  // ===== 字节跳动 豆包 =====
  'doubao-pro': {
    api: 'doubao',
    model: 'doubao-pro-32k',
    context: 32000,
    defaultEndpoint: 'https://ark.cn-beijing.volces.com/api/v3',
    docs: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey',
  },
  'doubao-lite': {
    api: 'doubao',
    model: 'doubao-lite-32k',
    context: 32000,
    defaultEndpoint: 'https://ark.cn-beijing.volces.com/api/v3',
    docs: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey',
  },

  // ===== MiniMax =====
  'minimax-2.7': {
    api: 'minimax',
    model: 'minimax-2.7-sft',
    context: 128000,
    defaultEndpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
    docs: 'https://platform.minimaxi.com/user-center/api-key-management',
  },
};

// ============================================================
// PER-MODEL API CONFIG STORE
// Each model's endpoint + apiKey are passed from frontend config
// ============================================================

/**
 * Resolve effective config for a model.
 * Priority:  opts.apiKey/endpoint > userConfig > env default
 */
function resolveConfig(modelId, opts) {
  // Check if it's a custom model (starts with custom prefix or has underscore pattern)
  const userConfig = opts.userModelConfig || {};
  
  // Custom model lookup from user config
  const modelConfig = userConfig[modelId];
  
  if (modelConfig) {
    // This is a custom model
    return {
      provider: {
        api: 'custom',
        model: modelId,
        context: 4096,
        defaultEndpoint: modelConfig.endpoint || 'https://api.example.com/v1',
      },
      apiKey: modelConfig.apiKey || opts.apiKey || '',
      endpoint: modelConfig.endpoint || opts.endpoint || '',
    };
  }
  
  const provider = PROVIDERS[modelId];
  if (!provider) throw new Error(`未知模型: ${modelId}`);

  const apiKey = opts.apiKey || process.env[`${provider.api.toUpperCase()}_API_KEY`] || '';
  const endpoint = opts.endpoint || provider.defaultEndpoint;

  return { provider, apiKey, endpoint };
}

// ============================================================
// CALL EACH PROVIDER
// ============================================================

async function callOpenAI(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[gpt-4o] API Key 未配置。请到 https://platform.openai.com/api-keys 获取`);
  const body = {
    model: provider.model,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 4096,
  };
  if (opts.stream) body.stream = true;

  const base = opts.endpoint || provider.defaultEndpoint;
  const url = `${base}/chat/completions`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${opts.apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callAnthropic(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[Claude] API Key 未配置。请到 https://console.anthropic.com/ 获取`);
  let systemMsg = '';
  const msgs = [];
  for (const m of messages) {
    if (m.role === 'system') systemMsg = m.content;
    else msgs.push({ role: m.role, content: m.content });
  }
  const body = {
    model: provider.model,
    max_tokens: opts.maxTokens ?? 4096,
    messages: msgs,
    temperature: opts.temperature ?? 0.7,
  };
  if (systemMsg) body.system = systemMsg;
  if (opts.stream) body.stream = true;

  const base = opts.endpoint || provider.defaultEndpoint;
  const res = await fetch(`${base}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': opts.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.content[0].text;
}

async function callGemini(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[Gemini] API Key 未配置。请到 https://aistudio.google.com/app/apikey 获取`);
  const contents = messages.filter(m => m.role !== 'system').map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
  const systemInstruction = messages.find(m => m.role === 'system');
  const key = opts.apiKey;

  let url = `${opts.endpoint || provider.defaultEndpoint}/models/${provider.model}:generateContent?key=${key}`;
  if (opts.stream) url = `${opts.endpoint || provider.defaultEndpoint}/models/${provider.model}:streamGenerateContent?alt=sse&key=${key}`;

  const body = { contents };
  if (systemInstruction) body.system_instruction = { parts: [{ text: systemInstruction.content }] };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callDeepSeek(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[DeepSeek] API Key 未配置。请到 https://platform.deepseek.com/api_keys 获取`);
  const body = {
    model: provider.model,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 4096,
  };
  if (opts.stream) body.stream = true;

  const base = opts.endpoint || provider.defaultEndpoint;
  const res = await fetch(`${base}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${opts.apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${await res.text()}`);
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callQwen(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[通义千问] API Key 未配置。请到 https://help.aliyun.com/document_detail/2712195.html 获取`);
  const body = {
    model: provider.model,
    input: { messages },
    parameters: {
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.maxTokens ?? 4096,
      result_format: 'message',
      incremental_output: !!opts.stream,
    },
  };
  const res = await fetch(opts.endpoint || provider.defaultEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${opts.apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Qwen ${res.status}: ${await res.text()}`);
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.output?.choices?.[0]?.message?.content || '';
}

async function callDoubao(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[豆包] API Key 未配置。请到 https://console.volcengine.com/ark/ 获取`);
  return callOpenAI(provider, messages, { ...opts, endpoint: opts.endpoint || provider.defaultEndpoint });
}

async function callMiniMax(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[MiniMax] API Key 未配置。请到 https://platform.minimaxi.com/ 获取`);
  const body = {
    model: provider.model,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 4096,
    stream: !!opts.stream,
  };
  const res = await fetch(opts.endpoint || provider.defaultEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${opts.apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`MiniMax ${res.status}: ${await res.text()}`);
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.choices?.[0]?.message?.content || data.reply || '';
}

// ===== CUSTOM MODEL CALL (Generic OpenAI-compatible API) =====
async function callCustomModel(provider, messages, opts) {
  if (!opts.apiKey) throw new Error(`[自定义模型] API Key 未配置。请在设置中添加您的 API Key`);
  const body = {
    model: provider.model,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 4096,
  };
  if (opts.stream) body.stream = true;

  const base = opts.endpoint || provider.defaultEndpoint;
  
  // Try OpenAI-compatible endpoint format
  let url = `${base}/chat/completions`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${opts.apiKey}`
    },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`自定义模型 ${res.status}: ${errorText}`);
  }
  
  if (opts.stream) return res.body;
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ============================================================
// PROVIDER CALL MAP
// ============================================================
const PROVIDER_CALLS = {
  openai: callOpenAI,
  anthropic: callAnthropic,
  gemini: callGemini,
  deepseek: callDeepSeek,
  qwen: callQwen,
  doubao: callDoubao,
  minimax: callMiniMax,
  custom: callCustomModel,
};

// ============================================================
// UNIFIED GENERATE
// ============================================================

/**
 * Unified AI generation — each model routes to its own API
 * 
 * @param {Object} opts
 * @param {string} opts.model - Model ID
 * @param {Array}  opts.messages - [{role, content}]
 * @param {string} opts.prompt - Shortcut: single prompt
 * @param {string} opts.system - System prompt
 * @param {number} opts.temperature - 0-2
 * @param {number} opts.maxTokens
 * @param {boolean} opts.stream - SSE streaming
 * @param {Object} opts.userModelConfig - Per-model config { modelId: { apiKey, endpoint } }
 * @param {number} opts.retries - Retry count (default 3)
 * @returns {Object} { content, model, provider }
 */
async function generate(opts) {
  const modelId = opts.model || 'gpt-4o';
  const { provider, apiKey, endpoint } = resolveConfig(modelId, opts);

  let messages = opts.messages || [];
  if (opts.prompt && messages.length === 0) {
    messages = [{ role: 'user', content: opts.prompt }];
  }
  if (opts.system) {
    messages = [{ role: 'system', content: opts.system }, ...messages];
  }
  if (opts.context) {
    messages = [...opts.context, ...messages];
  }

  const callFn = PROVIDER_CALLS[provider.api];
  if (!callFn) throw new Error(`未实现的API: ${provider.api}`);

  const maxRetries = opts.retries ?? 3;
  let lastErr;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await callFn(provider, messages, {
        temperature: opts.temperature ?? 0.7,
        maxTokens: opts.maxTokens ?? 4096,
        stream: opts.stream ?? false,
        apiKey,
        endpoint,
      });

      return {
        content: result,
        model: modelId,
        provider: provider.api,
        endpoint: endpoint,
      };
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 500;
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw lastErr || new Error(`[${modelId}] AI 生成失败，请检查 API Key 和 Endpoint 配置`);
}

/**
 * Generate with streaming (SSE)
 */
async function generateStream(opts) {
  const result = await generate({ ...opts, stream: true });
  return result.content;
}

module.exports = {
  generate,
  generateStream,
  PROVIDERS,
  resolveConfig,
};

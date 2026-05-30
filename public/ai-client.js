/**
 * 智职AI — Frontend AI Client
 * Unified API calls for all model operations
 */
const AiClient = {
  BASE: '',  // Set to backend URL if different origin

  /**
   * Fetch available models
   */
  async getModels() {
    const res = await fetch(`${this.BASE}/api/models`);
    return res.json();
  },

  /**
   * Unified generate (no stream)
   */
  async generate({ model, messages, prompt, system, temperature, maxTokens, apiKey, endpoint, userModelConfig }) {
    const res = await fetch(`${this.BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, prompt, system, temperature, maxTokens, apiKey, endpoint, userModelConfig }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '请求失败');
    return res.json();
  },

  /**
   * Streaming generate — returns an EventSource-compatible endpoint
   * Instead, we use fetch + ReadableStream for SSE
   */
  async generateStream({ model, prompt, system, temperature, maxTokens, apiKey, endpoint, userModelConfig, onChunk, onDone, onError }) {
    try {
      const res = await fetch(`${this.BASE}/api/generate/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, system, temperature, maxTokens, apiKey, endpoint, userModelConfig }),
      });
      if (!res.ok) throw new Error('Stream request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.done) { onDone?.(); return; }
              if (data.error) { onError?.(data.error); return; }
              if (data.content) onChunk?.(data.content);
            } catch (e) { /* skip */ }
          }
        }
      }
      onDone?.();
    } catch (err) {
      onError?.(err.message);
    }
  },

  /**
   * Resume Analysis
   */
  async analyzeResume(resumeText, model) {
    const res = await fetch(`${this.BASE}/api/resume/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resumeText, model }),
    });
    return res.json();
  },

  /**
   * Resume Generation
   */
  async generateResume(formData, model) {
    const res = await fetch(`${this.BASE}/api/resume/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData, model }),
    });
    return res.json();
  },

  /**
   * Job Matching
   */
  async matchJobs(skills, experience, model) {
    const res = await fetch(`${this.BASE}/api/job/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills, experience, model }),
    });
    return res.json();
  },

  /**
   * Interview Evaluate
   */
  async evaluateAnswer(question, answer, position, model) {
    const res = await fetch(`${this.BASE}/api/interview/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer, position, model }),
    });
    return res.json();
  },

  /**
   * Interview Report
   */
  async generateReport(conversation, model) {
    const res = await fetch(`${this.BASE}/api/interview/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation, model }),
    });
    return res.json();
  },

  /**
   * General Chat
   */
  async chat(message, context, model) {
    const res = await fetch(`${this.BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, model }),
    });
    return res.json();
  },
};

// Export for module usage
if (typeof module !== 'undefined') module.exports = AiClient;

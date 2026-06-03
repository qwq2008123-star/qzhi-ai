/**
 * 智职AI — Frontend AI Client
 * Unified API calls for all model operations
 * v2 — Auto-injects apiKey/endpoint/userModelConfig from localStorage
 */
var AiClient = {
  BASE: '',

  _getConfig: function() {
    var mid = typeof getCurrentModelId === 'function' ? getCurrentModelId() : 'deepseek-v4-flash';
    var key = '';
    var ep = '';
    var ucm = {};
    try {
      if (typeof getCurrentApiKey === 'function') key = getCurrentApiKey();
      if (typeof getCurrentEndpoint === 'function') ep = getCurrentEndpoint();
      if (typeof aiGetModelConfigs === 'function') {
        ucm = aiGetModelConfigs();
      } else {
        var mc = localStorage.getItem('ai_model_configs');
        if (mc) ucm = JSON.parse(mc);
      }
    } catch(e) {}
    return { model: mid, apiKey: key, endpoint: ep, userModelConfig: ucm };
  },

  async getModels() {
    var res = await fetch(this.BASE + '/api/models');
    return res.json();
  },

  async generate(opts) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: opts.model || cfg.model,
        messages: opts.messages,
        prompt: opts.prompt,
        system: opts.system,
        temperature: opts.temperature,
        maxTokens: opts.maxTokens,
        apiKey: opts.apiKey || cfg.apiKey,
        endpoint: opts.endpoint || cfg.endpoint,
        userModelConfig: opts.userModelConfig || cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '请求失败');
    return res.json();
  },

  async generateStream(opts) {
    var cfg = this._getConfig();
    try {
      var res = await fetch(this.BASE + '/api/generate/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: opts.model || cfg.model,
          prompt: opts.prompt,
          system: opts.system,
          temperature: opts.temperature,
          maxTokens: opts.maxTokens,
          apiKey: opts.apiKey || cfg.apiKey,
          endpoint: opts.endpoint || cfg.endpoint,
          userModelConfig: opts.userModelConfig || cfg.userModelConfig,
        }),
      });
      if (!res.ok) throw new Error('Stream request failed');
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      while (true) {
        var rd = await reader.read();
        if (rd.done) break;
        buffer += decoder.decode(rd.value, { stream: true });
        var lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.indexOf('data: ') === 0) {
            try {
              var data = JSON.parse(line.slice(6));
              if (data.done) { opts.onDone && opts.onDone(); return; }
              if (data.error) { opts.onError && opts.onError(data.error); return; }
              if (data.content) opts.onChunk && opts.onChunk(data.content);
            } catch(e) {}
          }
        }
      }
      opts.onDone && opts.onDone();
    } catch(err) {
      opts.onError && opts.onError(err.message);
    }
  },

  async analyzeResume(resumeText, model) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/resume/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resume_text: resumeText,
        model: model || cfg.model,
        apiKey: cfg.apiKey,
        endpoint: cfg.endpoint,
        userModelConfig: cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '简历分析失败');
    return res.json();
  },

  async generateResume(formData, model) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/resume/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData: formData,
        model: model || cfg.model,
        apiKey: cfg.apiKey,
        endpoint: cfg.endpoint,
        userModelConfig: cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '简历生成失败');
    return res.json();
  },

  async matchJobs(skills, experience, model) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/job/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skills: skills,
        experience: experience,
        model: model || cfg.model,
        apiKey: cfg.apiKey,
        endpoint: cfg.endpoint,
        userModelConfig: cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '岗位匹配失败');
    return res.json();
  },

  async evaluateAnswer(question, answer, position, model) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question,
        answer: answer,
        position: position,
        model: model || cfg.model,
        apiKey: cfg.apiKey,
        endpoint: cfg.endpoint,
        userModelConfig: cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '评估失败');
    return res.json();
  },

  async generateReport(conversation, model) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/interview/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation: conversation,
        model: model || cfg.model,
        apiKey: cfg.apiKey,
        endpoint: cfg.endpoint,
        userModelConfig: cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '报告生成失败');
    return res.json();
  },

  async chat(message, context, model) {
    var cfg = this._getConfig();
    var res = await fetch(this.BASE + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        context: context,
        model: model || cfg.model,
        apiKey: cfg.apiKey,
        endpoint: cfg.endpoint,
        userModelConfig: cfg.userModelConfig,
      }),
    });
    if (!res.ok) throw new Error((await res.json()).error || '对话失败');
    return res.json();
  },
};

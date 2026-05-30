/**
 * 智职AI — AI Model Switcher + Custom Model Manager
 * Each model has INDEPENDENT API endpoint + API Key
 * Users can add custom models via modal
 * Usage: 
 * 1. Include: <script src="public/ai-model-switcher.js"></script>
 * 2. Add HTML: <div id="ai-model-selector"></div>
 * 3. Call: renderModelSelector('ai-model-selector')
 */

(function() {
  const MODEL_META = {
    'gpt-4o':           { icon: '🤖', provider: 'OpenAI',      color: '#10a37f', latency: '~1.2s', docs: 'https://platform.openai.com/api-keys', defaultEndpoint: 'https://api.openai.com/v1' },
    'gpt-4o-mini':      { icon: '🤖', provider: 'OpenAI',      color: '#10a37f', latency: '~0.8s', docs: 'https://platform.openai.com/api-keys', defaultEndpoint: 'https://api.openai.com/v1' },
    'claude-3-opus':    { icon: '✨', provider: 'Anthropic',   color: '#d97706', latency: '~2s',   docs: 'https://console.anthropic.com/', defaultEndpoint: 'https://api.anthropic.com/v1' },
    'claude-3-sonnet':  { icon: '✨', provider: 'Anthropic',   color: '#d97706', latency: '~1.5s', docs: 'https://console.anthropic.com/', defaultEndpoint: 'https://api.anthropic.com/v1' },
    'gemini-1.5-pro':   { icon: '🔮', provider: 'Google',      color: '#4285f4', latency: '~1s',   docs: 'https://aistudio.google.com/app/apikey', defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta' },
    'gemini-1.5-flash': { icon: '🔮', provider: 'Google',      color: '#4285f4', latency: '~0.5s', docs: 'https://aistudio.google.com/app/apikey', defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta' },
    'deepseek-v4':      { icon: '🧠', provider: 'DeepSeek',    color: '#4f46e5', latency: '~1s',   docs: 'https://platform.deepseek.com/api_keys', defaultEndpoint: 'https://api.deepseek.com' },
    'deepseek-v4-flash':{ icon: '🧠', provider: 'DeepSeek',    color: '#6366f1', latency: '~0.3s', docs: 'https://platform.deepseek.com/api_keys', defaultEndpoint: 'https://api.deepseek.com' },
    'qwen-max':         { icon: '🌐', provider: '阿里云',      color: '#ff6a00', latency: '~1.5s', docs: 'https://help.aliyun.com/document_detail/2712195.html', defaultEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation' },
    'qwen-plus':        { icon: '🌐', provider: '阿里云',      color: '#ff6a00', latency: '~1s',   docs: 'https://help.aliyun.com/document_detail/2712195.html', defaultEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation' },
    'doubao-pro':       { icon: '🍀', provider: '字节跳动',    color: '#00c853', latency: '~1.2s', docs: 'https://console.volcengine.com/ark/', defaultEndpoint: 'https://ark.cn-beijing.volces.com/api/v3' },
    'doubao-lite':      { icon: '🍀', provider: '字节跳动',    color: '#00c853', latency: '~0.6s', docs: 'https://console.volcengine.com/ark/', defaultEndpoint: 'https://ark.cn-beijing.volces.com/api/v3' },
    'minimax-2.7':      { icon: '🎯', provider: 'MiniMax',     color: '#22d3ee', latency: '~0.8s', docs: 'https://platform.minimaxi.com/', defaultEndpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2' },
  };

  const BUILTIN_GROUPS = ['OpenAI', 'Anthropic', 'Google', 'DeepSeek', '阿里云', '字节跳动', 'MiniMax'];

  let selectedModel = localStorage.getItem('ai_global_model') || 'deepseek-v4-flash';
  let isOpen = false;
  let config = { position: 'top-right', defaultTab: 'all' };
  let expandedModel = null;

  // ===== Custom Models Storage =====
  function getCustomModels() {
    try { return JSON.parse(localStorage.getItem('ai_custom_models') || '[]'); }
    catch(e) { return []; }
  }
  function setCustomModels(list) {
    localStorage.setItem('ai_custom_models', JSON.stringify(list));
  }
  function addCustomModel(model) {
    var list = getCustomModels();
    list.push(model);
    setCustomModels(list);
  }
  function deleteCustomModel(id) {
    var list = getCustomModels().filter(function(m) { return m.id !== id; });
    setCustomModels(list);
    if (selectedModel === id) setModel('deepseek-v4-flash');
  }

  // ===== Per-model API config =====
  function getModelConfigs() {
    try { return JSON.parse(localStorage.getItem('ai_model_configs') || '{}'); }
    catch(e) { return {}; }
  }
  function setModelConfig(modelId, key, endpoint) {
    var configs = getModelConfigs();
    configs[modelId] = { apiKey: key, endpoint: endpoint };
    localStorage.setItem('ai_model_configs', JSON.stringify(configs));
  }
  function getModelConfig(modelId) {
    var configs = getModelConfigs();
    return configs[modelId] || { apiKey: '', endpoint: '' };
  }

  function isCustomModel(id) {
    return getCustomModels().some(function(m) { return m.id === id; });
  }

  function getCustomModel(id) {
    var list = getCustomModels();
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }

  // ===== STYLES =====
  function loadStyles() {
    var css = document.createElement('style');
    css.textContent = `
.ai-switcher-fab{position:fixed;z-index:9999;width:48px;height:48px;border-radius:16px;border:1px solid rgba(139,92,246,0.12);background:linear-gradient(135deg,rgba(20,12,50,0.85),rgba(10,6,30,0.9));backdrop-filter:blur(24px) saturate(1.4);box-shadow:0 4px 24px rgba(99,102,241,0.2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:all .3s;color:#a78bfa}
.ai-switcher-fab:hover{transform:scale(1.08);box-shadow:0 8px 40px rgba(99,102,241,0.3)}
.ai-switcher-fab.top-right{top:76px;right:20px}
.ai-switcher-fab.bottom-right{bottom:24px;right:24px}
.ai-switcher-fab .pulse-dot{position:absolute;top:3px;right:3px;width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px rgba(74,222,128,0.4);animation:aiPulse 2s ease-in-out infinite}
@keyframes aiPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.3)}}

.ai-switcher-panel{position:fixed;z-index:9998;width:460px;max-height:580px;border-radius:20px;border:1px solid rgba(139,92,246,0.08);background:rgba(10,6,30,0.94);backdrop-filter:blur(32px) saturate(1.5);box-shadow:0 20px 80px rgba(0,0,0,0.55);overflow:hidden;display:none;flex-direction:column}
.ai-switcher-panel.open{display:flex}
.ai-switcher-panel.top-right{top:132px;right:20px}
.ai-switcher-panel.bottom-right{bottom:80px;right:24px}
.ai-switcher-panel .panel-header{padding:14px 20px;border-bottom:1px solid rgba(139,92,246,0.06);background:linear-gradient(135deg,rgba(25,15,55,0.5),rgba(12,8,35,0.3));flex-shrink:0}
.ai-switcher-panel .panel-header .title{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:#a78bfa}
.ai-switcher-panel .panel-header .sub{font-size:10px;color:rgba(148,163,184,0.2);margin-top:2px}
.ai-switcher-panel .panel-body{flex:1;overflow-y:auto;padding:12px 16px}
.ai-switcher-panel .panel-body::-webkit-scrollbar{width:3px}
.ai-switcher-panel .panel-body::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.08);border-radius:2px}

.ai-group-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.ai-group-tab{padding:4px 10px;border-radius:6px;font-size:9px;font-family:'Orbitron',sans-serif;border:1px solid rgba(255,255,255,0.02);cursor:pointer;transition:all .3s;background:transparent;color:rgba(148,163,184,0.15);letter-spacing:0.3px}
.ai-group-tab:hover{color:rgba(148,163,184,0.4)}
.ai-group-tab.active{background:rgba(99,102,241,0.06);border-color:rgba(99,102,241,0.08);color:#a78bfa}

.ai-model-card{border-radius:12px;border:1px solid rgba(255,255,255,0.015);cursor:pointer;transition:all .35s;margin-bottom:6px;background:rgba(255,255,255,0.003);overflow:hidden}
.ai-model-card:hover{border-color:rgba(139,92,246,0.05);background:rgba(99,102,241,0.008)}
.ai-model-card.selected{border-color:rgba(99,102,241,0.1);background:rgba(99,102,241,0.02)}
.ai-model-card.custom{border-color:rgba(34,197,94,0.06);background:rgba(34,197,94,0.005)}
.ai-model-card .card-row{display:flex;align-items:center;gap:10px;padding:10px 12px;position:relative}
.ai-model-card .glow-bar{position:absolute;left:0;top:4px;bottom:4px;width:2px;border-radius:0 2px 2px 0;opacity:0;transition:all .4s}
.ai-model-card.selected .glow-bar{opacity:1}
.ai-model-card .icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;background:rgba(255,255,255,0.01)}
.ai-model-card .info{flex:1;min-width:0}
.ai-model-card .info .name{font-size:12px;font-weight:600;color:rgba(255,255,255,0.65);margin-bottom:1px}
.ai-model-card .info .name .badge{font-size:8px;font-weight:400;color:rgba(148,163,184,0.15);margin-left:4px}
.ai-model-card .info .name .custom-tag{padding:1px 5px;border-radius:4px;font-size:7px;background:rgba(34,197,94,0.08);color:#4ade80;margin-left:4px}
.ai-model-card .info .provider{font-size:9px;color:rgba(148,163,184,0.15)}
.ai-model-card .api-indicator{width:6px;height:6px;border-radius:50%;flex-shrink:0;transition:all .3s}
.ai-model-card .api-indicator.configured{background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,0.3)}
.ai-model-card .api-indicator.unconfigured{background:rgba(148,163,184,0.08)}
.ai-model-card .del-custom{width:20px;height:20px;border-radius:6px;border:none;background:rgba(239,68,68,0.08);color:#f87171;cursor:pointer;font-size:10px;display:none;align-items:center;justify-content:center;transition:all .2s}
.ai-model-card .del-custom:hover{background:rgba(239,68,68,0.2)}
.ai-model-card.custom .del-custom{display:flex}
.ai-add-btn{width:100%;padding:8px;border-radius:10px;border:1px dashed rgba(99,102,241,0.08);background:rgba(99,102,241,0.01);color:rgba(148,163,184,0.2);cursor:pointer;font-size:10px;font-family:'Orbitron',sans-serif;transition:all .3s;text-align:center;margin-top:6px}
.ai-add-btn:hover{border-color:rgba(99,102,241,0.15);color:#a78bfa;background:rgba(99,102,241,0.02)}

.ai-model-api{padding:0 14px 10px;display:none}
.ai-model-api.open{display:block}
.ai-model-api .api-row{display:flex;gap:6px;margin-bottom:5px}
.ai-model-api .api-row input{flex:1;background:rgba(0,0,0,0.15);border:1px solid rgba(139,92,246,0.03);border-radius:6px;padding:5px 8px;font-size:10px;color:rgba(255,255,255,0.5);outline:none;font-family:'Plus Jakarta Sans',sans-serif}
.ai-model-api .api-row input:focus{border-color:rgba(139,92,246,0.08);color:rgba(255,255,255,0.7)}
.ai-model-api .api-row input::placeholder{color:rgba(148,163,184,0.06)}
.ai-model-api .api-key-input{-webkit-text-security:disc;text-security:disc}
.ai-model-api .api-save{width:100%;padding:4px;border-radius:5px;border:none;background:rgba(99,102,241,0.06);color:#818cf8;cursor:pointer;font-size:9px;font-family:'Orbitron',sans-serif;transition:all .2s;letter-spacing:0.3px}
.ai-model-api .api-save:hover{background:rgba(99,102,241,0.1)}
.ai-model-api .api-docs{font-size:8px;color:rgba(148,163,184,0.05);text-align:center;margin-top:4px}
.ai-model-api .api-docs a{color:rgba(148,163,184,0.08);text-decoration:none}
.ai-model-api .api-docs a:hover{color:rgba(148,163,184,0.2)}
.ai-model-api .api-label{font-size:8px;color:rgba(148,163,184,0.08);margin-bottom:2px;font-family:'Orbitron',sans-serif;letter-spacing:0.3px}

/* ===== CUSTOM MODAL ===== */
.ai-modal-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.6);backdrop-filter:blur(12px);display:none;align-items:center;justify-content:center;animation:modalFade .25s ease-out}
.ai-modal-overlay.open{display:flex}
@keyframes modalFade{from{opacity:0}to{opacity:1}}
.ai-modal{width:440px;max-width:calc(100vw - 40px);border-radius:20px;border:1px solid rgba(139,92,246,0.08);background:rgba(12,8,35,0.96);backdrop-filter:blur(32px) saturate(1.5);box-shadow:0 24px 100px rgba(0,0,0,0.6),0 0 0 1px rgba(139,92,246,0.04);overflow:hidden;animation:modalIn .3s cubic-bezier(.4,0,.2,1)}
@keyframes modalIn{from{transform:translateY(20px) scale(0.96);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
.ai-modal-header{padding:16px 20px;border-bottom:1px solid rgba(139,92,246,0.06);background:linear-gradient(135deg,rgba(25,15,55,0.5),rgba(12,8,35,0.3));display:flex;align-items:center;gap:10px}
.ai-modal-header h3{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:#a78bfa;margin:0;flex:1}
.ai-modal-close{width:28px;height:28px;border-radius:8px;border:none;background:rgba(148,163,184,0.03);color:rgba(148,163,184,0.2);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .3s;flex-shrink:0}
.ai-modal-close:hover{background:rgba(239,68,68,0.08);color:#f87171}
.ai-modal-body{padding:20px}
.ai-modal .fg{margin-bottom:14px}
.ai-modal .fg label{display:block;font-size:11px;color:rgba(148,163,184,0.35);margin-bottom:5px;font-weight:500}
.ai-modal .fg input,.ai-modal .fg select{width:100%;background:rgba(0,0,0,0.2);border:1px solid rgba(139,92,246,0.04);border-radius:10px;padding:10px 14px;font-size:13px;color:rgba(255,255,255,0.8);outline:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .3s}
.ai-modal .fg input:focus,.ai-modal .fg select:focus{border-color:rgba(139,92,246,0.15);background:rgba(99,102,241,0.02)}
.ai-modal .fg input::placeholder{color:rgba(148,163,184,0.08)}
.ai-modal .fg select option{background:#0a0823;color:#fff}
.ai-modal .fg .hint{font-size:10px;color:rgba(148,163,184,0.08);margin-top:4px}
.ai-modal-submit{width:100%;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;cursor:pointer;font-size:13px;font-family:'Orbitron',sans-serif;font-weight:700;letter-spacing:0.5px;transition:all .3s;box-shadow:0 4px 20px rgba(99,102,241,0.2)}
.ai-modal-submit:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.3)}
.ai-modal-submit:disabled{opacity:0.4;cursor:not-allowed;transform:none}

@media(max-width:480px){.ai-switcher-panel{width:calc(100vw - 32px);right:16px;top:80px}}

/* ===== INLINE SELECTOR STYLES ===== */
.ai-inline-selector{border-radius:16px;border:1px solid rgba(139,92,246,0.08);background:rgba(12,8,35,0.85);backdrop-filter:blur(24px) saturate(1.4);overflow:hidden}
.ai-inline-selector .ai-inline-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid rgba(139,92,246,0.06);background:linear-gradient(135deg,rgba(25,15,55,0.5),rgba(12,8,35,0.3))}
.ai-inline-selector .ai-inline-title{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:600;color:#a78bfa}
.ai-inline-selector .ai-inline-current{font-size:10px;color:rgba(148,163,184,0.3)}
.ai-inline-selector .ai-inline-body{padding:12px;max-height:400px;overflow-y:auto}
.ai-inline-selector .ai-inline-body::-webkit-scrollbar{width:3px}
.ai-inline-selector .ai-inline-body::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.08);border-radius:2px}
`;
    document.head.appendChild(css);
  }

  function getPos() { return localStorage.getItem('ai_switcher_pos') || config.position; }

  function setModel(id) {
    selectedModel = id;
    localStorage.setItem('ai_global_model', id);
    window.dispatchEvent(new CustomEvent('ai-model-change', { detail: { model: id } }));
    renderPanel();
    updateBadges();
  }

  function toggleExpand(modelId) {
    expandedModel = expandedModel === modelId ? null : modelId;
    renderPanel();
  }

  function getApiStatus(modelId) {
    if (isCustomModel(modelId)) {
      var cm = getCustomModel(modelId);
      return cm && cm.apiKey ? 'configured' : 'unconfigured';
    }
    var cfg = getModelConfig(modelId);
    return cfg.apiKey ? 'configured' : 'unconfigured';
  }

  function updateBadges() {
    var meta = MODEL_META[selectedModel] || { icon: '🔧', color: '#4ade80' };
    document.querySelectorAll('.ai-current-badge').forEach(function(el) {
      el.innerHTML = meta.icon + ' ' + selectedModel;
    });
  }

  // ===== RENDER =====
  function renderFab() {
    var pos = getPos();
    var fab = document.getElementById('aiSwitcherFab') || (function(){
      var el = document.createElement('div');
      el.id = 'aiSwitcherFab';
      el.innerHTML = '🧠<span class="pulse-dot"></span>';
      document.body.appendChild(el);
      el.addEventListener('click', function(){ isOpen = !isOpen; renderPanel(); });
      return el;
    })();
    fab.className = 'ai-switcher-fab ' + pos;
  }

  function renderPanel() {
    var pos = getPos();
    var panel = document.getElementById('aiSwitcherPanel') || (function(){
      var el = document.createElement('div');
      el.id = 'aiSwitcherPanel';
      document.body.appendChild(el);
      return el;
    })();
    panel.className = 'ai-switcher-panel ' + pos + (isOpen ? ' open' : '');
    panel.innerHTML = buildHTML();
  }

  function buildHTML() {
    var sel = selectedModel;
    var meta = MODEL_META[sel] || (isCustomModel(sel) ? (function(){ var c = getCustomModel(sel); return { icon: '🔧', provider: c ? c.provider : '自定义' }; })() : { icon: '🧠', provider: '—' });
    return '<div class="panel-header"><div class="title">🧠 AI 模型中台 · 各模型独立 API</div><div class="sub">当前: ' + meta.icon + ' ' + sel + ' · ' + meta.provider + '</div></div><div class="panel-body"><div class="ai-group-tabs">' + buildGroupTabs() + '</div>' + buildModelCards() + '<button class="ai-add-btn" onclick="window._aiShowAddModal()">+ 添加自定义模型</button></div>';
  }

  function buildGroupTabs() {
    var groups = ['all'].concat(BUILTIN_GROUPS);
    // Add "自定义" tab if any custom models exist
    if (getCustomModels().length > 0) groups.push('自定义');
    return groups.map(function(g) {
      var active = config.defaultTab === g;
      var label = g === 'all' ? '全部' : g;
      return '<button class="ai-group-tab' + (active ? ' active' : '') + '" data-group="' + g + '">' + label + '</button>';
    }).join('');
  }

  function buildModelCards() {
    var sel = selectedModel;
    var html = '';

    // Built-in models
    for (var gi = 0; gi < BUILTIN_GROUPS.length; gi++) {
      var group = BUILTIN_GROUPS[gi];
      if (config.defaultTab !== 'all' && config.defaultTab !== group) continue;
      var ids = Object.keys(MODEL_META).filter(function(id) { return MODEL_META[id].provider === group; });
      if (ids.length === 0) continue;
      for (var ii = 0; ii < ids.length; ii++) {
        html += buildCardHTML(ids[ii], sel, false);
      }
    }

    // Custom models
    var customs = getCustomModels();
    if (customs.length > 0 && (config.defaultTab === 'all' || config.defaultTab === '自定义')) {
      for (var ci = 0; ci < customs.length; ci++) {
        html += buildCustomCardHTML(customs[ci], sel);
      }
    }
    return html;
  }

  function buildCardHTML(id, sel, isCustom) {
    var m = MODEL_META[id];
    if (!m) return '';
    var isSel = id === sel;
    var apiStatus = getApiStatus(id);
    var cfg = getModelConfig(id);
    var isExpanded = expandedModel === id;
    var configuredIcon = apiStatus === 'configured' ? '🔑' : '⚙️';

    var cls = 'ai-model-card' + (isSel ? ' selected' : '');
    var html = '<div class="' + cls + '" data-model="' + id + '">';
    html += '<div class="card-row" onclick="window._aiSelectModel(\'' + id + '\')">';
    html += '<div class="glow-bar" style="background:' + m.color + ';opacity:' + (isSel ? 1 : 0) + '"></div>';
    html += '<div class="icon">' + m.icon + '</div>';
    html += '<div class="info"><div class="name">' + id + '<span class="badge">' + m.provider + '</span></div><div class="provider">' + (m.context ? m.context.toLocaleString() + ' tokens · ' : '') + m.latency + '</div></div>';
    html += '<div class="api-indicator ' + apiStatus + '" title="' + (apiStatus === 'configured' ? 'API 已配置' : '未配置 API') + '"></div>';
    html += '<span class="status">' + configuredIcon + '</span>';
    html += '<button class="ai-expand-btn" style="padding:2px 8px;font-size:8px;background:transparent;border:1px solid rgba(255,255,255,0.02);border-radius:6px;color:rgba(148,163,184,0.15);cursor:pointer;transition:all .2s;font-family:\'Orbitron\',sans-serif;line-height:1;flex-shrink:0" onclick="event.stopPropagation();window._aiToggleExpand(\'' + id + '\')">' + (isExpanded ? '▾' : '▸') + '</button>';
    html += '</div>';
    html += '<div class="ai-model-api' + (isExpanded ? ' open' : '') + '">';
    html += '<div class="api-label">API Endpoint</div><div class="api-row"><input type="text" id="ep-' + id + '" placeholder="' + m.defaultEndpoint + '" value="' + (cfg.endpoint || m.defaultEndpoint) + '"></div>';
    html += '<div class="api-label">API Key</div><div class="api-row"><input type="password" id="key-' + id + '" class="api-key-input" placeholder="输入 API Key" value="' + (cfg.apiKey || '') + '"></div>';
    html += '<button class="api-save" onclick="window._aiSaveModelConfig(\'' + id + '\')">💾 保存 ' + id + ' API 配置</button>';
    html += '<div class="api-docs">🔗 <a href="' + m.docs + '" target="_blank">获取 ' + m.provider + ' API Key</a></div>';
    html += '</div></div>';
    return html;
  }

  function buildCustomCardHTML(cm, sel) {
    var id = cm.id;
    var isSel = id === sel;
    var isExpanded = expandedModel === id;
    var apiStatus = cm.apiKey ? 'configured' : 'unconfigured';
    var configuredIcon = apiStatus === 'configured' ? '🔑' : '⚙️';

    var cls = 'ai-model-card custom' + (isSel ? ' selected' : '');
    var html = '<div class="' + cls + '" data-model="' + id + '">';
    html += '<div class="card-row" onclick="window._aiSelectModel(\'' + id + '\')">';
    html += '<div class="glow-bar" style="background:#4ade80;opacity:' + (isSel ? 1 : 0) + '"></div>';
    html += '<div class="icon">🔧</div>';
    html += '<div class="info"><div class="name">' + cm.name + '<span class="badge">' + cm.provider + '</span><span class="custom-tag">自定义</span></div><div class="provider">' + (cm.baseUrl || '自定义 API') + '</div></div>';
    html += '<div class="api-indicator ' + apiStatus + '"></div>';
    html += '<span class="status">' + configuredIcon + '</span>';
    html += '<button class="del-custom" onclick="event.stopPropagation();window._aiDeleteCustomModel(\'' + id + '\')">✕</button>';
    html += '<button class="ai-expand-btn" style="padding:2px 8px;font-size:8px;background:transparent;border:1px solid rgba(255,255,255,0.02);border-radius:6px;color:rgba(148,163,184,0.15);cursor:pointer;transition:all .2s;font-family:\'Orbitron\',sans-serif;line-height:1;flex-shrink:0" onclick="event.stopPropagation();window._aiToggleExpand(\'' + id + '\')">' + (isExpanded ? '▾' : '▸') + '</button>';
    html += '</div>';
    html += '<div class="ai-model-api' + (isExpanded ? ' open' : '') + '">';
    html += '<div class="api-label">API Endpoint</div><div class="api-row"><input type="text" id="ep-' + id + '" placeholder="' + (cm.baseUrl || 'https://') + '" value="' + (cm.baseUrl || '') + '"></div>';
    html += '<div class="api-label">API Key</div><div class="api-row"><input type="password" id="key-' + id + '" class="api-key-input" placeholder="输入 API Key" value="' + (cm.apiKey || '') + '"></div>';
    html += '<button class="api-save" onclick="window._aiSaveCustomModelConfig(\'' + id + '\')">💾 保存配置</button>';
    html += '<div class="api-docs">自定义模型 · 数据仅存储在本地</div>';
    html += '</div></div>';
    return html;
  }

  // ===== ADD CUSTOM MODAL =====
  function showAddModal() {
    var overlay = document.getElementById('aiModalOverlay') || (function(){
      var el = document.createElement('div');
      el.id = 'aiModalOverlay';
      el.className = 'ai-modal-overlay';
      document.body.appendChild(el);
      return el;
    })();
    overlay.className = 'ai-modal-overlay open';
    overlay.innerHTML = '<div class="ai-modal" onclick="event.stopPropagation()">' +
      '<div class="ai-modal-header"><h3>🔧 添加自定义模型</h3><button class="ai-modal-close" onclick="window._aiCloseModal()">✕</button></div>' +
      '<div class="ai-modal-body">' +
        '<div class="fg"><label>厂商 / 提供商</label><select id="customProvider">' +
          '<option value="OpenAI">OpenAI</option><option value="Anthropic">Anthropic / Claude</option><option value="Google">Google Gemini</option><option value="DeepSeek" selected>DeepSeek</option><option value="阿里云">阿里云 通义千问</option><option value="字节跳动">字节跳动 豆包</option><option value="MiniMax">MiniMax</option><option value="自定义">其他 (自定义)</option>' +
        '</select></div>' +
        '<div class="fg"><label>模型名称</label><input type="text" id="customModelName" placeholder="例如: my-gpt-4o, custom-llm" value="my-custom-model"></div>' +
        '<div class="fg"><label>Base URL (API 请求地址)</label><input type="text" id="customBaseUrl" placeholder="https://your-api.com/v1" value=""></div>' +
        '<div class="fg"><label>API Key</label><input type="password" id="customApiKey" placeholder="sk-... 或你的 API Key"></div>' +
        '<div class="hint" style="font-size:10px;color:rgba(148,163,184,0.06);margin-bottom:12px">模型 ID 将自动生成: provider_模型名 (如 deepseek_my-custom-model)</div>' +
        '<button class="ai-modal-submit" onclick="window._aiSubmitCustomModel()">✓ 添加模型</button>' +
      '</div></div>';
  }

  window._aiShowAddModal = showAddModal;
  window._aiCloseModal = function() {
    var el = document.getElementById('aiModalOverlay');
    if (el) el.className = 'ai-modal-overlay';
  };

  window._aiSubmitCustomModel = function() {
    var provider = document.getElementById('customProvider').value;
    var name = document.getElementById('customModelName').value.trim();
    var baseUrl = document.getElementById('customBaseUrl').value.trim();
    var apiKey = document.getElementById('customApiKey').value.trim();

    if (!name) { alert('请输入模型名称'); return; }
    if (!baseUrl) { alert('请输入 Base URL'); return; }
    if (!apiKey) { alert('请输入 API Key'); return; }

    var id = (provider + '_' + name).toLowerCase().replace(/[^a-z0-9_-]/g, '_');

    // Check duplicate
    var existing = getCustomModels();
    for (var i = 0; i < existing.length; i++) {
      if (existing[i].id === id) { alert('模型 ID "' + id + '" 已存在，请使用不同的名称'); return; }
    }

    addCustomModel({ id: id, provider: provider, name: name, baseUrl: baseUrl, apiKey: apiKey });
    window._aiCloseModal();

    // Auto-select the new model
    setModel(id);
  };

  window._aiDeleteCustomModel = function(id) {
    if (confirm('确认删除自定义模型 "' + id + '" 吗？')) {
      deleteCustomModel(id);
      renderPanel();
    }
  };

  // ===== GLOBAL CALLBACKS =====
  window._aiSelectModel = setModel;
  window._aiToggleExpand = toggleExpand;

  window._aiSaveModelConfig = function(id) {
    var key = document.getElementById('key-' + id).value.trim();
    var ep = document.getElementById('ep-' + id).value.trim();
    if (key || ep) {
      var m = MODEL_META[id];
      setModelConfig(id, key, ep || (m ? m.defaultEndpoint : ''));
      var btn = document.querySelector('.ai-model-card[data-model="' + id + '"] .api-save');
      if (btn) { btn.textContent = '✅ 已保存'; setTimeout(function(){ btn.textContent = '💾 保存 ' + id + ' API 配置'; }, 1500); }
      // Update indicator
      renderPanel();
    }
  };

  window._aiSaveCustomModelConfig = function(id) {
    var key = document.getElementById('key-' + id).value.trim();
    var ep = document.getElementById('ep-' + id).value.trim();
    var list = getCustomModels();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        if (key) list[i].apiKey = key;
        if (ep) list[i].baseUrl = ep;
        setCustomModels(list);
        var btn = document.querySelector('.ai-model-card[data-model="' + id + '"] .api-save');
        if (btn) { btn.textContent = '✅ 已保存'; setTimeout(function(){ btn.textContent = '💾 保存配置'; }, 1500); }
        renderPanel();
        return;
      }
    }
  };

  // ===== EXPORTS for other scripts =====
  window.__aiGetCustomModels = getCustomModels;
  window.__aiIsCustomModel = isCustomModel;
  window.__aiGetCustomModel = getCustomModel;
  window.__aiGetSelectedModel = function() { return selectedModel; };
  window.__aiGetModelConfig = getModelConfig;

  // ===== RENDER MODEL SELECTOR FOR PAGES =====
  window.renderModelSelector = function(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    
    loadStyles();
    
    // Close modal on overlay click
    document.addEventListener('click', function(e) {
      var overlay = document.getElementById('aiModalOverlay');
      if (overlay && overlay.classList.contains('open') && e.target === overlay) {
        overlay.className = 'ai-modal-overlay';
      }
    });
    
    // Render the model selector directly in the container
    container.innerHTML = buildInlineSelectorHTML();
  };

  function buildInlineSelectorHTML() {
    var sel = selectedModel;
    var meta = MODEL_META[sel] || (isCustomModel(sel) ? (function(){ var c = getCustomModel(sel); return { icon: '🔧', provider: c ? c.provider : '自定义' }; })() : { icon: '🧠', provider: '—' });
    
    return `
      <div class="ai-inline-selector">
        <div class="ai-inline-header">
          <span class="ai-inline-title">🤖 选择模型 · API配置</span>
          <span class="ai-inline-current">当前: ${meta.icon} ${sel}</span>
        </div>
        <div class="ai-inline-body">
          <div class="ai-group-tabs">${buildGroupTabs()}</div>
          ${buildModelCards()}
          <button class="ai-add-btn" onclick="window._aiShowAddModal()">+ 添加自定义模型</button>
        </div>
      </div>
    `;
  }

  // ===== INIT =====
  function init() {
    loadStyles();
    
    // Close modal on overlay click
    document.addEventListener('click', function(e) {
      var overlay = document.getElementById('aiModalOverlay');
      if (overlay && overlay.classList.contains('open') && e.target === overlay) {
        overlay.className = 'ai-modal-overlay';
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

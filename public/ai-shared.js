/**
 * 智职AI — 共享 AI 模型配置模块
 * 为所有功能页面提供：底部工具栏、模型配置模态框、API 桥接函数
 * 使用：<script src="public/ai-shared.js"></script>
 * 然后在页面底部添加模态框 HTML（从 sidebar 复制）
 */

// ========== 模型元数据 ==========
var AI_MODEL_META = {
  'gpt-4o':           { icon: '🤖', provider: 'OpenAI',      color: '#10a37f', defaultEndpoint: 'https://api.openai.com/v1' },
  'gpt-4o-mini':      { icon: '🤖', provider: 'OpenAI',      color: '#10a37f', defaultEndpoint: 'https://api.openai.com/v1' },
  'claude-3-opus':    { icon: '✨', provider: 'Anthropic',   color: '#d97706', defaultEndpoint: 'https://api.anthropic.com/v1' },
  'claude-3-sonnet':  { icon: '✨', provider: 'Anthropic',   color: '#d97706', defaultEndpoint: 'https://api.anthropic.com/v1' },
  'gemini-1.5-pro':   { icon: '🔮', provider: 'Google',      color: '#4285f4', defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta' },
  'gemini-1.5-flash': { icon: '🔮', provider: 'Google',      color: '#4285f4', defaultEndpoint: 'https://generativelanguage.googleapis.com/v1beta' },
  'deepseek-v4':      { icon: '🧠', provider: 'DeepSeek',    color: '#4f46e5', defaultEndpoint: 'https://api.deepseek.com' },
  'deepseek-v4-flash':{ icon: '🧠', provider: 'DeepSeek',    color: '#6366f1', defaultEndpoint: 'https://api.deepseek.com' },
  'qwen-max':         { icon: '🌐', provider: '阿里云',      color: '#ff6a00', defaultEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation' },
  'qwen-plus':        { icon: '🌐', provider: '阿里云',      color: '#ff6a00', defaultEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation' },
  'doubao-pro':       { icon: '🍀', provider: '字节跳动',    color: '#00c853', defaultEndpoint: 'https://ark.cn-beijing.volces.com/api/v3' },
  'doubao-lite':      { icon: '🍀', provider: '字节跳动',    color: '#00c853', defaultEndpoint: 'https://ark.cn-beijing.volces.com/api/v3' },
  'minimax-2.7':      { icon: '🎯', provider: 'MiniMax',     color: '#22d3ee', defaultEndpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2' },
};
var AI_MODEL_GROUPS = ['OpenAI', 'Anthropic', 'Google', 'DeepSeek', '阿里云', '字节跳动', 'MiniMax'];

// ========== 工具函数 ==========
function aiGetCustomModels() {
  try { return JSON.parse(localStorage.getItem('ai_custom_models') || '[]'); } catch(e) { return []; }
}
function aiGetModelConfigs() {
  try { return JSON.parse(localStorage.getItem('ai_model_configs') || '{}'); } catch(e) { return {}; }
}
function aiSetModelConfig(mid, key, endpoint) {
  var configs = aiGetModelConfigs();
  configs[mid] = { apiKey: key, endpoint: endpoint };
  localStorage.setItem('ai_model_configs', JSON.stringify(configs));
}
function aiGetModelConfig(mid) {
  var configs = aiGetModelConfigs();
  return configs[mid] || { apiKey: '', endpoint: '' };
}
function aiGetModelIcon(mid) {
  var m = AI_MODEL_META[mid]; if (m) return m.icon;
  var cm = aiGetCustomModels(); for (var i = 0; i < cm.length; i++) { if (cm[i].id === mid) return '🔧'; }
  return '🤖';
}
function aiGetModelProvider(mid) {
  var m = AI_MODEL_META[mid]; if (m) return m.provider;
  var cm = aiGetCustomModels(); for (var i = 0; i < cm.length; i++) { if (cm[i].id === mid) return cm[i].provider; }
  return '自定义';
}
function aiGetModelEndpoint(mid) {
  var cfg = aiGetModelConfig(mid); if (cfg.endpoint) return cfg.endpoint;
  var m = AI_MODEL_META[mid]; if (m) return m.defaultEndpoint;
  var cm = aiGetCustomModels(); for (var i = 0; i < cm.length; i++) { if (cm[i].id === mid) return cm[i].baseUrl; }
  return '';
}

// ========== API 桥接函数（供各页面调用） ==========
function getCurrentModelId(){
  return localStorage.getItem('ai_global_model') || 'deepseek-v4-flash';
}
function getCurrentApiKey(){
  var mid = getCurrentModelId();
  try { var cm = aiGetCustomModels(); for (var i = 0; i < cm.length; i++) { if (cm[i].id === mid) return cm[i].apiKey || ''; } } catch(e) {}
  var cfg = aiGetModelConfig(mid); return cfg.apiKey || '';
}
function getCurrentEndpoint(){
  var mid = getCurrentModelId();
  try { var cm = aiGetCustomModels(); for (var i = 0; i < cm.length; i++) { if (cm[i].id === mid) return cm[i].baseUrl || ''; } } catch(e) {}
  var cfg = aiGetModelConfig(mid); if (cfg.endpoint) return cfg.endpoint;
  var m = AI_MODEL_META[mid]; if (m) return m.defaultEndpoint;
  return '';
}
function getCurrentModelName(){
  var mid = getCurrentModelId();
  try { var cm = aiGetCustomModels(); for (var i = 0; i < cm.length; i++) { if (cm[i].id === mid) return cm[i].name; } } catch(e) {}
  return mid;
}

// ========== 加载底部工具栏样式 ==========
(function(){
  var css = document.createElement('style');
  css.textContent = `
/* Bottom Toolbar */
.ai-model-toolbar{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:12px;padding:12px 20px;background:rgba(15,10,40,0.85);backdrop-filter:blur(32px) saturate(1.6);border:1px solid rgba(99,102,241,0.12);border-radius:16px;box-shadow:0 16px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(139,92,246,0.04);transition:all .3s;max-width:calc(100vw - 48px);white-space:nowrap}
.ai-model-toolbar:hover{transform:translateX(-50%) translateY(-2px);box-shadow:0 20px 70px rgba(0,0,0,0.6)}
.ai-model-toolbar .model-btn{display:flex;align-items:center;gap:8px;padding:8px 16px;border-radius:10px;background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06));border:1px solid rgba(99,102,241,0.1);cursor:pointer;transition:all .3s}
.ai-model-toolbar .model-btn:hover{transform:scale(1.02);box-shadow:0 4px 20px rgba(99,102,241,0.15)}
.ai-model-toolbar .model-icon{font-size:18px;filter:drop-shadow(0 0 8px rgba(99,102,241,0.3))}
.ai-model-toolbar .model-info{display:flex;flex-direction:column;gap:2px}
.ai-model-toolbar .model-name{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:600;color:#a78bfa}
.ai-model-toolbar .model-provider{font-size:9px;color:rgba(148,163,184,0.4)}
.ai-model-toolbar .model-status{width:6px;height:6px;border-radius:50%;background:rgba(74,222,128,0.5);box-shadow:0 0 10px rgba(74,222,128,0.4);animation:aiToolPulse 2s ease-in-out infinite}
.ai-model-toolbar .model-status.configured{background:#4ade80;box-shadow:0 0 12px rgba(74,222,128,0.5)}
@keyframes aiToolPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.2)}}
.ai-model-toolbar .toolbar-divider{width:1px;height:32px;background:rgba(139,92,246,0.08)}

/* Modal */
.ai-model-modal-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center}
.ai-model-modal-overlay.open{display:flex}
.ai-model-modal{width:480px;max-width:calc(100vw - 40px);border-radius:14px;background:#1c1c1e;box-shadow:0 25px 80px rgba(0,0,0,0.6);overflow:hidden;display:flex;flex-direction:column;animation:aiModalIn .25s cubic-bezier(.4,0,.2,1)}
@keyframes aiModalIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
.ai-modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06)}
.ai-modal-header h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;color:rgba(255,255,255,0.9);margin:0}
.ai-modal-close{width:28px;height:28px;border-radius:8px;border:none;background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.3);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.ai-modal-close:hover{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6)}
.ai-modal-body{padding:20px;overflow-y:auto;flex:1}
.ai-section-title{font-size:11px;font-weight:600;color:rgba(255,255,255,0.35);margin-bottom:12px;letter-spacing:0.3px}
.model-chip-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.04)}
.model-chip{padding:6px 14px;border-radius:8px;font-size:12px;border:1px solid rgba(255,255,255,0.06);cursor:pointer;transition:all .2s;background:rgba(255,255,255,0.02);color:rgba(255,255,255,0.4);white-space:nowrap}
.model-chip:hover{border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.6)}
.model-chip.active{background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.2);color:#818cf8}
.model-chip .chip-dot{display:inline-block;width:5px;height:5px;border-radius:50%;margin-left:6px;vertical-align:middle}
.model-chip .chip-dot.on{background:#4ade80;box-shadow:0 0 6px rgba(74,222,128,0.3)}
.custom-model-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:6px;margin:3px 0;cursor:pointer;transition:all .15s;border:1px solid transparent;font-size:12px;color:rgba(255,255,255,0.45)}
.custom-model-item:hover{background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.04);color:rgba(255,255,255,0.6)}
.custom-model-item.active{background:rgba(99,102,241,0.04);border-color:rgba(99,102,241,0.1);color:#818cf8}
.ai-row{display:flex;gap:10px;margin-bottom:14px}
.ai-row .ai-group{flex:1}
.ai-group{margin-bottom:14px}
.ai-group:last-of-type{margin-bottom:0}
.ai-group label{display:block;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:6px;font-weight:500}
.ai-group input,.ai-group select{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:9px 12px;font-size:13px;color:rgba(255,255,255,0.85);outline:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s}
.ai-group input:focus,.ai-group select:focus{border-color:rgba(99,102,241,0.35);background:rgba(99,102,241,0.03)}
.ai-group input::placeholder{color:rgba(255,255,255,0.12);font-style:italic}
.ai-group select option{background:#1c1c1e;color:rgba(255,255,255,0.85)}
.ai-hint{font-size:10px;color:rgba(255,255,255,0.12);margin-top:5px;line-height:1.4}
.ai-modal-footer{padding:16px 20px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;background:rgba(0,0,0,0.15)}
.ai-btn{flex:1;padding:9px;border-radius:8px;border:none;cursor:pointer;font-size:12px;font-weight:600;transition:all .2s;font-family:'Plus Jakarta Sans',sans-serif}
.ai-btn.primary{background:#4f46e5;color:#fff}
.ai-btn.primary:hover{background:#6366f1}
.ai-btn.secondary{background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.06)}
.ai-btn.secondary:hover{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.8)}
.ai-btn.test{background:rgba(99,102,241,0.06);color:#818cf8;border:1px solid rgba(99,102,241,0.1)}
.ai-btn.test:hover{background:rgba(99,102,241,0.1)}
.ai-btn:disabled{opacity:0.4;cursor:not-allowed}
@media(max-width:640px){.ai-model-modal{width:calc(100vw - 32px)}.ai-row{flex-direction:column;gap:14px}}
`;
  document.head.appendChild(css);
})();

// ========== 底部工具栏 ==========
function aiInitToolbar() {
  var mid = getCurrentModelId();
  var icon = aiGetModelIcon(mid);
  var provider = aiGetModelProvider(mid);
  var cfg = aiGetModelConfig(mid);
  var hasKey = cfg.apiKey ? true : false;

  if (document.querySelector('.ai-model-toolbar')) return;

  var html =
  '<div class="ai-model-toolbar">' +
    '<button class="model-btn" onclick="aiOpenModal()">' +
      '<span class="model-icon">' + icon + '</span>' +
      '<div class="model-info">' +
        '<div class="model-name">' + mid.substring(0, 18) + '</div>' +
        '<div class="model-provider">' + provider + '</div>' +
      '</div>' +
      '<div class="model-status' + (hasKey ? ' configured' : '') + '"></div>' +
    '</button>' +
    '<div class="toolbar-divider"></div>' +
    '<div style="font-size:10px;color:rgba(148,163,184,0.25);font-family:Orbitron,sans-serif;cursor:pointer" onclick="aiOpenModal()">⚙️</div>' +
  '</div>';

  document.body.insertAdjacentHTML('beforeend', html);
}

function aiRefreshToolbar() {
  var el = document.querySelector('.ai-model-toolbar');
  if (el) el.remove();
  aiInitToolbar();
}

// ========== 模态框 ==========
function aiOpenModal() {
  var overlay = document.getElementById('aiModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'aiModalOverlay';
    overlay.className = 'ai-model-modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML =
  '<div class="ai-model-modal">' +
    '<div class="ai-modal-header"><h3>⚙️ AI 模型配置</h3><button class="ai-modal-close" onclick="aiCloseModal()">✕</button></div>' +
    '<div class="ai-modal-body">' +
      '<div class="ai-section-title">选择模型</div>' +
      '<div class="model-chip-row" id="aiChipRow"></div>' +
      '<div id="aiCustomSection" style="display:none">' +
        '<div class="ai-section-title" style="margin-top:4px">自定义模型</div>' +
        '<div id="aiCustomList"></div>' +
        '<div style="margin-top:6px;margin-bottom:12px;text-align:center">' +
          '<span style="font-size:11px;color:rgba(255,255,255,0.2);cursor:pointer" onclick="aiCloseModal();setTimeout(function(){if(window._aiShowAddModal)window._aiShowAddModal()},300)">➕ 添加自定义模型</span>' +
        '</div>' +
      '</div>' +
      '<div class="ai-section-title">API 配置</div>' +
      '<div class="ai-row">' +
        '<div class="ai-group">' +
          '<label>服务商</label>' +
          '<select id="aiProvider">' +
            '<option value="OpenAI">OpenAI</option><option value="Anthropic">Anthropic (Claude)</option>' +
            '<option value="Google">Google (Gemini)</option><option value="DeepSeek" selected>DeepSeek</option>' +
            '<option value="阿里云">阿里云 (通义千问)</option><option value="字节跳动">字节跳动 (豆包)</option>' +
            '<option value="MiniMax">MiniMax</option><option value="其他">其他 (自定义)</option>' +
          '</select>' +
        '</div>' +
        '<div class="ai-group">' +
          '<label>模型</label>' +
          '<input type="text" id="aiModelId" placeholder="deepseek-v4-flash">' +
        '</div>' +
      '</div>' +
      '<div class="ai-group">' +
        '<label>API Key</label>' +
        '<input type="password" id="aiApiKey" placeholder="sk-xxxxxxxxxxxxxxxx" autocomplete="off">' +
        '<div class="ai-hint">必填。从模型服务商平台获取你的 API Key</div>' +
      '</div>' +
      '<div class="ai-group">' +
        '<label>API 请求地址 <span style="color:rgba(255,255,255,0.15)">(可选)</span></label>' +
        '<input type="text" id="aiEndpoint" placeholder="https://api.deepseek.com" autocomplete="off">' +
        '<div class="ai-hint">留空则使用默认接口地址</div>' +
      '</div>' +
    '</div>' +
    '<div class="ai-modal-footer">' +
      '<button class="ai-btn secondary" onclick="aiCloseModal()">取消</button>' +
      '<button class="ai-btn test" id="aiTestBtn" onclick="aiTestConnection()">🔌 测试连接</button>' +
      '<button class="ai-btn primary" id="aiSaveBtn" onclick="aiSaveConfig()">保存配置</button>' +
    '</div>' +
  '</div>';
  overlay.classList.add('open');
  aiRenderChips();
  aiPopulateForm();

  // Close on overlay click
  overlay.onclick = function(e) { if (e.target === overlay) aiCloseModal(); };
}

function aiCloseModal() {
  var overlay = document.getElementById('aiModalOverlay');
  if (overlay) overlay.classList.remove('open');
}

function aiSelectModel(mid) {
  localStorage.setItem('ai_global_model', mid);
  window.dispatchEvent(new CustomEvent('ai-model-change', { detail: { model: mid } }));
  aiRenderChips();
  aiPopulateForm();
  aiRefreshToolbar();
}

function aiPopulateForm() {
  var mid = getCurrentModelId();
  var cfg = aiGetModelConfig(mid);
  var m = AI_MODEL_META[mid];
  document.getElementById('aiModelId').value = mid;
  document.getElementById('aiApiKey').value = cfg.apiKey || '';
  document.getElementById('aiEndpoint').value = cfg.endpoint || aiGetModelEndpoint(mid);
  if (m) {
    var sel = document.getElementById('aiProvider');
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === m.provider) { sel.selectedIndex = i; break; }
    }
  }
}

function aiSaveConfig() {
  var mid = document.getElementById('aiModelId')?.value?.trim() || 'deepseek-v4-flash';
  var key = document.getElementById('aiApiKey')?.value?.trim() || '';
  var ep = document.getElementById('aiEndpoint')?.value?.trim() || '';
  localStorage.setItem('ai_global_model', mid);
  aiSetModelConfig(mid, key, ep);
  aiRenderChips();
  aiRefreshToolbar();
  window.dispatchEvent(new CustomEvent('ai-model-change', { detail: { model: mid } }));
  var btn = document.getElementById('aiSaveBtn');
  btn.textContent = '✅ 已保存';
  setTimeout(function(){ btn.textContent = '保存配置'; }, 1500);
}

async function aiTestConnection() {
  var mid = document.getElementById('aiModelId')?.value?.trim() || 'deepseek-v4-flash';
  var key = document.getElementById('aiApiKey')?.value?.trim();
  var ep = document.getElementById('aiEndpoint')?.value?.trim();
  var btn = document.getElementById('aiTestBtn');
  if (!key) { btn.textContent = '❌ 请先输入 API Key'; setTimeout(function(){ btn.textContent = '🔌 测试连接'; }, 2000); return; }
  btn.textContent = '⏳ 测试中...'; btn.disabled = true;
  try {
    var res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: mid, prompt: '回复"OK"表示连接成功', system: '只回复"OK"', maxTokens: 10, temperature: 0, apiKey: key, endpoint: ep, userModelConfig: {} })
    });
    var data = await res.json();
    if (data.content && data.content.trim()) { btn.textContent = '✅ 连接成功 ✓'; btn.style.borderColor = 'rgba(74,222,128,0.3)'; }
    else if (data.error) { btn.textContent = '❌ ' + data.error.substring(0, 25); }
    else { btn.textContent = '⚠️ 响应异常'; }
  } catch (err) { btn.textContent = '❌ ' + err.message.substring(0, 20); }
  btn.disabled = false;
  setTimeout(function(){ btn.textContent = '🔌 测试连接'; btn.style.borderColor = 'rgba(99,102,241,0.1)'; }, 3000);
}

function aiRenderChips() {
  var mid = getCurrentModelId();
  var row = document.getElementById('aiChipRow');
  if (!row) return;

  // Common models to show as chips
  var chips = ['deepseek-v4-flash', 'deepseek-v4', 'gpt-4o-mini', 'qwen-plus', 'doubao-pro'];
  var html = '';
  var found = false;

  for (var i = 0; i < chips.length; i++) {
    var id = chips[i];
    var m = AI_MODEL_META[id];
    if (!m) continue;
    var isSel = id === mid;
    if (isSel) found = true;
    var cfg = aiGetModelConfig(id);
    html += '<div class="model-chip' + (isSel ? ' active' : '') + '" onclick="aiSelectModel(\'' + id + '\')">' +
      m.icon + ' ' + id.substring(0, 12) +
      '<span class="chip-dot ' + (cfg.apiKey ? 'on' : '') + '"></span></div>';
  }

  if (!found) {
    // Current model not in chip list, add it
    var curMeta = AI_MODEL_META[mid];
    html = '<div class="model-chip active" onclick="aiSelectModel(\'' + mid + '\')">' +
      (curMeta ? curMeta.icon : '🔧') + ' ' + mid.substring(0, 14) +
      '<span class="chip-dot ' + (aiGetModelConfig(mid).apiKey ? 'on' : '') + '"></span></div>' + html;
  }

  row.innerHTML = html;

  // Custom models
  var customs = aiGetCustomModels();
  var cs = document.getElementById('aiCustomSection');
  var cl = document.getElementById('aiCustomList');
  if (cs && cl) {
    if (customs.length > 0) {
      cs.style.display = 'block';
      var ch = '';
      for (var ci = 0; ci < customs.length; ci++) {
        var c = customs[ci];
        var isSel = c.id === mid;
        ch += '<div class="custom-model-item' + (isSel ? ' active' : '') + '" onclick="aiSelectModel(\'' + c.id + '\')">' +
          '🔧 <span style="flex:1">' + c.name + '</span>' +
          '<span style="font-size:10px;color:rgba(255,255,255,0.15)">' + c.provider + '</span>' +
          '<span style="width:5px;height:5px;border-radius:50%;background:' + (c.apiKey ? '#4ade80' : 'rgba(255,255,255,0.08)') + '"></span></div>';
      }
      cl.innerHTML = ch;
    } else { cs.style.display = 'none'; }
  }
}

// ========== 自动加载 ==========
document.addEventListener('DOMContentLoaded', function() {
  aiInitToolbar();
});

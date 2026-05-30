# -*- coding: utf-8 -*-
"""Complete redesign of AI Chat Input Box - Glassmorphism + Sci-fi"""
path = 'd:\\trae\\qzhi.dome\\app.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# ============================================================
# SECTION A: Replace all .api-chat-input CSS
# ============================================================
old_input_css_block = """.api-chat-input{display:flex;align-items:center;gap:10px;padding:12px 18px 14px;border-top:1px solid rgba(255,255,255,0.03);flex-shrink:0}
.api-chat-input input{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:10px 16px;font-size:13px;color:rgba(255,255,255,0.75);outline:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all 0.3s ease}
.api-chat-input input:focus{border-color:rgba(99,102,241,0.2);background:rgba(99,102,241,0.03)}
.api-chat-input input::placeholder{color:rgba(148,163,184,0.2)}
.api-chat-input button{width:38px;height:38px;border-radius:12px;border:none;background:linear-gradient(135deg,rgba(99,102,241,0.5),rgba(139,92,246,0.35));color:#a78bfa;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all 0.3s ease;flex-shrink:0;box-shadow:0 4px 15px rgba(99,102,241,0.12)}
.api-chat-input button:hover{background:linear-gradient(135deg,rgba(99,102,241,0.6),rgba(139,92,246,0.5));transform:scale(1.05)}
.api-chat-input button:disabled{opacity:0.4;cursor:not-allowed;transform:none}"""

new_input_css_block = """.api-chat-input{display:flex;align-items:center;gap:10px;padding:10px 16px 12px;border-top:1px solid rgba(255,255,255,0.04);flex-shrink:0;position:relative;background:rgba(20,20,40,0.5);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3)}
.api-chat-input::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.15),rgba(139,92,246,0.1),transparent);pointer-events:none}
.api-chat-input input{flex:1;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:10px 16px;font-size:13px;color:rgba(255,255,255,0.85);outline:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 2px 8px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.02)}
.api-chat-input input:focus{border-color:rgba(99,102,241,0.25);background:rgba(99,102,241,0.03);box-shadow:0 0 0 2px rgba(99,102,241,0.05),inset 0 2px 8px rgba(0,0,0,0.15);animation:inputBreath 3s ease-in-out infinite}
.api-chat-input input::placeholder{color:rgba(148,163,184,0.25);font-weight:300}
@keyframes inputBreath{0%,100%{border-color:rgba(99,102,241,0.25);box-shadow:0 0 0 2px rgba(99,102,241,0.05),inset 0 2px 8px rgba(0,0,0,0.15)}50%{border-color:rgba(139,92,246,0.35);box-shadow:0 0 0 4px rgba(139,92,246,0.08),inset 0 2px 8px rgba(0,0,0,0.15)}}
.api-chat-input .input-wrap{flex:1;position:relative}
.api-chat-input .input-wrap textarea{width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:12px 16px;font-size:13px;color:rgba(255,255,255,0.85);outline:none;font-family:'Plus Jakarta Sans',sans-serif;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 2px 8px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.02);resize:none;min-height:42px;max-height:120px;line-height:1.5}
.api-chat-input .input-wrap textarea:focus{border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.03);box-shadow:0 0 0 3px rgba(99,102,241,0.06),inset 0 2px 8px rgba(0,0,0,0.15);animation:inputBreath 3s ease-in-out infinite}
.api-chat-input .input-wrap textarea::placeholder{color:rgba(148,163,184,0.25);font-weight:300}
.api-chat-input .count{font-size:10px;color:rgba(148,163,184,0.2);font-family:'Orbitron',sans-serif;letter-spacing:0.5px;transition:color 0.3s ease;white-space:nowrap}
.api-chat-input .count.active{color:rgba(148,163,184,0.4)}
.api-chat-input .btn-send{width:42px;height:42px;border-radius:14px;border:none;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);flex-shrink:0;box-shadow:0 4px 20px rgba(99,102,241,0.2),inset 0 1px 0 rgba(255,255,255,0.1);position:relative;overflow:hidden}
.api-chat-input .btn-send::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 0%,rgba(255,255,255,0.1) 50%,transparent 100%);transform:translateX(-100%);transition:transform 0.5s ease}
.api-chat-input .btn-send:hover::before{transform:translateX(100%)}
.api-chat-input .btn-send:hover{transform:translateY(-2px) scale(1.03);background:linear-gradient(135deg,#8b5cf6,#6366f1);box-shadow:0 8px 30px rgba(99,102,241,0.3)}
.api-chat-input .btn-send:active{transform:translateY(0) scale(0.97)}
.api-chat-input .btn-send:disabled{opacity:0.3;cursor:not-allowed;transform:none;box-shadow:none}
.api-chat-input .btn-send .icon{position:relative;z-index:1;filter:drop-shadow(0 0 6px rgba(255,255,255,0.2))}"""

c = c.replace(old_input_css_block, new_input_css_block)
print('Input CSS replaced')

# ============================================================
# SECTION B: Replace the api-chat-header for glassmorphism depth
# ============================================================
old_header_css = '.api-chat-header{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);flex-shrink:0}'
new_header_css = '.api-chat-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(20,20,40,0.4);backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);flex-shrink:0;position:relative}'
c = c.replace(old_header_css, new_header_css)
print('Header CSS replaced')

# ============================================================
# SECTION C: Update Panel 0 HTML (resume)
# ============================================================
old_p0_input = """          <div class="api-chat-input">
            <input type="text" id="resumeChatInput" placeholder="粘贴简历内容或描述工作经历..." autocomplete="off">
            <button id="resumeChatSend">➤</button>
          </div>"""

new_p0_input = """          <div class="api-chat-input">
            <div class="input-wrap">
              <textarea id="resumeChatInput" placeholder="粘贴简历内容或描述工作经历..." rows="1" autocomplete="off"></textarea>
            </div>
            <span class="count" id="resumeCount">0</span>
            <button class="btn-send" id="resumeChatSend"><span class="icon">➤</span></button>
          </div>"""

c = c.replace(old_p0_input, new_p0_input)
print('Panel 0 input replaced')

# ============================================================
# SECTION D: Update Panel 1 HTML (job match)
# ============================================================
old_p1_input = """          <div class="api-chat-input">
            <input type="text" id="jobChatInput" placeholder="例: 5年 React + Node.js 开发经验..." autocomplete="off">
            <button id="jobChatSend">➤</button>
          </div>"""

new_p1_input = """          <div class="api-chat-input">
            <div class="input-wrap">
              <textarea id="jobChatInput" placeholder="例: 5年 React + Node.js 开发经验..." rows="1" autocomplete="off"></textarea>
            </div>
            <span class="count" id="jobCount">0</span>
            <button class="btn-send" id="jobChatSend"><span class="icon">➤</span></button>
          </div>"""

c = c.replace(old_p1_input, new_p1_input)
print('Panel 1 input replaced')

# ============================================================
# SECTION E: Update Panel 2 HTML (interview)
# ============================================================
old_p2_input = """              <div class="api-chat-input">
                <input type="text" id="iInput" placeholder="输入你的回答..." autocomplete="off">
                <button id="iSend">➤</button>
              </div>"""

new_p2_input = """              <div class="api-chat-input">
                <div class="input-wrap">
                  <textarea id="iInput" placeholder="输入你的回答..." rows="1" autocomplete="off"></textarea>
                </div>
                <span class="count" id="iCount">0</span>
                <button class="btn-send" id="iSend"><span class="icon">➤</span></button>
              </div>"""

c = c.replace(old_p2_input, new_p2_input)
print('Panel 2 input replaced')

# ============================================================
# SECTION F: Update all 3 JS modules to use textarea + count
# ============================================================

# Resume module
c = c.replace(
  "var msgs = document.getElementById('resumeChatMsgs');\n  var inp = document.getElementById('resumeChatInput');",
  "var msgs = document.getElementById('resumeChatMsgs');\n  var inp = document.getElementById('resumeChatInput');\n  var cnt = document.getElementById('resumeCount');"
)
c = c.replace(
  "add(t, 'user'); inp.value = '';",
  "add(t, 'user'); inp.value = ''; if(cnt) cnt.textContent = '0';"
)

# Job module
c = c.replace(
  "var msgs = document.getElementById('jobChatMsgs');\n  var inp = document.getElementById('jobChatInput');",
  "var msgs = document.getElementById('jobChatMsgs');\n  var inp = document.getElementById('jobChatInput');\n  var cnt = document.getElementById('jobCount');"
)
c = c.replace(
  "add(t, 'user'); inp.value = '';",
  "add(t, 'user'); inp.value = ''; if(cnt) cnt.textContent = '0';"
)

# Interview module  
c = c.replace(
  "var msgs = document.getElementById('iMsgs');\n  var inp = document.getElementById('iInput');",
  "var msgs = document.getElementById('iMsgs');\n  var inp = document.getElementById('iInput');\n  var cnt = document.getElementById('iCount');"
)
c = c.replace(
  "add(t,'user');inp.value='';loading(true);",
  "add(t,'user');inp.value='';if(cnt)cnt.textContent='0';loading(true);"
)

print('Count references added to JS')

# ============================================================
# SECTION G: Add auto-resize textarea + counter for ALL inputs
# ============================================================
# Find the end of the interview module (before </script>)
old_chat_generic_js = """  qIdx=1;setTimeout(showQ,600);
})();"""
new_chat_generic_js = """  qIdx=1;setTimeout(showQ,600);
})();

// === AI Chat Input: auto-resize + character count ===
(function(){
  var inputs = document.querySelectorAll('.api-chat-input textarea');
  inputs.forEach(function(el){
    el.addEventListener('input', function(){
      // Auto resize
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      // Character count
      var id = this.id;
      var countEl = null;
      if(id === 'resumeChatInput') countEl = document.getElementById('resumeCount');
      else if(id === 'jobChatInput') countEl = document.getElementById('jobCount');
      else if(id === 'iInput') countEl = document.getElementById('iCount');
      if(countEl){
        var len = this.value.length;
        countEl.textContent = len;
        countEl.classList.toggle('active', len > 0);
      }
    });
    // Enter to send (prevent newline)
    el.addEventListener('keydown', function(e){
      if(e.key === 'Enter' && !e.shiftKey){
        e.preventDefault();
        var id = this.id;
        if(id === 'resumeChatInput') document.getElementById('resumeChatSend').click();
        else if(id === 'jobChatInput') document.getElementById('jobChatSend').click();
        else if(id === 'iInput') document.getElementById('iSend').click();
      }
    });
  });
})();"""

c = c.replace(old_chat_generic_js, new_chat_generic_js)
print('Generic chat JS with auto-resize + count added')

# Fix: The interview module has its own "loading" and "add" inside that differs from resume/job
# We need to check the send answer: in the interview module it's
#   add(t,'user');inp.value='';if(cnt)cnt.textContent='0';loading(true);
# That looks correct now.

# ============================================================
# SECTION H: Add the glow border on hover for api-chat
# ============================================================
old_chat_hover = '.api-chat-msgs{flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}'
new_chat_hover = '.api-chat{display:flex;flex-direction:column;height:380px;width:100%;border-radius:18px;overflow:hidden;  background:rgba(255,255,255,0.03);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);  border:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(139,92,246,0.03),0 0 60px rgba(99,102,241,0.02);  transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}'
new_chat_hover_enhanced = '.api-chat{display:flex;flex-direction:column;height:380px;width:100%;border-radius:18px;overflow:hidden;  background:rgba(255,255,255,0.03);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);  border:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(139,92,246,0.03),0 0 60px rgba(99,102,241,0.02);  transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}'
c = c.replace(new_chat_hover, new_chat_hover_enhanced + '\n.api-chat:hover{border-color:rgba(139,92,246,0.12);box-shadow:0 8px 50px rgba(0,0,0,0.35),0 0 0 1px rgba(139,92,246,0.06),0 0 80px rgba(99,102,241,0.03);transform:translateY(-1px)}')

print('Chat hover effect added')

# ============================================================
# SECTION I: Verify
# ============================================================
with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print(f'Done! Size: {len(c)}')
print(f'Has textarea: {"textarea" in c}')
print(f'Has btn-send: {"btn-send" in c}')
print(f'Has inputBreath: {"inputBreath" in c}')
print(f'Has count: {c.count("document.getElementById")}')
print(f'Ends ok:', c.rstrip().endswith('</html>'))

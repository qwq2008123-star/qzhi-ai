# -*- coding: utf-8 -*-
"""Glassmorphism upgrade for all chat/display boxes"""
path = 'd:\\trae\\qzhi.dome\\app.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# ==========================================
# 1. api-chat - full glassmorphism
# ==========================================
old_api_chat = '.api-chat{display:flex;flex-direction:column;height:380px;width:100%;border-radius:16px;border:1px solid rgba(255,255,255,0.04);background:rgba(15,15,40,0.2);overflow:hidden}'
new_api_chat = '.api-chat{display:flex;flex-direction:column;height:380px;width:100%;border-radius:18px;overflow:hidden;\
  background:rgba(255,255,255,0.03);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);\
  border:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(139,92,246,0.03),0 0 60px rgba(99,102,241,0.02);\
  transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}'
c = c.replace(old_api_chat, new_api_chat)

# 2. api-chat-header
old_api_header = '.api-chat-header{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);flex-shrink:0}'
new_api_header = '.api-chat-header{display:flex;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);flex-shrink:0}'
c = c.replace(old_api_header, new_api_header)

# 3. api-chat-msgs - increased padding
old_api_msgs = '.api-chat-msgs{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth}'
new_api_msgs = '.api-chat-msgs{flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}'
c = c.replace(old_api_msgs, new_api_msgs)

# 4. api-msg - improve spacing, emoji handling
old_api_msg_bot = '.api-msg.bot{align-self:flex-start;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.06);border-bottom-left-radius:4px;color:rgba(255,255,255,0.8)}'
new_api_msg_bot = '.api-msg.bot{align-self:flex-start;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.06);border-bottom-left-radius:4px;color:rgba(255,255,255,0.85);backdrop-filter:blur(8px)}'
c = c.replace(old_api_msg_bot, new_api_msg_bot)

old_api_msg_user = '.api-msg.user{align-self:flex-end;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.08);border-bottom-right-radius:4px;color:rgba(255,255,255,0.7)}'
new_api_msg_user = '.api-msg.user{align-self:flex-end;background:rgba(99,102,241,0.04);border:1px solid rgba(99,102,241,0.06);border-bottom-right-radius:4px;color:rgba(255,255,255,0.85);backdrop-filter:blur(8px)}'
c = c.replace(old_api_msg_user, new_api_msg_user)

# 5. api-msg padding - increase
old_api_msg = '.api-msg{max-width:92%;padding:10px 14px;border-radius:14px;font-size:12px;line-height:1.6;animation:apiMsgIn 0.35s ease-out}'
new_api_msg = '.api-msg{max-width:92%;padding:14px 18px;border-radius:14px;font-size:13px;line-height:1.7;animation:apiMsgIn 0.35s ease-out}'
c = c.replace(old_api_msg, new_api_msg)

# 6. api-chat-input - increase padding
old_api_input = '.api-chat-input{display:flex;align-items:center;gap:6px;padding:8px 12px 10px;border-top:1px solid rgba(255,255,255,0.03);flex-shrink:0}'
new_api_input = '.api-chat-input{display:flex;align-items:center;gap:10px;padding:12px 18px 14px;border-top:1px solid rgba(255,255,255,0.03);flex-shrink:0}'
c = c.replace(old_api_input, new_api_input)

# 7. api-chat-input input
old_api_input_field = '.api-chat-input input{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:8px 12px;font-size:12px;color:rgba(255,255,255,0.7);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif}'
new_api_input_field = '.api-chat-input input{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:10px 16px;font-size:13px;color:rgba(255,255,255,0.75);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.3s ease}'
c = c.replace(old_api_input_field, new_api_input_field)

# 8. api-chat-input button - enlarge
old_api_btn = '.api-chat-input button{width:34px;height:34px;border-radius:10px;border:none;background:linear-gradient(135deg,rgba(99,102,241,0.4),rgba(139,92,246,0.3));color:#818cf8;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all 0.3s ease;flex-shrink:0}'
new_api_btn = '.api-chat-input button{width:38px;height:38px;border-radius:12px;border:none;background:linear-gradient(135deg,rgba(99,102,241,0.5),rgba(139,92,246,0.35));color:#a78bfa;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all 0.3s ease;flex-shrink:0;box-shadow:0 4px 15px rgba(99,102,241,0.12)}'
c = c.replace(old_api_btn, new_api_btn)

# 9. showCase-visual-inner glassmorphism
old_visual_inner = '.showcase-visual-inner{text-align:center;padding:30px}'
new_visual_inner = '.showcase-visual-inner{text-align:center;padding:18px;background:rgba(255,255,255,0.015);border-radius:16px;border:1px solid rgba(255,255,255,0.03);backdrop-filter:blur(12px) saturate(1.2);-webkit-backdrop-filter:blur(12px) saturate(1.2);box-shadow:0 4px 30px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.03)}'
c = c.replace(old_visual_inner, new_visual_inner)

# 10. showCase-panel glassmorphism
old_showcase_panel = '.showcase-panel{display:none;grid-template-columns:1fr 1fr;gap:40px;align-items:center;max-width:1200px;margin:0 auto;padding:0 50px}'
new_showcase_panel = '.showcase-panel{display:none;grid-template-columns:1fr 1fr;gap:40px;align-items:center;max-width:1200px;margin:0 auto;padding:0 50px;background:rgba(255,255,255,0.008);border-radius:24px;border:1px solid rgba(255,255,255,0.02);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 8px 50px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.02)}'
c = c.replace(old_showcase_panel, new_showcase_panel)

# 11. chat-card - enhance glassmorphism
old_chat_card_bg = '.chat-card{position:relative;z-index:10;background:rgba(15,15,40,0.2);border:1px solid rgba(255,255,255,0.06);\n  border-radius:20px;padding:24px;backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);\n  box-shadow:0 8px 40px rgba(0,0,0,0.2);transition:all 0.4s ease}'
new_chat_card_bg = '.chat-card{position:relative;z-index:10;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);\n  border-radius:24px;padding:28px;backdrop-filter:blur(48px) saturate(1.5);-webkit-backdrop-filter:blur(48px) saturate(1.5);\n  box-shadow:0 8px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(139,92,246,0.03),0 0 80px rgba(99,102,241,0.02);\n  transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}'
c = c.replace(old_chat_card_bg, new_chat_card_bg)

# 12. chat-card hover
old_chat_hover = '.chat-card:hover{border-color:rgba(139,92,246,0.15);box-shadow:0 8px 50px rgba(99,102,241,0.08)}'
new_chat_hover = '.chat-card:hover{border-color:rgba(139,92,246,0.15);box-shadow:0 12px 60px rgba(99,102,241,0.12),0 0 0 1px rgba(139,92,246,0.08),0 0 100px rgba(99,102,241,0.04);transform:translateY(-2px)}'
c = c.replace(old_chat_hover, new_chat_hover)

# 13. chat-msg-bubble padding ++
old_chat_bubble = '.chat-msg-bubble{padding:12px 16px;border-radius:14px;font-size:13px;line-height:1.6;max-width:85%}'
new_chat_bubble = '.chat-msg-bubble{padding:14px 20px;border-radius:14px;font-size:13px;line-height:1.7;max-width:88%;backdrop-filter:blur(4px)}'
c = c.replace(old_chat_bubble, new_chat_bubble)

# 14. chat-card-input padding
old_chat_input_area = '.chat-card-input{display:flex;gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.04)}'
new_chat_input_area = '.chat-card-input{display:flex;gap:10px;margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.04)}'
c = c.replace(old_chat_input_area, new_chat_input_area)

# 15. chat-card-input input
old_chat_input_field = '.chat-card-input input{flex:1;padding:10px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);\n  background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.8);font-size:13px;outline:none;transition:all 0.3s ease;font-family:\'Plus Jakarta Sans\',sans-serif}'
new_chat_input_field = '.chat-card-input input{flex:1;padding:12px 18px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);\n  background:rgba(255,255,255,0.02);color:rgba(255,255,255,0.85);font-size:13px;outline:none;transition:all 0.3s ease;font-family:\'Plus Jakarta Sans\',sans-serif}'
c = c.replace(old_chat_input_field, new_chat_input_field)

# 16. chat-card-header padding
old_chat_header = '.chat-card-header{display:flex;align-items:center;gap:10px;margin-bottom:18px;padding-bottom:14px;\n  border-bottom:1px solid rgba(255,255,255,0.04)}'
new_chat_header = '.chat-card-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;\n  border-bottom:1px solid rgba(255,255,255,0.04)}'
c = c.replace(old_chat_header, new_chat_header)

# 17. showcase-tabs glassmorphism
old_tabs = '.showcase-tabs{display:flex;justify-content:center;gap:4px;margin-bottom:50px;\n  background:rgba(255,255,255,0.02);padding:6px;border-radius:14px;max-width:400px;margin-left:auto;margin-right:auto}'
new_tabs = '.showcase-tabs{display:flex;justify-content:center;gap:4px;margin-bottom:50px;\n  background:rgba(255,255,255,0.015);padding:8px;border-radius:14px;max-width:420px;margin-left:auto;margin-right:auto;\n  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.02)}'
c = c.replace(old_tabs, new_tabs)

# 18. showcase-tab 
old_tab = '.showcase-tab{padding:10px 28px;border-radius:10px;border:none;\n  background:transparent;color:rgba(255,255,255,0.35);cursor:pointer;font-family:\'Orbitron\',sans-serif;font-size:12px;\n  font-weight:600;letter-spacing:0.5px;transition:all 0.3s ease;white-space:nowrap}'
new_tab = '.showcase-tab{padding:12px 32px;border-radius:10px;border:none;\n  background:transparent;color:rgba(255,255,255,0.35);cursor:pointer;font-family:\'Orbitron\',sans-serif;font-size:12px;\n  font-weight:600;letter-spacing:0.5px;transition:all 0.3s ease;white-space:nowrap}'
c = c.replace(old_tab, new_tab)

# 19. showcase-info info card glassmorphism
old_info = '.showcase-info h3{margin-bottom:16px;font-family:\'Orbitron\',sans-serif;font-size:22px;font-weight:700;line-height:1.2}'
new_info = '.showcase-info{padding:24px;background:rgba(255,255,255,0.008);border-radius:20px;border:1px solid rgba(255,255,255,0.02);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 4px 30px rgba(0,0,0,0.1)}'
# Insert BEFORE .showcase-info h3
c = c.replace('.showcase-info h3{margin-bottom:16px;font-family:\'Orbitron\',sans-serif;font-size:22px;font-weight:700;line-height:1.2}',
              new_info + '\n.showcase-info h3{margin-bottom:16px;font-family:\'Orbitron\',sans-serif;font-size:22px;font-weight:700;line-height:1.2}')

# 20. showcase-window glassmorphism + hover glow
old_window = '.showcase-window{background:rgba(15,15,40,0.4);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);border:1px solid rgba(255,255,255,0.04);border-radius:24px;box-shadow:0 20px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(99,102,241,0.03);overflow:hidden;transition:all 0.5s ease}'
new_window = '.showcase-window{background:rgba(255,255,255,0.015);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);border:1px solid rgba(255,255,255,0.04);border-radius:24px;box-shadow:0 20px 80px rgba(0,0,0,0.4),0 0 0 1px rgba(139,92,246,0.03),0 0 60px rgba(99,102,241,0.015);overflow:hidden;transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}'
c = c.replace(old_window, new_window)

# 21. growth-card glassmorphism
old_growth = '.growth-card{background:rgba(15,15,40,0.3);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);\n  border:1px solid rgba(255,255,255,0.04);border-radius:20px;padding:28px}'
new_growth = '.growth-card{background:rgba(255,255,255,0.015);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);\n  border:1px solid rgba(255,255,255,0.04);border-radius:20px;padding:28px;box-shadow:0 8px 40px rgba(0,0,0,0.15),0 0 0 1px rgba(139,92,246,0.02)}'
c = c.replace(old_growth, new_growth)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Done! Glassmorphism applied to all boxes.')
for check in ['api-chat', 'glassmorphism', 'blur(24px)', 'blur(48px)', 'backdrop-filter']:
    print(f'  {check}: {check in c}')
print(f'Size: {len(c)}')

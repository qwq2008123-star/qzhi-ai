# -*- coding: utf-8 -*-
"""Rewrite api-chat CSS with dramatically visible changes"""
path = 'd:\\trae\\qzhi.dome\\app.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# === 1. api-chat container - much more visible ===
old1 = '.api-chat{display:flex;flex-direction:column;height:400px;width:100%;border-radius:20px;overflow:hidden;background:rgba(15,15,40,0.6);backdrop-filter:blur(28px) saturate(1.5);-webkit-backdrop-filter:blur(28px) saturate(1.5);border:1px solid rgba(139,92,246,0.08);box-shadow:0 8px 40px rgba(0,0,0,0.4),0 0 0 1px rgba(139,92,246,0.04),0 0 80px rgba(99,102,241,0.04);transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}'
new1 = '.api-chat{display:flex;flex-direction:column;height:400px;width:100%;border-radius:20px;overflow:hidden;background:rgba(10,8,30,0.7);backdrop-filter:blur(32px) saturate(1.6);-webkit-backdrop-filter:blur(32px) saturate(1.6);border:1px solid rgba(139,92,246,0.1);box-shadow:0 8px 48px rgba(0,0,0,0.45),0 0 0 1px rgba(139,92,246,0.05),0 0 100px rgba(99,102,241,0.05);transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}'
c = c.replace(old1, new1)

# === 2. api-chat header - gradient + visible ===
old2 = '.api-chat-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(139,92,246,0.08);background:linear-gradient(135deg,rgba(30,20,60,0.7),rgba(20,20,50,0.5));backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);flex-shrink:0;position:relative}'
new2 = '.api-chat-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(139,92,246,0.1);background:linear-gradient(135deg,rgba(30,18,70,0.8),rgba(15,12,45,0.6));backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);flex-shrink:0;position:relative}'
c = c.replace(old2, new2)

# === 3. header name - purple glow ===
old3 = '.api-chat-header .name{font-family:\'Orbitron\',sans-serif;font-size:12px;font-weight:700;color:#a78bfa;text-shadow:0 0 20px rgba(139,92,246,0.2);letter-spacing:0.5px}'
new3 = '.api-chat-header .name{font-family:\'Orbitron\',sans-serif;font-size:12px;font-weight:700;color:#a78bfa;text-shadow:0 0 30px rgba(139,92,246,0.3),0 0 60px rgba(99,102,241,0.15);letter-spacing:0.5px}'
c = c.replace(old3, new3)

# === 4. api-badge ===
old4 = '.api-chat-header .api-badge{padding:3px 10px;border-radius:12px;font-size:9px;background:rgba(99,102,241,0.15);color:#818cf8;border:1px solid rgba(99,102,241,0.1);letter-spacing:0.5px;text-shadow:0 0 10px rgba(99,102,241,0.2)}'
new4 = '.api-chat-header .api-badge{padding:3px 10px;border-radius:12px;font-size:9px;background:rgba(99,102,241,0.12);color:#c4b5fd;border:1px solid rgba(99,102,241,0.12);letter-spacing:0.5px}'
c = c.replace(old4, new4)

# === 5. status ===
old5 = '.api-chat-header .status{margin-left:auto;font-size:9px;color:rgba(148,163,184,0.3)}'
new5 = '.api-chat-header .status{margin-left:auto;font-size:9px;color:rgba(148,163,184,0.25);font-family:\'Orbitron\',sans-serif;letter-spacing:0.3px}'
c = c.replace(old5, new5)

# === 6. chat messages area - increased padding ===
old6 = '.api-chat-msgs{flex:1;overflow-y:auto;padding:18px 20px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}'
new6 = '.api-chat-msgs{flex:1;overflow-y:auto;padding:20px 22px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}'
c = c.replace(old6, new6)

# === 7. message bubbles - bigger ===
old7 = '.api-msg{max-width:92%;padding:14px 18px;border-radius:14px;font-size:13px;line-height:1.7;animation:apiMsgIn 0.35s ease-out}'
new7 = '.api-msg{max-width:92%;padding:14px 20px;border-radius:16px;font-size:13px;line-height:1.75;animation:apiMsgIn 0.35s ease-out}'
c = c.replace(old7, new7)

# === 8. bot msg - more visible ===
old8 = '.api-msg.bot{align-self:flex-start;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.06);border-bottom-left-radius:4px;color:rgba(255,255,255,0.85);backdrop-filter:blur(8px)}'
new8 = '.api-msg.bot{align-self:flex-start;background:rgba(139,92,246,0.07);border:1px solid rgba(139,92,246,0.06);border-bottom-left-radius:4px;color:rgba(255,255,255,0.88);backdrop-filter:blur(8px)}'
c = c.replace(old8, new8)

# === 9. user msg ===
old9 = '.api-msg.user{align-self:flex-end;background:rgba(99,102,241,0.04);border:1px solid rgba(99,102,241,0.06);border-bottom-right-radius:4px;color:rgba(255,255,255,0.85);backdrop-filter:blur(8px)}'
new9 = '.api-msg.user{align-self:flex-end;background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.06);border-bottom-right-radius:4px;color:rgba(255,255,255,0.88);backdrop-filter:blur(8px)}'
c = c.replace(old9, new9)

# === 10. chat on hover - stronger ===
old10 = '.api-chat:hover{border-color:rgba(139,92,246,0.15);box-shadow:0 12px 60px rgba(0,0,0,0.45),0 0 0 1px rgba(139,92,246,0.08),0 0 100px rgba(99,102,241,0.05);transform:translateY(-2px)}'
new10 = '.api-chat:hover{border-color:rgba(139,92,246,0.18);box-shadow:0 16px 70px rgba(0,0,0,0.5),0 0 0 1px rgba(139,92,246,0.1),0 0 120px rgba(99,102,241,0.06);transform:translateY(-2px)}'
c = c.replace(old10, new10)

# === 11. Count - more visible ===
old11 = '.api-chat-input .count{font-size:11px;color:rgba(148,163,184,0.2);font-family:\'Orbitron\',sans-serif;letter-spacing:1px;transition:color 0.3s ease;white-space:nowrap;padding:2px 6px;background:rgba(0,0,0,0.15);border-radius:8px;border:1px solid rgba(255,255,255,0.02)}'
new11 = '.api-chat-input .count{font-size:11px;color:rgba(148,163,184,0.15);font-family:\'Orbitron\',sans-serif;letter-spacing:1px;transition:all 0.3s ease;white-space:nowrap;padding:3px 8px;background:rgba(0,0,0,0.2);border-radius:10px;border:1px solid rgba(148,163,184,0.04)}'
c = c.replace(old11, new11)
c = c.replace('.api-chat-input .count.active{color:#a78bfa;border-color:rgba(139,92,246,0.08)}',
              '.api-chat-input .count.active{color:#c4b5fd;border-color:rgba(139,92,246,0.12);background:rgba(99,102,241,0.06);box-shadow:0 0 20px rgba(99,102,241,0.04)}')

# === 12. textarea ===
old12 = '.api-chat-input .input-wrap textarea{width:100%;background:rgba(0,0,0,0.25);border:1px solid rgba(139,92,246,0.08);border-radius:16px;padding:14px 18px;font-size:14px;color:rgba(255,255,255,0.9);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 4px 16px rgba(0,0,0,0.25),inset 0 1px 1px rgba(139,92,246,0.04);resize:none;min-height:48px;max-height:120px;line-height:1.6}'
new12 = '.api-chat-input .input-wrap textarea{width:100%;background:rgba(0,0,0,0.25);border:1px solid rgba(139,92,246,0.08);border-radius:16px;padding:14px 18px;font-size:14px;color:rgba(255,255,255,0.9);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 4px 16px rgba(0,0,0,0.25),inset 0 1px 1px rgba(139,92,246,0.04);resize:none;min-height:48px;max-height:120px;line-height:1.6}'
# same - no change needed
# Actually let me make textarea more distinct:
old12a = 'box-shadow:inset 0 4px 16px rgba(0,0,0,0.25),inset 0 1px 1px rgba(139,92,246,0.04);resize:none;min-height:48px;'
new12a = 'box-shadow:inset 0 4px 20px rgba(0,0,0,0.3),inset 0 1px 1px rgba(139,92,246,0.06);resize:none;min-height:50px;'
c = c.replace(old12a, new12a)

# === 13. textarea focus ===
old13 = '.api-chat-input .input-wrap textarea:focus{border-color:rgba(139,92,246,0.3);background:rgba(99,102,241,0.04);box-shadow:0 0 0 4px rgba(139,92,246,0.08),0 0 30px rgba(99,102,241,0.04),inset 0 4px 16px rgba(0,0,0,0.25);animation:inputBreath 3s ease-in-out infinite}'
new13 = '.api-chat-input .input-wrap textarea:focus{border-color:rgba(139,92,246,0.3);background:rgba(99,102,241,0.04);box-shadow:0 0 0 4px rgba(139,92,246,0.08),0 0 30px rgba(99,102,241,0.04),inset 0 4px 20px rgba(0,0,0,0.3);animation:inputBreath 3s ease-in-out infinite}'
c = c.replace(old13, new13)

# === 14. btn-send - bigger glow ===
old14 = '.api-chat-input .btn-send{width:46px;height:46px;border-radius:16px;border:none;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);flex-shrink:0;box-shadow:0 4px 24px rgba(99,102,241,0.35),inset 0 1px 0 rgba(255,255,255,0.15);position:relative;overflow:hidden}'
new14 = '.api-chat-input .btn-send{width:46px;height:46px;border-radius:16px;border:none;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);flex-shrink:0;box-shadow:0 4px 24px rgba(99,102,241,0.35),inset 0 1px 0 rgba(255,255,255,0.15);position:relative;overflow:hidden}'
# same

old14a = '.api-chat-input .btn-send:hover{transform:translateY(-3px) scale(1.05);background:linear-gradient(135deg,#8b5cf6,#6366f1);box-shadow:0 12px 40px rgba(99,102,241,0.45),0 0 60px rgba(99,102,241,0.08)}'
new14a = '.api-chat-input .btn-send:hover{transform:translateY(-3px) scale(1.08);background:linear-gradient(135deg,#8b5cf6,#6366f1);box-shadow:0 16px 50px rgba(99,102,241,0.5),0 0 80px rgba(99,102,241,0.1)}'
c = c.replace(old14a, new14a)

# === 15. input area background - darker, more distinct ===
old15 = '.api-chat-input{display:flex;align-items:center;gap:12px;padding:12px 18px 14px;border-top:2px solid rgba(139,92,246,0.08);flex-shrink:0;position:relative;background:linear-gradient(180deg,rgba(20,15,40,0.7),rgba(15,10,35,0.9));backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4)}'
new15 = '.api-chat-input{display:flex;align-items:center;gap:12px;padding:14px 20px 16px;border-top:2px solid rgba(139,92,246,0.08);flex-shrink:0;position:relative;background:linear-gradient(180deg,rgba(20,12,50,0.8),rgba(10,6,30,0.95));backdrop-filter:blur(28px) saturate(1.4);-webkit-backdrop-filter:blur(28px) saturate(1.4)}'
c = c.replace(old15, new15)

# === 16. input separator line ===
old16 = '.api-chat-input::before{content:\'\';position:absolute;top:-2px;left:8%;right:8%;height:2px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.25),rgba(99,102,241,0.2),rgba(6,182,212,0.15),transparent);pointer-events:none;filter:blur(4px)}'
new16 = '.api-chat-input::before{content:\'\';position:absolute;top:-2px;left:5%;right:5%;height:2px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.3),rgba(99,102,241,0.25),rgba(6,182,212,0.2),transparent);pointer-events:none;filter:blur(5px)}'
c = c.replace(old16, new16)

# === 17. loading dots - more visible ===
old17 = '.api-loading{display:flex;gap:4px;align-items:center;padding:10px 14px;align-self:flex-start;border-radius:14px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.04);border-bottom-left-radius:4px}'
new17 = '.api-loading{display:flex;gap:5px;align-items:center;padding:12px 18px;align-self:flex-start;border-radius:16px;background:rgba(139,92,246,0.07);border:1px solid rgba(139,92,246,0.05);border-bottom-left-radius:4px}'
c = c.replace(old17, new17)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Dramatic upgrade complete!')
print(f'Size: {len(c)}')
for kw in ['rgba(10,8,30,0.7)', 'rgba(30,18,70,0.8)', 'rgba(10,6,30,0.95)', 'scale(1.08)', 'blur(32px)']:
    print(f'  {kw}: {kw in c}')
print('Ends ok:', c.rstrip().endswith('</html>'))

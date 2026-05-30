# -*- coding: utf-8 -*-
"""Surgical CSS replacement with exact old strings"""
path = 'd:\\trae\\qzhi.dome\\app.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

changes = 0

# 1. api-chat container - MUCH darker, MUCH more visible
old = '.api-chat{display:flex;flex-direction:column;height:380px;width:100%;border-radius:18px;overflow:hidden;  background:rgba(255,255,255,0.03);backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);  border:1px solid rgba(255,255,255,0.06);box-shadow:0 8px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(139,92,246,0.03),0 0 60px rgba(99,102,241,0.02);  transition:all 0.4s cubic-bezier(0.4,0,0.2,1)}'
new = '.api-chat{display:flex;flex-direction:column;height:400px;width:100%;border-radius:20px;overflow:hidden;background:rgba(12,8,35,0.75);backdrop-filter:blur(32px) saturate(1.5);-webkit-backdrop-filter:blur(32px) saturate(1.5);border:1px solid rgba(139,92,246,0.1);box-shadow:0 8px 48px rgba(0,0,0,0.45),0 0 0 1px rgba(139,92,246,0.05),0 0 100px rgba(99,102,241,0.04);transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('1. api-chat container: REPLACED')
else:
    print('1. api-chat container: NOT FOUND')

# 2. api-chat hover  
old = '.api-chat:hover{border-color:rgba(139,92,246,0.12);box-shadow:0 8px 50px rgba(0,0,0,0.35),0 0 0 1px rgba(139,92,246,0.06),0 0 80px rgba(99,102,241,0.03);transform:translateY(-1px)}'
new = '.api-chat:hover{border-color:rgba(139,92,246,0.2);box-shadow:0 16px 70px rgba(0,0,0,0.5),0 0 0 1px rgba(139,92,246,0.1),0 0 120px rgba(99,102,241,0.06);transform:translateY(-2px)}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('2. api-chat hover: REPLACED')

# 3. header - more visible gradient
old = '.api-chat-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(20,20,40,0.4);backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);flex-shrink:0;position:relative}'
new = '.api-chat-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid rgba(139,92,246,0.08);background:linear-gradient(135deg,rgba(25,15,55,0.8),rgba(12,8,35,0.6));backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);flex-shrink:0;position:relative}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('3. header: REPLACED')

# 4. header name - purple glow
old = ".api-chat-header .name{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:600;color:rgba(255,255,255,0.5)}"
new = ".api-chat-header .name{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;color:#a78bfa;text-shadow:0 0 30px rgba(139,92,246,0.3);letter-spacing:0.5px}"
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('4. header name: REPLACED')

# 5. badge - more visible
old = '.api-chat-header .api-badge{padding:2px 8px;border-radius:10px;font-size:8px;background:rgba(99,102,241,0.1);color:#818cf8;letter-spacing:0.5px}'
new = '.api-chat-header .api-badge{padding:3px 10px;border-radius:10px;font-size:9px;background:rgba(99,102,241,0.12);color:#c4b5fd;border:1px solid rgba(99,102,241,0.1);letter-spacing:0.5px}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('5. badge: REPLACED')

# 6. REMOVE old .api-chat-input input rules (they conflict with textarea)
old = '.api-chat-input input{flex:1;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:10px 16px;font-size:13px;color:rgba(255,255,255,0.85);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 2px 8px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.02)}'
if old in c:
    c = c.replace(old, '')
    changes += 1
    print('6. old input rule: REMOVED')

old = '.api-chat-input input:focus{border-color:rgba(99,102,241,0.25);background:rgba(99,102,241,0.03);box-shadow:0 0 0 2px rgba(99,102,241,0.05),inset 0 2px 8px rgba(0,0,0,0.15);animation:inputBreath 3s ease-in-out infinite}'
if old in c:
    c = c.replace(old, '')
    changes += 1
    print('7. old input focus: REMOVED')

old = ".api-chat-input input::placeholder{color:rgba(148,163,184,0.25);font-weight:300}"
if old in c:
    c = c.replace(old, '')
    changes += 1
    print('8. old input placeholder: REMOVED')

# 7. textarea - MUCH more distinct styling
old = '.api-chat-input .input-wrap textarea{width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:12px 16px;font-size:13px;color:rgba(255,255,255,0.85);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 2px 8px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.02);resize:none;min-height:42px;max-height:120px;line-height:1.5}'
new = '.api-chat-input .input-wrap textarea{width:100%;background:rgba(0,0,0,0.2);border:1px solid rgba(139,92,246,0.06);border-radius:16px;padding:14px 18px;font-size:14px;color:rgba(255,255,255,0.9);outline:none;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);box-shadow:inset 0 4px 20px rgba(0,0,0,0.25),inset 0 1px 1px rgba(139,92,246,0.04);resize:none;min-height:48px;max-height:130px;line-height:1.65}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('9. textarea: REPLACED')

# 8. textarea focus
old = '.api-chat-input .input-wrap textarea:focus{border-color:rgba(99,102,241,0.3);background:rgba(99,102,241,0.03);box-shadow:0 0 0 3px rgba(99,102,241,0.06),inset 0 2px 8px rgba(0,0,0,0.15);animation:inputBreath 3s ease-in-out infinite}'
new = '.api-chat-input .input-wrap textarea:focus{border-color:rgba(139,92,246,0.25);background:rgba(99,102,241,0.03);box-shadow:0 0 0 4px rgba(139,92,246,0.06),0 0 30px rgba(99,102,241,0.03),inset 0 4px 20px rgba(0,0,0,0.25);animation:inputBreath 3s ease-in-out infinite}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('10. textarea focus: REPLACED')

# 9. textarea placeholder  
old = ".api-chat-input .input-wrap textarea::placeholder{color:rgba(148,163,184,0.25);font-weight:300}"
new = ".api-chat-input .input-wrap textarea::placeholder{color:rgba(148,163,184,0.15);font-weight:300;font-style:italic}"
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('11. textarea placeholder: REPLACED')

# 10. inputBreath - more dramatic
old = '@keyframes inputBreath{0%,100%{border-color:rgba(99,102,241,0.25);box-shadow:0 0 0 2px rgba(99,102,241,0.05),inset 0 2px 8px rgba(0,0,0,0.15)}50%{border-color:rgba(139,92,246,0.35);box-shadow:0 0 0 4px rgba(139,92,246,0.08),inset 0 2px 8px rgba(0,0,0,0.15)}}'
new = '@keyframes inputBreath{0%,100%{border-color:rgba(139,92,246,0.2);box-shadow:0 0 0 4px rgba(139,92,246,0.04),inset 0 4px 20px rgba(0,0,0,0.25)}50%{border-color:rgba(139,92,246,0.3);box-shadow:0 0 0 6px rgba(139,92,246,0.08),0 0 40px rgba(99,102,241,0.04),inset 0 4px 20px rgba(0,0,0,0.25)}}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('12. inputBreath: REPLACED')

# 11. count - more visible
old = '.api-chat-input .count{font-size:10px;color:rgba(148,163,184,0.2);font-family:\'Orbitron\',sans-serif;letter-spacing:0.5px;transition:color 0.3s ease;white-space:nowrap}'
new = '.api-chat-input .count{font-size:11px;color:rgba(148,163,184,0.15);font-family:\'Orbitron\',sans-serif;letter-spacing:0.8px;transition:all 0.3s ease;white-space:nowrap;padding:2px 8px;background:rgba(0,0,0,0.12);border-radius:8px;border:1px solid rgba(148,163,184,0.03)}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('13. count: REPLACED')

old = '.api-chat-input .count.active{color:rgba(148,163,184,0.4)}'
new = '.api-chat-input .count.active{color:#c4b5fd;border-color:rgba(139,92,246,0.08);background:rgba(99,102,241,0.04);box-shadow:0 0 20px rgba(99,102,241,0.02)}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('14. count active: REPLACED')

# 12. btn-send - bigger
old = '.api-chat-input .btn-send{width:42px;height:42px;border-radius:14px;border:none;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);flex-shrink:0;box-shadow:0 4px 20px rgba(99,102,241,0.2),inset 0 1px 0 rgba(255,255,255,0.1);position:relative;overflow:hidden}'
new = '.api-chat-input .btn-send{width:48px;height:48px;border-radius:16px;border:none;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);flex-shrink:0;box-shadow:0 4px 24px rgba(99,102,241,0.3),inset 0 1px 0 rgba(255,255,255,0.15);position:relative;overflow:hidden}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('15. btn-send: REPLACED')

old = '.api-chat-input .btn-send:hover{transform:translateY(-2px) scale(1.03);background:linear-gradient(135deg,#8b5cf6,#6366f1);box-shadow:0 8px 30px rgba(99,102,241,0.3)}'
new = '.api-chat-input .btn-send:hover{transform:translateY(-3px) scale(1.06);background:linear-gradient(135deg,#8b5cf6,#6366f1);box-shadow:0 12px 40px rgba(99,102,241,0.45),0 0 60px rgba(99,102,241,0.08)}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('16. btn-send hover: REPLACED')

# 13. input area - darker
old = '.api-chat-input{display:flex;align-items:center;gap:10px;padding:10px 16px 12px;border-top:1px solid rgba(255,255,255,0.04);flex-shrink:0;position:relative;background:rgba(20,20,40,0.5);backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3)}'
new = '.api-chat-input{display:flex;align-items:center;gap:12px;padding:14px 20px 16px;border-top:2px solid rgba(139,92,246,0.08);flex-shrink:0;position:relative;background:linear-gradient(180deg,rgba(15,10,40,0.7),rgba(8,4,25,0.9));backdrop-filter:blur(24px) saturate(1.3);-webkit-backdrop-filter:blur(24px) saturate(1.3)}'
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('17. input area: REPLACED')

# 14. input separator line
old = ".api-chat-input::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.15),rgba(139,92,246,0.1),transparent);pointer-events:none}"
new = ".api-chat-input::before{content:'';position:absolute;top:-2px;left:5%;right:5%;height:2px;background:linear-gradient(90deg,transparent,rgba(139,92,246,0.25),rgba(99,102,241,0.2),rgba(6,182,212,0.15),transparent);pointer-events:none;filter:blur(3px)}"
if old in c:
    c = c.replace(old, new)
    changes += 1
    print('18. separator: REPLACED')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print(f'\nTotal replacements: {changes}/18')
print(f'Size: {len(c)}')

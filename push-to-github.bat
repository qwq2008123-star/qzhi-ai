@echo off
chcp 65001 > nul
echo ========================================
echo    智职AI - 推送到 GitHub
echo ========================================
echo.

set GIT_PATH=C:\Program Files\Git\cmd\git.exe

echo [1/3] 检查仓库状态...
"%GIT_PATH%" status
echo.

echo [2/3] 推送到 GitHub...
echo.
echo 提示：
echo - 用户名：qwq2008123-star
echo - 密码：请粘贴您刚才复制的 Token (ghp_...)
echo.
"%GIT_PATH%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo    推送成功！
    echo ========================================
    echo.
    echo 您的项目已发布到：https://github.com/qwq2008123-star/qzhi-ai
    echo.
) else (
    echo.
    echo ========================================
    echo    推送失败
    echo ========================================
    echo.
    echo 请检查：
    echo 1. 确认仓库已创建：https://github.com/qwq2008123-star/qzhi-ai
    echo 2. 确认 Token 已正确复制
    echo.
)

pause

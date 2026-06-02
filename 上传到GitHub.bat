@echo off
chcp 65001
echo ==============================================
echo     智职AI项目 - 一键推送到GitHub
echo ==============================================
echo.
echo 当前本地文件状态：
echo - feature-ai-resume.html 已准备好上传
echo - 本地分支领先远程 2 个提交
echo.
echo 请确保您的网络连接正常！
echo.
set /p "token=请输入您的GitHub Access Token: "

echo.
echo 正在推送代码到 GitHub...

cd /d "d:\trae\qzhi.dome"

echo 1. 推送最新代码...
"C:\Program Files\Git\cmd\git.exe" push https://%token%@github.com/qwq2008123-star/qzhi-ai.git main

echo.
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 您的网站将在以下地址可用：
    echo https://qwq2008123-star.github.io/qzhi-ai
    echo https://qwq2008123-star.github.io/qzhi-ai/feature-ai-resume.html
) else (
    echo ❌ 推送失败
    echo 请检查：
    echo 1. 网络连接是否正常
    echo 2. Token 是否正确（格式：ghp_xxxxxx）
)

echo.
echo 按任意键退出...
pause >nul
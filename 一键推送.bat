@echo off
chcp 65001
echo ==============================================
echo          智职AI项目 - 一键推送到GitHub
echo ==============================================
echo.
echo 注意：请确保您的网络连接正常，并且已经生成了GitHub Access Token
echo.
set /p "token=请输入您的GitHub Access Token: "
set "repo=qwq2008123-star/qzhi-ai"

echo.
echo 正在推送代码到 GitHub...
echo.

cd /d "d:\trae\qzhi.dome"

echo 1. 添加所有文件...
"C:\Program Files\Git\cmd\git.exe" add .

echo.
echo 2. 创建提交...
"C:\Program Files\Git\cmd\git.exe" commit -m "Update project files"

echo.
echo 3. 推送到GitHub...
"C:\Program Files\Git\cmd\git.exe" push https://%token%@github.com/%repo%.git main

echo.
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 您的网站将在以下地址可用：
    echo https://qwq2008123-star.github.io/qzhi-ai
) else (
    echo ❌ 推送失败，请检查网络连接或Token是否正确
)

echo.
echo 按任意键退出...
pause >nul
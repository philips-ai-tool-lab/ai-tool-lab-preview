@echo off
cd /d "%~dp0"
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 5; Start-Process 'http://localhost:3000/'"
echo Starting Philips Agent Builder Lab...
echo The browser will open automatically. Keep this window open while using the site.
npm run dev
pause

@echo off
echo Iniciando Bot do Telegram...
cd /d "%~dp0"
node .aios-core\scripts\telegram-bot.js
pause

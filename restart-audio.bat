@echo off
:: Ensure admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Please right-click this file and select "Run as administrator".
    pause
    exit /b
)

echo ==============================================
echo Restarting Windows Audio Services...
net stop Audiosrv /y
net start Audiosrv
net start AudioEndpointBuilder
echo ==============================================
echo [SUCCESS] Windows Audio Services restarted!
echo Please restart Antigravity and try again.
echo.
pause

@echo off
:: Ensure admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Please right-click this file and select "Run as administrator".
    pause
    exit /b
)

echo ==============================================
echo Stopping Nahimic Service...
net stop NahimicService
echo.

echo Disabling Nahimic Service...
sc config NahimicService start= disabled
echo.

echo Terminating remaining Nahimic processes...
taskkill /f /im Nahimic3.exe /fi "STATUS eq RUNNING"
taskkill /f /im NahimicService.exe /fi "STATUS eq RUNNING"
taskkill /f /im NahimicSvc64.exe /fi "STATUS eq RUNNING"
taskkill /f /im NahimicSvc32.exe /fi "STATUS eq RUNNING"
echo.

echo ==============================================
echo [SUCCESS] Nahimic has been stopped and disabled!
echo Please close and restart Antigravity now.
echo.
pause

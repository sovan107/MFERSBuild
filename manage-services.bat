@echo off
REM Microfrontend Services Management Batch Wrapper
REM This batch file provides easy access to the PowerShell management script

cd /d "D:\React\MFERSBuild"

if "%1"=="" (
    powershell -ExecutionPolicy Bypass -File ".\manage.ps1" help
) else (
    powershell -ExecutionPolicy Bypass -File ".\manage.ps1" %1
)

pause

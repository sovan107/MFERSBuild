# Simple Microfrontend Services Manager
param([string]$Action = "help")

function Stop-Services {
    Write-Host "Stopping all Node.js processes..." -ForegroundColor Yellow
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Host "All services stopped!" -ForegroundColor Green
}

function Start-Services {
    Write-Host "Starting all microfrontend services..." -ForegroundColor Yellow
    
    # Start Child (React 17) on port 3001
    Write-Host "Starting Child (React 17)..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\React\MFERSBuild\child'; npm run dev"
    Start-Sleep 3
    
    # Start Child18 (React 18) on port 3002
    Write-Host "Starting Child18 (React 18)..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\React\MFERSBuild\child18'; npm run dev"
    Start-Sleep 3
    
    # Start Host on port 3000
    Write-Host "Starting Host Application..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\React\MFERSBuild\host'; npm run dev"
    
    Write-Host "All services starting... Please wait a moment for them to be ready." -ForegroundColor Green
}

function Show-Status {
    Write-Host "Checking service status..." -ForegroundColor Yellow
    
    $ports = @(3000, 3001, 3002)
    $names = @("Host", "Child", "Child18")
    
    for ($i = 0; $i -lt $ports.Length; $i++) {
        $port = $ports[$i]
        $name = $names[$i]
        
        try {
            $result = Test-NetConnection -ComputerName "localhost" -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
            if ($result) {
                Write-Host "$name (Port $port): RUNNING" -ForegroundColor Green
            } else {
                Write-Host "$name (Port $port): STOPPED" -ForegroundColor Red
            }
        }
        catch {
            Write-Host "$name (Port $port): STOPPED" -ForegroundColor Red
        }
    }
}

function Show-Help {
    Write-Host ""
    Write-Host "=== Microfrontend Services Manager ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\manage.ps1 [action]" -ForegroundColor White
    Write-Host ""
    Write-Host "Actions:" -ForegroundColor Yellow
    Write-Host "  start   - Start all services (child, child18, host)" -ForegroundColor White
    Write-Host "  stop    - Stop all services" -ForegroundColor White
    Write-Host "  restart - Stop and start all services" -ForegroundColor White
    Write-Host "  status  - Show current status" -ForegroundColor White
    Write-Host "  help    - Show this help" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\manage.ps1 start" -ForegroundColor Gray
    Write-Host "  .\manage.ps1 stop" -ForegroundColor Gray
    Write-Host "  .\manage.ps1 status" -ForegroundColor Gray
}

# Main execution
switch ($Action.ToLower()) {
    "start" { Start-Services }
    "stop" { Stop-Services }
    "restart" { 
        Stop-Services
        Start-Sleep 3
        Start-Services
    }
    "status" { Show-Status }
    default { Show-Help }
}

Write-Host ""

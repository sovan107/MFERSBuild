# Microfrontend Services Management Script
# This script helps manage all microfrontend applications (host, child, child18)

param(
    [Parameter(Position=0)]
    [ValidateSet("start", "stop", "restart", "status", "help")]
    [string]$Action = "help"
)

# Configuration
$Services = @{
    "child" = @{
        "path" = "D:\React\MFERSBuild\child"
        "port" = 3001
        "name" = "Child (React 17)"
    }
    "child18" = @{
        "path" = "D:\React\MFERSBuild\child18"
        "port" = 3002
        "name" = "Child18 (React 18)"
    }
    "host" = @{
        "path" = "D:\React\MFERSBuild\host"
        "port" = 3000
        "name" = "Host Application"
    }
}

function Write-Header {
    param([string]$Title)
    Write-Host ""
    Write-Host "=" * 60 -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Yellow
    Write-Host "=" * 60 -ForegroundColor Cyan
    Write-Host ""
}

function Write-ServiceStatus {
    param([string]$ServiceName, [string]$Status, [string]$Color = "White")
    $padding = " " * (15 - $ServiceName.Length)
    Write-Host "  $ServiceName$padding : " -NoNewline
    Write-Host $Status -ForegroundColor $Color
}

function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName "localhost" -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
        return $connection
    }
    catch {
        return $false
    }
}

function Stop-AllServices {
    Write-Header "Stopping All Microfrontend Services"
    
    # Kill all node processes
    Write-Host "  Terminating all Node.js processes..." -ForegroundColor Yellow
    try {
        $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
        if ($nodeProcesses) {
            $nodeProcesses | Stop-Process -Force
            Write-Host "  ✓ All Node.js processes terminated" -ForegroundColor Green
        } else {
            Write-Host "  ℹ No Node.js processes found" -ForegroundColor Blue
        }
    }
    catch {
        Write-Host "  ⚠ Error stopping Node.js processes: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Wait a moment for ports to be released
    Start-Sleep -Seconds 2
    
    # Check port status
    Write-Host ""
    Write-Host "  Port Status After Cleanup:" -ForegroundColor Cyan
    foreach ($service in $Services.GetEnumerator()) {
        $port = $service.Value.port
        $isRunning = Test-Port -Port $port
        if ($isRunning) {
            Write-ServiceStatus $service.Key "Port $port still occupied" "Red"
        } else {
            Write-ServiceStatus $service.Key "Port $port available" "Green"
        }
    }
}

function Start-AllServices {
    Write-Header "Starting All Microfrontend Services"
    
    # Start services in order: child, child18, then host
    $startOrder = @("child", "child18", "host")
    
    foreach ($serviceName in $startOrder) {
        $service = $Services[$serviceName]
        $servicePath = $service.path
        $servicePort = $service.port
        $displayName = $service.name
        
        Write-Host "  Starting $displayName..." -ForegroundColor Yellow
        Write-Host "    Path: $servicePath" -ForegroundColor Gray
        Write-Host "    Port: $servicePort" -ForegroundColor Gray
        
        # Check if directory exists
        if (-not (Test-Path $servicePath)) {
            Write-Host "    ✗ Directory not found: $servicePath" -ForegroundColor Red
            continue
        }
        
        # Check if port is available
        if (Test-Port -Port $servicePort) {
            Write-Host "    ⚠ Port $servicePort is already in use" -ForegroundColor Red
            continue
        }
        
        try {
            # Start the service in a new PowerShell window
            $processArgs = @{
                FilePath = "powershell"
                ArgumentList = @(
                    "-NoExit",
                    "-Command",
                    "cd '$servicePath'; Write-Host 'Starting $displayName on port $servicePort...' -ForegroundColor Green; npm run dev"
                )
                PassThru = $true
                WindowStyle = "Normal"
            }
            
            $process = Start-Process @processArgs
            
            # Wait a moment and check if the service started
            Start-Sleep -Seconds 3
            
            if (Test-Port -Port $servicePort) {
                Write-Host "    ✓ $displayName started successfully on port $servicePort" -ForegroundColor Green
            } else {
                Write-Host "    ⚠ $displayName may still be starting..." -ForegroundColor Yellow
            }
        }
        catch {
            Write-Host "    ✗ Failed to start $displayName : $($_.Exception.Message)" -ForegroundColor Red
        }
        
        Write-Host ""
    }
    
    # Show final status
    Start-Sleep -Seconds 5
    Show-Status
}

function Show-Status {
    Write-Header "Microfrontend Services Status"
    
    foreach ($service in $Services.GetEnumerator()) {
        $serviceName = $service.Key
        $serviceInfo = $service.Value
        $port = $serviceInfo.port
        $displayName = $serviceInfo.name
        
        $isRunning = Test-Port -Port $port
        
        Write-Host "  $displayName" -ForegroundColor Cyan
        Write-Host "    Port: $port" -ForegroundColor Gray
        Write-Host "    Status: " -NoNewline
        
        if ($isRunning) {
            Write-Host "RUNNING" -ForegroundColor Green
            Write-Host "    URL: http://localhost:$port" -ForegroundColor Blue
        } else {
            Write-Host "STOPPED" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    # Show URLs if all services are running
    $allRunning = $true
    foreach ($service in $Services.GetEnumerator()) {
        if (-not (Test-Port -Port $service.Value.port)) {
            $allRunning = $false
            break
        }
    }
    
    if ($allRunning) {
        Write-Host "  🎉 All services are running!" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Access URLs:" -ForegroundColor Cyan
        Write-Host "    Host Application: http://localhost:3000" -ForegroundColor Blue
        Write-Host "    Child (React 17): http://localhost:3001" -ForegroundColor Blue
        Write-Host "    Child18 (React 18): http://localhost:3002" -ForegroundColor Blue
    }
}

function Show-Help {
    Write-Header "Microfrontend Services Management Script"
    
    Write-Host "USAGE:" -ForegroundColor Cyan
    Write-Host "  .\manage-services.ps1 [action]" -ForegroundColor White
    Write-Host ""
    
    Write-Host "ACTIONS:" -ForegroundColor Cyan
    Write-Host "  start    - Start all microfrontend services" -ForegroundColor White
    Write-Host "  stop     - Stop all microfrontend services" -ForegroundColor White
    Write-Host "  restart  - Stop and then start all services" -ForegroundColor White
    Write-Host "  status   - Show current status of all services" -ForegroundColor White
    Write-Host "  help     - Show this help message" -ForegroundColor White
    Write-Host ""
    
    Write-Host "EXAMPLES:" -ForegroundColor Cyan
    Write-Host "  .\manage-services.ps1 start" -ForegroundColor Yellow
    Write-Host "  .\manage-services.ps1 stop" -ForegroundColor Yellow
    Write-Host "  .\manage-services.ps1 restart" -ForegroundColor Yellow
    Write-Host "  .\manage-services.ps1 status" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "SERVICES MANAGED:" -ForegroundColor Cyan
    foreach ($service in $Services.GetEnumerator()) {
        $info = $service.Value
        Write-Host "  $($service.Key.PadRight(10)) - $($info.name) (Port $($info.port))" -ForegroundColor White
    }
}

# Main script execution
switch ($Action.ToLower()) {
    "start" {
        Start-AllServices
    }
    "stop" {
        Stop-AllServices
    }
    "restart" {
        Stop-AllServices
        Write-Host ""
        Write-Host "Waiting 5 seconds before starting services..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Start-AllServices
    }
    "status" {
        Show-Status
    }
    "help" {
        Show-Help
    }
    default {
        Show-Help
    }
}

Write-Host ""
Write-Host "Script completed!" -ForegroundColor Green
Write-Host ""

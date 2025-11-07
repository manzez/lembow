# Lembow Application Startup Script (PowerShell)
# This script starts both the API server and web application

Write-Host "Starting Lembow Application..." -ForegroundColor Green
Write-Host ""

# Kill any existing node processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
try {
    taskkill /IM node.exe /F 2>$null | Out-Null
    Write-Host "Cleaned up existing node processes" -ForegroundColor Green
} catch {
    Write-Host "No existing node processes found" -ForegroundColor Cyan
}

# Wait for processes to close
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "Starting API Server (Port 4001)..." -ForegroundColor Blue
$apiPath = "apps\api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$apiPath'; node src\server.js" -WindowStyle Minimized

# Wait for API server to start
Start-Sleep -Seconds 3

Write-Host "Starting Web Application (Port 3005)..." -ForegroundColor Blue
$webPath = "apps\web"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$webPath'; npm run dev -- -p 3005" -WindowStyle Minimized

Write-Host ""
Write-Host "Both servers starting..." -ForegroundColor Green
Write-Host ""
Write-Host "Application URLs:" -ForegroundColor Cyan
Write-Host "   Web App: http://localhost:3005" -ForegroundColor White
Write-Host "   API:     http://localhost:4001" -ForegroundColor White  
Write-Host "   Health:  http://localhost:4001/health" -ForegroundColor White
Write-Host ""
Write-Host "Waiting for servers to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Lembow application should now be running!" -ForegroundColor Green
Write-Host "Visit http://localhost:3005 to get started" -ForegroundColor Cyan

# Open web browser
Start-Process "http://localhost:3005"
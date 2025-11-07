# Quick Start Development Servers
# Run this after setup is complete

# Start both servers in background
Write-Host "Starting Lembow development servers..." -ForegroundColor Green
Write-Host ""

# Start API server in background
Write-Host "Starting API server on port 4000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; pnpm --filter @community/api start:dev"

# Wait a moment for API to start
Start-Sleep 3

# Start Web server in background  
Write-Host "Starting Web server on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; pnpm --filter @community/web dev"

Write-Host ""
Write-Host "🚀 Both servers are starting..." -ForegroundColor Green
Write-Host "📱 Web App: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔌 API: http://localhost:4000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Check the API terminal window for magic login links!" -ForegroundColor Magenta
Write-Host "Press any key to exit this script..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
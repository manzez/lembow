@echo off
echo ============================================
echo Lembow Development Setup Script
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again
    pause
    exit /b 1
)

echo [✓] Node.js found: 
node --version

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo [!] pnpm not found. Installing pnpm...
    npm install -g pnpm
    if errorlevel 1 (
        echo [ERROR] Failed to install pnpm
        pause
        exit /b 1
    )
)

echo [✓] pnpm found: 
pnpm --version

echo.
echo [1/5] Installing dependencies...
pnpm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Generating Prisma client...
pnpm --filter @community/db generate
if errorlevel 1 (
    echo [ERROR] Failed to generate Prisma client
    pause
    exit /b 1
)

echo.
echo [3/5] Setting up database schema...
echo Make sure PostgreSQL is running before proceeding!
echo Press any key to continue or Ctrl+C to cancel...
pause >nul

pnpm db:push
if errorlevel 1 (
    echo [ERROR] Failed to push database schema
    echo Make sure PostgreSQL is running and DATABASE_URL is correct
    pause
    exit /b 1
)

echo.
echo [4/5] Seeding database...
pnpm db:seed
if errorlevel 1 (
    echo [ERROR] Failed to seed database
    pause
    exit /b 1
)

echo.
echo [5/5] Setup complete!
echo.
echo ============================================
echo   🎉 Lembow is ready for development!
echo ============================================
echo.
echo Next steps:
echo 1. Start the API server:
echo    pnpm --filter @community/api start:dev
echo.
echo 2. In another terminal, start the web server:
echo    pnpm --filter @community/web dev
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo Check the API terminal for magic login links!
echo ============================================
pause
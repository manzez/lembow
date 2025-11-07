#!/bin/bash
# Lembow Application Startup Script
# This script starts both the API server and web application

echo "🚀 Starting Lembow Application..."
echo ""

# Kill any existing node processes
echo "🔄 Cleaning up existing processes..."
taskkill /IM node.exe /F 2>nul || echo "No existing node processes found"

# Wait a moment for processes to close
sleep 2

echo ""
echo "📡 Starting API Server (Port 4001)..."
cd apps/api
start /B node src/server.js

# Wait for API server to start
sleep 3

echo "🌐 Starting Web Application (Port 3005)..."
cd ../web
start /B npm run dev -- -p 3005

echo ""
echo "✅ Both servers starting..."
echo ""
echo "🔗 Application URLs:"
echo "   • Web App: http://localhost:3005"
echo "   • API:     http://localhost:4001"
echo "   • Health:  http://localhost:4001/health"
echo ""
echo "⏳ Waiting for servers to be ready..."
sleep 5

echo "🎉 Lembow application should now be running!"
echo "   Visit http://localhost:3005 to get started"
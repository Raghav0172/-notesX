# NotesX One-Click Startup Script
# Sets npm registry, installs dependencies, and runs both backend & frontend

Write-Host "🚀 NotesX Startup Script" -ForegroundColor Cyan

# Step 1: Fix npm registry/SSL
Write-Host "`n📦 Configuring npm..." -ForegroundColor Yellow
npm config set strict-ssl false
npm config set registry http://registry.npmjs.org/

# Step 2: Install backend
Write-Host "`n📥 Installing backend dependencies..." -ForegroundColor Yellow
cd "backend"
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Backend install failed" -ForegroundColor Red
  exit 1
}
cd ..

# Step 3: Install frontend
Write-Host "`n📥 Installing frontend dependencies..." -ForegroundColor Yellow
cd "frontend"
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Frontend install failed" -ForegroundColor Red
  exit 1
}
cd ..

# Step 4: Start services
Write-Host "`n🌟 Starting backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "cd 'backend'; npm run dev; Read-Host 'Press Enter to exit'"

Write-Host "⏳ Waiting 3 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "`n🌟 Starting frontend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "cd 'frontend'; npm run dev; Read-Host 'Press Enter to exit'"

Write-Host "`n✅ Both servers started!" -ForegroundColor Green
Write-Host "📍 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📍 Health check: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host "`n⚠️  Note: Configure .env files in backend/ and frontend/ with Firebase credentials before using." -ForegroundColor Yellow

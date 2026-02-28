# Start Django in a new window, then start the frontend in this window.
# Run from project root: .\start-app.ps1

$projectRoot = $PSScriptRoot
$frontendPath = Join-Path $projectRoot "frontend"

Write-Host "Starting Django backend in a new window..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$projectRoot'; if (Test-Path '.\venv\Scripts\Activate.ps1') { .\venv\Scripts\Activate.ps1 }; python manage.py runserver"
)

Write-Host "Waiting 3 seconds for Django to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Starting React frontend (Vite)..." -ForegroundColor Cyan
Write-Host "Open http://localhost:5173 in your browser when ready." -ForegroundColor Green
Set-Location $frontendPath
npm run dev

# CampusDine Database Setup Script
# Handles XAMPP MySQL (which often has no root password)

$projectRoot = "C:\Users\NILE\Documents\trae_projects\CARTEEN\Dine"
Set-Location $projectRoot

$mysqlPath = "C:\xampp\mysql\bin\mysql.exe"
$sqlFile = Join-Path $projectRoot "api\create-database-simple.sql"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CampusDine Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if files exist
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ SQL file not found: $sqlFile" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $mysqlPath)) {
    Write-Host "❌ MySQL not found: $mysqlPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Files found" -ForegroundColor Green
Write-Host ""

# Try without password first (XAMPP default)
Write-Host "Attempting connection (XAMPP often has no root password)..." -ForegroundColor Yellow
$testResult = & $mysqlPath -u root -e "SELECT 1;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Connected successfully without password!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Creating database and tables..." -ForegroundColor Cyan
    
    Get-Content $sqlFile -Raw | & $mysqlPath -u root 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Database setup completed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. cd api" -ForegroundColor Yellow
        Write-Host "2. npm start" -ForegroundColor Yellow
        Write-Host "3. node create-admin.js" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "❌ Error creating database. Check the error above." -ForegroundColor Red
    }
} else {
    Write-Host "❌ Connection failed. Trying with password..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try with password
    Write-Host "Enter your MySQL root password (or press Enter if no password):" -ForegroundColor Yellow
    $password = Read-Host
    
    if ($password) {
        $securePassword = ConvertTo-SecureString $password -AsPlainText -Force
        $passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword))
        
        Write-Host ""
        Write-Host "Creating database and tables..." -ForegroundColor Cyan
        Get-Content $sqlFile -Raw | & $mysqlPath -u root -p$passwordPlain 2>&1
    } else {
        Write-Host ""
        Write-Host "Creating database and tables (no password)..." -ForegroundColor Cyan
        Get-Content $sqlFile -Raw | & $mysqlPath -u root 2>&1
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Database setup completed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Error occurred. Possible issues:" -ForegroundColor Red
        Write-Host "   - Wrong password" -ForegroundColor Yellow
        Write-Host "   - MySQL service not running" -ForegroundColor Yellow
        Write-Host "   - Try opening XAMPP Control Panel and start MySQL" -ForegroundColor Yellow
    }
}


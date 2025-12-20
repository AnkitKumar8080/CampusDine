# Test MySQL Connection Script
# This will help you find the correct MySQL password

$mysqlPath = "C:\xampp\mysql\bin\mysql.exe"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MySQL Connection Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try connecting without password (XAMPP default)
Write-Host "Attempting to connect without password (XAMPP default)..." -ForegroundColor Yellow
$result = & $mysqlPath -u root -e "SELECT 'Connection successful!' AS Status;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Success! MySQL root user has no password (XAMPP default)" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can run the setup with:" -ForegroundColor Cyan
    Write-Host 'Get-Content api\create-database-simple.sql | & "C:\xampp\mysql\bin\mysql.exe" -u root' -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "❌ Connection failed without password" -ForegroundColor Red
    Write-Host ""
    Write-Host "The error was:" -ForegroundColor Yellow
    Write-Host $result -ForegroundColor Gray
    Write-Host ""
    Write-Host "Please try one of these:" -ForegroundColor Cyan
    Write-Host "1. Enter your MySQL root password when prompted" -ForegroundColor Yellow
    Write-Host "2. Reset MySQL root password" -ForegroundColor Yellow
    Write-Host "3. Check XAMPP Control Panel - MySQL might need to be started" -ForegroundColor Yellow
}


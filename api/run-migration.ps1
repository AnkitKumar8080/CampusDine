# PowerShell script to run the order timestamps migration
# This script will help you run the SQL migration

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Order Timestamps Migration Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is available in PATH
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue

if (-not $mysqlPath) {
    Write-Host "MySQL is not in your PATH." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please choose one of the following options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPTION 1: Run in MySQL Workbench (Recommended)" -ForegroundColor Green
    Write-Host "1. Open MySQL Workbench" -ForegroundColor White
    Write-Host "2. Connect to your database" -ForegroundColor White
    Write-Host "3. Open the file: api/add-order-timestamps.sql" -ForegroundColor White
    Write-Host "4. Select all (Ctrl+A) and execute (Ctrl+Shift+Enter)" -ForegroundColor White
    Write-Host ""
    Write-Host "OPTION 2: Run via XAMPP MySQL" -ForegroundColor Green
    Write-Host "If you have XAMPP installed, you can run:" -ForegroundColor White
    Write-Host "  C:\xampp\mysql\bin\mysql.exe -u root CampusDine < api/add-order-timestamps.sql" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "OPTION 3: Copy and paste the SQL below into MySQL Workbench:" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Get-Content api/add-order-timestamps.sql | Write-Host
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Try to find XAMPP MySQL
    $xamppPaths = @(
        "C:\xampp\mysql\bin\mysql.exe",
        "C:\Program Files\xampp\mysql\bin\mysql.exe"
    )
    
    $foundXampp = $false
    foreach ($path in $xamppPaths) {
        if (Test-Path $path) {
            Write-Host "Found XAMPP MySQL at: $path" -ForegroundColor Green
            Write-Host "Attempting to run migration..." -ForegroundColor Yellow
            Write-Host ""
            
            $sqlContent = Get-Content api/add-order-timestamps.sql -Raw
            $sqlContent | & $path -u root CampusDine
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
                $foundXampp = $true
                break
            } else {
                Write-Host "❌ Migration failed. Please check your MySQL credentials." -ForegroundColor Red
            }
        }
    }
    
    if (-not $foundXampp) {
        Write-Host "Could not find XAMPP MySQL automatically." -ForegroundColor Yellow
        Write-Host "Please use MySQL Workbench (Option 1) to run the migration." -ForegroundColor Yellow
    }
} else {
    Write-Host "MySQL found in PATH. Running migration..." -ForegroundColor Green
    Write-Host ""
    
    Get-Content api/add-order-timestamps.sql | mysql -u root CampusDine
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Migration completed successfully!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Migration failed. Please check your MySQL credentials." -ForegroundColor Red
        Write-Host "You may need to provide a password. Try running:" -ForegroundColor Yellow
        Write-Host "  Get-Content api/add-order-timestamps.sql | mysql -u root -p CampusDine" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


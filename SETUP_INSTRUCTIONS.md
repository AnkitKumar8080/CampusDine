# MySQL Workbench Setup Instructions

## Quick Setup Guide

### Step 1: Open MySQL Workbench
1. Launch MySQL Workbench
2. Connect to your MySQL server (usually `localhost` or `127.0.0.1` on port `3306`)
3. Enter your MySQL root password when prompted

### Step 2: Run the Setup Script
1. In MySQL Workbench, click on **File** → **Open SQL Script**
2. Navigate to: `api/setup-database.sql`
3. Open the file
4. Click the **Execute** button (⚡ lightning bolt icon) or press `Ctrl+Shift+Enter`
5. Wait for the script to complete

### Step 3: Verify Setup
After running the script, you should see:
- ✅ "Database setup completed successfully!"
- ✅ "Number of Categories: 8"

You can also verify by:
1. In the left sidebar, expand **Schemas**
2. You should see `CampusDine` database
3. Expand `CampusDine` → **Tables**
4. You should see 6 tables:
   - Categories
   - OrderItems
   - OrderStatus
   - Orders
   - Products
   - Users

### Step 4: Update Database Credentials
Make sure your `api/.env` file has the correct MySQL credentials:

```env
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
MYSQL_DB_USER=root
MYSQL_DB_PASSWORD=your_mysql_password
MYSQL_DB_DATABASE=CampusDine
```

### Step 5: Create Admin User
After the database is set up, create an admin user:

```bash
cd api
node create-admin.js
```

This will create:
- Email: `admin@example.com`
- Password: `admin123`

### Step 6: Start the API Server
```bash
cd api
npm start
```

You should see:
```
🛢  Database connected successfully...
⚙️  Server is running on port: 5000
```

## Troubleshooting

### If you get "Access Denied" error:
- Make sure your MySQL root password is correct
- Update `MYSQL_DB_PASSWORD` in `api/.env`

### If you get "Database already exists" error:
- That's okay! The script uses `CREATE DATABASE IF NOT EXISTS`
- Just continue with the rest of the script

### If tables already exist:
- The script uses `CREATE TABLE IF NOT EXISTS` so it's safe to run again
- It will skip existing tables

### Manual Setup (Alternative)
If you prefer to run commands manually:

1. **Create Database:**
   ```sql
   CREATE DATABASE CampusDine;
   USE CampusDine;
   ```

2. **Run the SQL script:**
   - Copy all SQL from `api/setup-database.sql`
   - Paste into MySQL Workbench query window
   - Execute


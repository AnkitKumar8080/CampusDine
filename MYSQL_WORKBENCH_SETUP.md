# How to Create CampusDine Database in MySQL Workbench

## Step-by-Step Instructions

### Step 1: Open MySQL Workbench
1. Launch **MySQL Workbench**
2. Click on your MySQL connection (usually `localhost` or `127.0.0.1`)
3. Enter your MySQL root password when prompted
4. Click **OK** to connect

### Step 2: Open a New Query Tab
1. Click on **File** → **New Query Tab** (or press `Ctrl+T`)
2. You'll see a blank query window

### Step 3: Run the Database Creation Script

**Option A: Using the SQL File (Easiest)**
1. Click **File** → **Open SQL Script**
2. Navigate to: `api/create-database-simple.sql`
3. Click **Open**
4. The SQL script will appear in the query window
5. Click the **Execute** button (⚡ lightning bolt icon) or press `Ctrl+Shift+Enter`
6. Wait for the script to complete

**Option B: Copy and Paste**
1. Open the file `api/create-database-simple.sql` in a text editor
2. Copy all the SQL code
3. Paste it into the MySQL Workbench query window
4. Click **Execute** (⚡) or press `Ctrl+Shift+Enter`

### Step 4: Verify the Database was Created
1. In the left sidebar, click the **refresh** icon (🔄) next to "SCHEMAS"
2. You should now see **CampusDine** in the list of databases
3. Expand **CampusDine** → **Tables**
4. You should see 6 tables:
   - ✅ Categories
   - ✅ OrderItems
   - ✅ OrderStatus
   - ✅ Orders
   - ✅ Products
   - ✅ Users

### Step 5: Check the Output
After running the script, you should see in the output panel:
- ✅ "Database CampusDine created successfully!"
- ✅ "All tables created!"
- A list showing all 6 tables

## Troubleshooting

### If you get "Access Denied" error:
- Make sure you're using the correct MySQL root password
- Try connecting with a different MySQL user that has CREATE DATABASE privileges

### If you get "Database already exists" error:
- That's okay! The script uses `CREATE DATABASE IF NOT EXISTS`
- Just continue - it will use the existing database

### If tables already exist:
- The script uses `CREATE TABLE IF NOT EXISTS`
- It's safe to run again - it won't duplicate tables

### If you see foreign key errors:
- Make sure you're running the entire script from top to bottom
- Tables must be created in the correct order (Users and Categories first)

## Quick Manual Method (Alternative)

If you prefer to type commands manually:

1. In MySQL Workbench query window, type:
   ```sql
   CREATE DATABASE CampusDine;
   USE CampusDine;
   ```

2. Then copy and paste the CREATE TABLE statements from `api/create-database-simple.sql`

3. Execute each section or the whole script

## Next Steps

After the database is created:

1. **Update your `.env` file** (if needed):
   - Make sure `api/.env` has the correct MySQL password
   - Database name should be: `CampusDine`

2. **Start the API server**:
   ```bash
   cd api
   npm start
   ```

3. **Create admin user**:
   ```bash
   cd api
   node create-admin.js
   ```

4. **Test login** at http://localhost:5174


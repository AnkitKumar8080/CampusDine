# How to Start All Servers

## ⚠️ IMPORTANT: Start in this order!

### Step 1: Make sure MySQL is running
- Open MySQL Workbench
- Connect to your MySQL server
- OR start MySQL service: `net start MySQL` (in admin PowerShell)

### Step 2: Verify Database is Set Up
- Database `CampusDine` should exist
- All tables should be created (run `api/setup-database.sql` if not done)

### Step 3: Start API Server (Terminal 1)
```bash
cd api
npm start
```

**Expected output:**
```
🛢  Database connected successfully...
⚙️  Server is running on port: 5000
```

**If you see database errors:**
- Check MySQL is running
- Verify `api/.env` has correct MySQL password
- Make sure `CampusDine` database exists

### Step 4: Start Client Server (Terminal 2)
```bash
cd client
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

### Step 5: Start Admin Server (Terminal 3)
```bash
cd admin
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5174/
```

### Step 6: Create Admin User (if not done)
In a new terminal:
```bash
cd api
node create-admin.js
```

### Step 7: Test Login
- Go to http://localhost:5174
- Email: `admin@example.com`
- Password: `admin123`

## Troubleshooting

### API Server won't start
- **Error: ECONNREFUSED** → MySQL is not running
- **Error: Access denied** → Wrong MySQL password in `api/.env`
- **Error: Unknown database** → Run `api/setup-database.sql` in MySQL Workbench

### Can't connect to API
- Make sure API server is running on port 5000
- Check browser console for errors
- Verify `admin/.env` has: `VITE_API_BASE_URI=http://localhost:5000/api/v1`

### Login not working
- API server must be running
- Admin user must exist (run `node api/create-admin.js`)
- Check browser console for specific error messages


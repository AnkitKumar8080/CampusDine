import bcrypt from 'bcrypt';
import connectDB from './config/db/index.js';
import { generateUUID } from './utils/uuid.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

const createAdmin = async () => {
  const db = await connectDB();
  try {
    // Change these values to your desired admin credentials
    const email = 'admin@example.com';
    const username = 'admin';
    const password = 'admin123';
    
    // Check if admin already exists
    const [existing] = await db.execute(
      'SELECT * FROM Users WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      console.log('❌ Admin user with this email already exists!');
      console.log(`Email: ${email}`);
      console.log('You can either:');
      console.log('1. Use a different email');
      console.log('2. Update the existing user to admin role using SQL:');
      console.log(`   UPDATE Users SET role = 'admin' WHERE email = '${email}';`);
      process.exit(1);
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateUUID();
    const timestamp = Date.now().toString();
    
    const [result] = await db.execute(
      `INSERT INTO Users (userId, username, email, password, role, avatar, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, username, email, hashedPassword, 'admin', 'noProfile.png', timestamp, timestamp]
    );
    
    if (result.affectedRows > 0) {
      console.log('\n✅ Admin user created successfully!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:    ' + email);
      console.log('👤 Username: ' + username);
      console.log('🔑 Password: ' + password);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n⚠️  IMPORTANT: Change these credentials after first login!\n');
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('\n💡 Tip: Admin with this email already exists. Update the role using SQL.');
    }
  } finally {
    if (db) db.release();
  }
  process.exit(0);
};

createAdmin();


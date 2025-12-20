import connectDB from './config/db/index.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

const checkAdmin = async () => {
  const db = await connectDB();
  try {
    const [users] = await db.execute(
      "SELECT userId, username, email, role FROM Users WHERE email = ? OR role = 'admin'",
      ['admin@example.com']
    );
    
    console.log('\n📋 Admin Users in Database:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (users.length === 0) {
      console.log('❌ No admin user found!');
      console.log('\n💡 Run: node create-admin.js to create an admin user\n');
    } else {
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. Admin User:`);
        console.log(`   Email:    ${user.email}`);
        console.log(`   Username: ${user.username}`);
        console.log(`   Role:     ${user.role}`);
        console.log(`   User ID:  ${user.userId}`);
      });
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
  } catch (error) {
    console.error('❌ Error checking admin:', error.message);
  } finally {
    if (db) db.release();
  }
  process.exit(0);
};

checkAdmin();


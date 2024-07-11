import mysql from "mysql2/promise"; // Import the promise-based version
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDB = async () => {
  try {
    // creating a connection with the pool
    const db = await pool.getConnection();
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error;
  }
};

export default connectDB;

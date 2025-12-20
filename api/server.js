import { httpServer } from "./app.js";
import connectDB from "./config/db/index.js";
import dotenv from "dotenv";
import { runCronJobForOrderExpiration } from "./cron/removeExpiredOrder.js";

dotenv.config({
  path: "./.env",
});

const startServer = () => {
  httpServer.listen(process.env.PORT, () => {
    console.log("⚙️  Server is running on port: " + process.env.PORT);
  });
};

// connect to the database then starting the server
connectDB()
  .then((db) => {
    console.log("\n🛢  Database connected successfully... \n");
    db.release();
  })
  .then(() => {
    startServer();
    runCronJobForOrderExpiration();
  })
  .catch((err) => {
    console.error("\n❌ Error connecting to database:");
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("\n💡 Please check:");
    console.error("1. MySQL service is running");
    console.error("2. Database credentials in .env file are correct");
    console.error("3. Database 'CampusDine' exists");
    console.error("4. MySQL port is correct (default: 3306)");
    console.error("\nCurrent .env settings:");
    console.error("Host:", process.env.MYSQL_DB_HOST || "not set");
    console.error("Port:", process.env.MYSQL_DB_PORT || "not set");
    console.error("User:", process.env.MYSQL_DB_USER || "not set");
    console.error("Database:", process.env.MYSQL_DB_DATABASE || "not set");
    process.exit(1);
  });

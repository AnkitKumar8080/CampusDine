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
  .catch((err) => console.log("Error connecting to database: " + err.message));

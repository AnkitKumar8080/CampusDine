import cron from "node-cron";
import OrderModel from "../models/order.model.js";

// Schedule a cron job to run every 12 hours
export const runCronJobForOrderExpiration = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const expRes = await OrderModel.expireOrders();
      if (expRes) {
        console.log("order expiration cron job completed successfully...");
      }
    } catch (error) {
      console.log("failed to run cron job for order expiration ");
    }
  });
};

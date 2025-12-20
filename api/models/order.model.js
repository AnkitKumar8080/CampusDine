import connectDB from "../config/db/index.js";
import {
  calculateSubtotal,
  getOrderExpiryDate,
  getYesterdaysDate,
} from "../utils/helper.js";
import { generateUUID } from "../utils/uuid.js";

class OrderModel {
  static getOrderById = async (orderId) => {
    const db = await connectDB();
    try {
      const order = await db.query("SELECT * FROM Orders WHERE orderId = ?", [
        orderId,
      ]);

      return order[0][0];
    } catch (error) {
      console.log("error while creating order: " + error);
    }
  };

  // update order Status
  static updateOrderStatus = async (orderId, status) => {
    const db = await connectDB();
    try {
      // First, verify the order exists
      const [orderCheck] = await db.execute(
        "SELECT orderId FROM Orders WHERE orderId = ?",
        [orderId]
      );

      if (orderCheck.length === 0) {
        console.log(`Order with ID ${orderId} not found`);
        return { success: false, error: "Order not found" };
      }

      const currentTime = Date.now().toString();
      const normalizedStatus = status.toLowerCase();

      // Build update query with timestamp tracking
      let updateQuery = "UPDATE OrderStatus SET status = ?, updatedAt = ?";
      let updateParams = [normalizedStatus, currentTime];

      // Record timestamp based on status
      if (normalizedStatus === 'placed') {
        updateQuery += ", placedAt = ?";
        updateParams.push(currentTime);
      } else if (normalizedStatus === 'ready') {
        updateQuery += ", readyAt = ?";
        updateParams.push(currentTime);
      } else if (normalizedStatus === 'delivered') {
        updateQuery += ", deliveredAt = ?";
        updateParams.push(currentTime);
      }

      updateQuery += " WHERE orderId = ?";
      updateParams.push(orderId);

      // Update using orderId (which is what the admin passes)
      const [updatedOrderStatus] = await db.execute(updateQuery, updateParams);

      if (updatedOrderStatus.affectedRows > 0) {
        return { success: true };
      }

      // If no rows were affected, the order status record might not exist
      console.log(`No order status record found for orderId: ${orderId}`);
      return { success: false, error: "Order status record not found" };
    } catch (error) {
      console.error("Error while updating order status:", error);
      return { success: false, error: error.message || "Database error occurred" };
    } finally {
      if (db) db.release();
    }
  };

  // get user's order status

  // method to create an order
  static createOrder = async (userId, cart = {}) => {
    // How the cart object looks like
    // cart = {
    //   pickUpTime: "2304980234",
    //   cartItems: [
    //     {
    //       productId: "",
    //       quantity: ""
    //     }, ...
    //   ]
    // }

    const db = await connectDB();
    try {
      const orderId = generateUUID();
      const pickUpTime = cart.pickUpTime;
      const cartItems = cart.cartItems || [];
      // start transaction
      await db.beginTransaction();

      // set expiration date for the order
      // const expiryDate = new Date();
      // expiryDate.setDate(expiryDate.getDate() + 1);

      // const expDate = Date.parse(expiryDate);

      // create a new order entry in the table
      await db.execute(
        "INSERT INTO Orders (orderId, userId, pickUpTime, expiryDate, total, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?,?, ?)",
        [
          orderId,
          userId,
          pickUpTime,
          getOrderExpiryDate().toString(),
          0,
          Date.now().toString(),
          Date.now().toString(),
        ]
      );

      // create order status and initialize to processing
      const orderStatusId = generateUUID(); // unique for each order status

      await db.execute(
        "INSERT INTO OrderStatus (orderStatusId, orderId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
        [
          orderStatusId,
          orderId,
          "processing",
          Date.now().toString(),
          Date.now().toString(),
        ]
      );

      // iterate through each products in the cart
      for (const product of cartItems) {
        const orderItemsId = generateUUID(); // unique for each order item

        const { productId, quantity } = product;

        // calculate the subtotal for each order item
        const subtotal = await calculateSubtotal(productId, quantity);

        // insert the product items
        await db.execute(
          "INSERT INTO OrderItems (orderItemsId, orderId, productId, quantity, subtotal, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            orderItemsId,
            orderId,
            productId,
            quantity,
            subtotal,
            Date.now().toString(),
            Date.now().toString(),
          ]
        );
      }

      // update the overall cost of items in the orders talbe
      await db.execute(
        "UPDATE Orders SET total = (SELECT SUM(subtotal) FROM OrderItems where orderId = ?), updatedAt = ?  WHERE orderId = ?",
        [orderId, Date.now().toString(), orderId]
      );

      // integrate the payment for future update
      // after successful payment update the order status to placed

      // update order status to placed and record timestamp
      const placedTime = Date.now().toString();
      await db.execute(
        "UPDATE OrderStatus SET status=?, updatedAt=?, placedAt=? WHERE orderStatusId = ?",
        ["placed", placedTime, placedTime, orderStatusId]
      );

      db.commit(); // commit the db transaction

      return orderId;
    } catch (error) {
      db.rollback(); // rollback the db transaction
      console.log("error while placing order : ", error);
    } finally {
      if (db) db.release(); // release the db after successful transaction
    }
  };

  // update order status to expired for order placed yesterday
  static expireOrders = async () => {
    console.log("Call triggered for expiring orders !");
    const db = await connectDB();
    try {
      const [expRes] = await db.execute(
        "UPDATE OrderStatus JOIN Orders ON OrderStatus.orderId = Orders.orderId SET OrderStatus.status = ? , OrderStatus.updatedAt = ? WHERE Orders.expiryDate + 0 <= ? AND OrderStatus.status IN ('processing', 'placed', 'ready')",
        ["expired", Date.now().toString(), getYesterdaysDate()]
      );

      if (expRes.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      console.log("error while expiring orders : ", error);
    } finally {
      if (db) db.release(); // release the db after successful transaction
    }
  };

  // get user order information
  static getAllUserOrders = async (userId) => {
    const db = await connectDB();
    try {
      const userOrders = await db.execute(
        "SELECT * FROM Orders JOIN OrderStatus ON Orders.orderId = OrderStatus.orderId JOIN OrderItems ON Orders.orderId = OrderItems.orderId JOIN Products ON OrderItems.productId = Products.productId WHERE Orders.userId = ? ORDER BY orderNumber DESC",
        [userId]
      );

      return userOrders[0];
    } catch (error) {
      console.log("error while getting user orders : ", error);
    } finally {
      db.release();
    }
  };

  // get all orders (for admin)
  static getAllOrders = async () => {
    const db = await connectDB();
    try {
      const allOrders = await db.execute(
        "SELECT * FROM Orders JOIN OrderStatus ON Orders.orderId = OrderStatus.orderId JOIN OrderItems ON Orders.orderId = OrderItems.orderId JOIN Products ON OrderItems.productId = Products.productId ORDER BY orderNumber DESC"
      );

      return allOrders[0];
    } catch (error) {
      console.log("error while getting all orders : ", error);
    } finally {
      db.release();
    }
  };
}

export default OrderModel;

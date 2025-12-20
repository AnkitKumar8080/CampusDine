import OrderModel from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { transformUserOrderData } from "../utils/helper.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const cart = req.body;
  const userId = req.user.userId;

  const orderId = await OrderModel.createOrder(userId, cart); // fucntion returns the orderId

  if (!orderId) {
    throw new ApiError(500, "Error creating order");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { orderId }, "Order created successfully"));
});

// update order status route (only for admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatusId, orderId, status } = req.query;

  // Accept either orderStatusId or orderId (prefer orderId for consistency)
  const idToUse = orderId || orderStatusId;

  if (!idToUse || !status) {
    throw new ApiError(400, "orderId (or orderStatusId) and status must be provided");
  }

  // Validate status value
  const validStatuses = ["placed", "ready", "delivered", "cancelled", "processing", "expired"];
  const normalizedStatus = status.toLowerCase().trim();
  
  if (!validStatuses.includes(normalizedStatus)) {
    throw new ApiError(400, `Invalid status. Valid statuses are: ${validStatuses.join(", ")}`);
  }

  const orderStatRes = await OrderModel.updateOrderStatus(
    idToUse,
    normalizedStatus
  );

  if (!orderStatRes || !orderStatRes.success) {
    const errorMessage = orderStatRes?.error || "Error updating order status";
    throw new ApiError(500, errorMessage);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order status updated successfully"));
});

// get all user orders
export const getAllUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const userOrders = await OrderModel.getAllUserOrders(userId);

  if (!userOrders) {
    throw new ApiError(500, "Error while getting user orders ");
  }

  const filteredOrders = await transformUserOrderData(userOrders);

  // console.log("filtered orders ", filteredOrders);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userOrders: filteredOrders },
        "order fetched successfully"
      )
    );
});

// get all orders (for admin)
export const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await OrderModel.getAllOrders();

  if (!allOrders) {
    throw new ApiError(500, "Error while getting all orders");
  }

  const filteredOrders = await transformUserOrderData(allOrders);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userOrders: filteredOrders },
        "All orders fetched successfully"
      )
    );
});
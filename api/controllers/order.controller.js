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
  const { orderStatusId, status } = req.query;

  if (!orderStatusId && !status) {
    throw new ApiError(400, "orderStatusId and status must be provided");
  }

  const orderStatRes = await OrderModel.updateOrderStatus(
    orderStatusId,
    status
  );

  if (!orderStatRes) {
    throw new ApiError(500, "error updating order status");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Order updated successfully"));
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

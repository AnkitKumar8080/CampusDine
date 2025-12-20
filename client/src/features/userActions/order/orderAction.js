import axios from "axios";
import { filterCartItemsForOrder } from "../../../utils/helper";
import {
  createOrderFailure,
  createOrderSuccess,
  getOrderHistoryFailure,
  getOrderHistorySuccess,
  orderRequest,
} from "./orderSlice";
import { clearCart } from "../cart/cartSlice";

const createOrder = (token, cartItems) => async (dispatch) => {
  try {
    // Get token from parameter or localStorage
    const authToken = token || localStorage.getItem("token");
    
    if (!authToken) {
      dispatch(createOrderFailure({ message: "Please login to place an order" }));
      return;
    }

    dispatch(orderRequest()); // order request

    const filteredCartItems = filterCartItemsForOrder(cartItems); // filter cart items for creating order

    const data = {
      pickUpTime: Date.now().toString(),
      cartItems: filteredCartItems,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/users/order`,
      data,
      config
    );

    dispatch(createOrderSuccess(res.data));
    dispatch(clearCart());
  } catch (error) {
    console.error("Error creating order:", error);
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(createOrderFailure({ message: "Session expired. Please login again to place an order." }));
    } else {
      const errorMessage = error.response?.data || { message: "Failed to place order. Please try again." };
      dispatch(createOrderFailure(errorMessage));
    }
  }
};

const getOrderHistory = (token) => async (dispatch) => {
  try {
    // Get token from parameter or localStorage
    const authToken = token || localStorage.getItem("token");
    
    if (!authToken) {
      dispatch(getOrderHistoryFailure({ message: "Please login to view your orders" }));
      return;
    }

    dispatch(orderRequest());
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/users/order`,
      config
    );

    dispatch(getOrderHistorySuccess(res.data));
  } catch (error) {
    console.error("Error fetching order history:", error);
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(getOrderHistoryFailure({ message: "Session expired. Please login again." }));
    } else if (error.response) {
      dispatch(getOrderHistoryFailure(error.response.data || { message: "Failed to fetch orders" }));
    } else if (error.request) {
      dispatch(getOrderHistoryFailure({ message: "Cannot connect to server. Please make sure the API server is running." }));
    } else {
      dispatch(getOrderHistoryFailure({ message: error.message || "An unexpected error occurred" }));
    }
  }
};
export { createOrder, getOrderHistory };

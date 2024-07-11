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
    dispatch(orderRequest()); // order request

    const filteredCartItems = filterCartItemsForOrder(cartItems); // filter cart items for creating order

    const data = {
      pickUpTime: Date.now().toString(),
      cartItems: filteredCartItems,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include any authorization token if needed
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
    console.log(error);
    dispatch(createOrderFailure(error.response.data));
  }
};

const getOrderHistory = (token) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include any authorization token if needed
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/users/order`,
      config
    );

    dispatch(getOrderHistorySuccess(res.data));
  } catch (error) {
    dispatch(getOrderHistoryFailure(error.response.data));
  }
};
export { createOrder, getOrderHistory };

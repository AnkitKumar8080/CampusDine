import axios from "axios";
import {
  errorUpdateStatus,
  orderListFailure,
  orderListSuccess,
  orderRequest,
  updateStatus,
} from "./orderSlice";

const getOrderList = (token) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/admin/get-all-orders`,
      config
    );

    dispatch(orderListSuccess(res.data));
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (error.response) {
      dispatch(orderListFailure(error.response.data));
    } else if (error.request) {
      dispatch(orderListFailure({ message: "Cannot connect to server. Please make sure the API server is running on port 5000." }));
    } else {
      dispatch(orderListFailure({ message: error.message || "An unexpected error occurred" }));
    }
  }
};

const updateOrderStatus = (token, orderId, orderStatus) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Updating order status:", { orderId, orderStatus });

    const res = await axios.patch(
      `${
        import.meta.env.VITE_API_BASE_URI
      }/admin/update-order-status?orderId=${orderId}&status=${orderStatus}`,
      {},
      config
    );
    
    dispatch(updateStatus(res.data));
    // Refresh the order list after successful update
    dispatch(getOrderList(token));
    
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    let errorMessage = "Failed to update order status";
    
    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.message || error.response.data || errorMessage;
      dispatch(errorUpdateStatus(error.response.data || { message: errorMessage }));
    } else if (error.request) {
      // Request made but no response
      errorMessage = "Cannot connect to server. Please make sure the API server is running on port 5000.";
      dispatch(errorUpdateStatus({ message: errorMessage }));
    } else {
      // Error setting up request
      errorMessage = error.message || errorMessage;
      dispatch(errorUpdateStatus({ message: errorMessage }));
    }
    
    return { success: false, error: { message: errorMessage } };
  }
};
export { getOrderList, updateOrderStatus };

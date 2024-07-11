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
        Authorization: `Bearer ${token}`, // Include any authorization token if needed
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/users/order`,
      config
    );

    dispatch(orderListSuccess(res.data));
  } catch (error) {
    dispatch(orderListFailure(error.response.data));
  }
};

const updateOrderStatus = (token, orderId, orderStatus) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "Application/json",
      },
      // withCredentials: true,
    };

    // console.log({ orderId, token, orderStatus });
    console.log(config);

    const res = await axios.patch(
      `${
        import.meta.env.VITE_API_BASE_URI
      }/admin/update-order-status?orderStatusId=${orderId}&status=${orderStatus}`,

      config
    );
    dispatch(updateStatus(res.data));
    dispatch(getOrderList(token));
  } catch (error) {
    console.log(error);
    dispatch(errorUpdateStatus(error.response.data));
  }
};
export { getOrderList, updateOrderStatus };

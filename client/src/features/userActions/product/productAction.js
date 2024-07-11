import axios from "axios";
import {
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
} from "./productSlice";

const getProducts = (token, categoryId) => async (dispatch) => {
  try {
    dispatch(getProductsRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include any authorization token if needed
        "Content-Type": "application/json",
      },
    };

    const api_URI = !categoryId
      ? `${import.meta.env.VITE_API_BASE_URI}/users/get-products`
      : `${
          import.meta.env.VITE_API_BASE_URI
        }/users/get-products?categoryId=${categoryId}`;

    const res = await axios.get(api_URI, config);

    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure(error.response.data));
    console.log(error);
  }
};

const getSearchedProducts = (token, productName) => async (dispatch) => {
  try {
    dispatch(getProductsRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URI
      }/users/get-products?productName=${productName}`,
      config
    );

    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure(error.response.data));
  }
};

export { getProducts, getSearchedProducts };

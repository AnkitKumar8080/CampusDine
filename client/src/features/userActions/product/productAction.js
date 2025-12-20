import axios from "axios";
import {
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
} from "./productSlice";

const getProducts = (token, categoryId) => async (dispatch) => {
  try {
    dispatch(getProductsRequest());

    // Get token from parameter or localStorage (optional - products can be viewed without login)
    const authToken = token || localStorage.getItem("token");
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    // Only add Authorization header if token exists
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    const api_URI = !categoryId
      ? `${import.meta.env.VITE_API_BASE_URI}/users/get-products`
      : `${
          import.meta.env.VITE_API_BASE_URI
        }/users/get-products?categoryId=${categoryId}`;

    const res = await axios.get(api_URI, config);

    // Ensure we have the correct data structure
    if (res.data && res.data.data && res.data.data.products) {
      dispatch(getProductsSuccess(res.data));
    } else {
      console.error("Unexpected API response structure:", res.data);
      dispatch(getProductsFailure({ message: "Invalid response format from server" }));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(getProductsFailure({ message: "Session expired. Please login again." }));
    } else {
      const errorMessage = error.response?.data || { message: "Failed to fetch products. Please try again." };
      dispatch(getProductsFailure(errorMessage));
    }
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

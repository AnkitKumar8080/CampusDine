import {
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
} from "./categorySlice";
import axios from "axios";

const getCategory = (token) => async (dispatch) => {
  try {
    dispatch(getCategoryRequest());

    // Get token from parameter or localStorage (optional - categories can be viewed without login)
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

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/users/get-categories`,
      config
    );

    dispatch(getCategorySuccess(res.data));
  } catch (error) {
    console.error("Error fetching categories:", error);
    const errorMessage = error.response?.data || { message: "Failed to fetch categories. Please try again." };
    dispatch(getCategoryFailure(errorMessage));
  }
};

export { getCategory };

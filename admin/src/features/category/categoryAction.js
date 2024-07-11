import {
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
  uploadCategoryError,
  uploadCategorySuccess,
} from "./categorySlice";
import axios from "axios";

const getCategory = (token) => async (dispatch) => {
  try {
    dispatch(getCategoryRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include any authorization token if needed
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URI}/users/get-categories`,
      config
    );

    dispatch(getCategorySuccess(res.data));
  } catch (error) {
    dispatch(getCategoryFailure(error.response.data));
  }
};

const uploadCategory = (token, data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/admin/create-category`,
      data,
      config
    );

    console.log(res);

    dispatch(uploadCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(uploadCategoryError(error.response.data));
  }
};

export { getCategory, uploadCategory };

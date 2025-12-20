import {
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
  uploadCategoryError,
  uploadCategorySuccess,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
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
    // Handle case where server is not responding (error.response is undefined)
    if (error.response) {
      dispatch(getCategoryFailure(error.response.data));
    } else if (error.request) {
      dispatch(getCategoryFailure({
        message: "Cannot connect to server. Please make sure the API server is running."
      }));
    } else {
      dispatch(getCategoryFailure({
        message: error.message || "An unexpected error occurred"
      }));
    }
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

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URI}/admin/create-category`,
      data,
      config
    );

    dispatch(uploadCategorySuccess(res.data));
  } catch (error) {
    console.log(error);
    // Handle case where server is not responding (error.response is undefined)
    if (error.response) {
      dispatch(uploadCategoryError(error.response.data));
    } else if (error.request) {
      // Network error or server not responding
      dispatch(uploadCategoryError({
        message: "Cannot connect to server. Please make sure the API server is running on port 5000."
      }));
    } else {
      // Something else happened
      dispatch(uploadCategoryError({
        message: error.message || "An unexpected error occurred"
      }));
    }
  }
};

const deleteCategory = (token, categoryId) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequest());
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    
    const res = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URI}/admin/delete-category/${categoryId}`,
      config
    );
    
    // Check if the response indicates success
    if (res.data && (res.data.success || res.status === 200 || res.status === 201)) {
      // Pass categoryId separately so we can filter it from the list
      dispatch(deleteCategorySuccess({ 
        ...res.data, 
        categoryId: categoryId 
      }));
      
      return { success: true, categoryId };
    } else {
      throw new Error("Delete operation did not succeed");
    }
  } catch (error) {
    console.log("Delete category error:", error);
    // Handle case where server is not responding (error.response is undefined)
    let errorMessage = "Failed to delete category";
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data || "Failed to delete category";
      dispatch(deleteCategoryFailure(error.response.data));
    } else if (error.request) {
      errorMessage = "Cannot connect to server. Please make sure the API server is running on port 5000.";
      dispatch(deleteCategoryFailure({
        message: errorMessage
      }));
    } else {
      errorMessage = error.message || "An unexpected error occurred";
      dispatch(deleteCategoryFailure({
        message: errorMessage
      }));
    }
    return { success: false, error: errorMessage };
  }
};

export { getCategory, uploadCategory, deleteCategory };

import axios from "axios";
import {
  deleteProductError,
  deleteProductRequest,
  deleteProductSuccess,
  getProductsFailure,
  getProductsRequest,
  getProductsSuccess,
  uploadProductError,
  uploadProductRequest,
  uploadProductSuccess,
} from "./productSlice";

export const getProducts = (token) => async (dispatch) => {
  try {
    dispatch(getProductsRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include any authorization token if needed
        "Content-Type": "application/json",
      },
    };

    const api_URI = `${import.meta.env.VITE_API_BASE_URI}/users/get-products`;

    const res = await axios.get(api_URI, config);

    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure(error.response.data));
    console.log(error);
  }
};

export const deleteProduct = (token, productId) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const api_URI = `${
      import.meta.env.VITE_API_BASE_URI
    }/admin/delete-product/${productId}`;

    const res = await axios.delete(api_URI, config);
    dispatch(deleteProductSuccess());
    dispatch(getProducts(token));
  } catch (error) {
    dispatch(deleteProductError("error while deleting product"));
  }
};

export const addProduct = (file, productData, token) => async (dispatch) => {
  try {
    dispatch(uploadProductRequest());

    const config1 = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (file) {
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/users/upload-images`,
        data,
        config1
      );

      if (res) {
        const productRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URI}/admin/create-product`,
          productData,
          config2
        );

        if (productRes.data) {
          dispatch(uploadProductSuccess(productRes.data));
          // Refresh products list
          dispatch(getProducts(token));
          return { success: true };
        }
      }
    } else {
      // If no file, just create the product
      const productRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URI}/admin/create-product`,
        productData,
        config2
      );

      if (productRes.data) {
        dispatch(uploadProductSuccess(productRes.data));
        // Refresh products list
        dispatch(getProducts(token));
        return { success: true };
      }
    }
  } catch (error) {
    console.log("Error adding product:", error);
    const errorMessage = error.response?.data?.message || error.response?.data || "Failed to add product";
    dispatch(uploadProductError(errorMessage));
    return { success: false, error: errorMessage };
  }
};

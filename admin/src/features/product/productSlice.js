import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: null,
  success: false,
  error: null,
  product: {},
  products: [], // for getting all products
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsRequest: (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
      state.products = null;
    },

    deleteProductRequest: (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
    },

    deleteProductSuccess: (state, action) => {
      state.isLoading = false;
      state.message = "deleted product";
    },

    deleteProductError: (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || "some error occured while deleting product";
    },

    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message || "";
      state.products = action.payload.data.products || [];
    },

    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "some error occured";
    },

    uploadProductRequest: (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
      state.product = {};
      state.success = false;
    },

    uploadProductSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message || "";
      state.success = true;
    },

    uploadProductError: (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload.message || "some error occured while uploading product";
    },
  },
});

export const {
  uploadProductError,
  uploadProductRequest,
  uploadProductSuccess,
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductError,
} = productSlice.actions;

export default productSlice.reducer;

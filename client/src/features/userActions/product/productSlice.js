import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: null,
  error: null,
  products: [],
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

    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message || "";
      // Handle different response structures
      if (action.payload?.data?.products) {
        state.products = action.payload.data.products;
      } else if (Array.isArray(action.payload?.data)) {
        state.products = action.payload.data;
      } else if (Array.isArray(action.payload?.products)) {
        state.products = action.payload.products;
      } else {
        state.products = [];
      }
      state.error = null;
    },

    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || action.payload || "some error occured";
      state.products = [];
    },
  },
});

export const { getProductsRequest, getProductsSuccess, getProductsFailure } =
  productSlice.actions;

export default productSlice.reducer;

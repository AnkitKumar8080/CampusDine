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
      state.message = action.payload.message || "";
      state.products = action.payload.data.products || [];
    },

    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "some error occured";
    },
  },
});

export const { getProductsRequest, getProductsSuccess, getProductsFailure } =
  productSlice.actions;

export default productSlice.reducer;

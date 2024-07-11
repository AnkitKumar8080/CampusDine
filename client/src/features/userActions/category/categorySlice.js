import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  categories: [],
  message: null,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.message = null;
      state.categories = null;
    },

    getCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message || "";
      state.categories = action.payload.data.categories || [];
    },

    getCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message || "some error occured";
    },
  },
});

export const { getCategoryRequest, getCategorySuccess, getCategoryFailure } =
  categorySlice.actions;

export default categorySlice.reducer;

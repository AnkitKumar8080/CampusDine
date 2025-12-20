import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  categories: [],
  uploadCategory: {},
  message: null,
  error: null,
  uploadCategorySuccess: false,
  uploadCategoryError: null,
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

    uploadCategorySuccess: (state, action) => {
      state.uploadCategory = action.payload?.data || action.payload || {};
      state.uploadCategorySuccess = true;
      state.uploadCategoryError = null;
    },

    uploadCategoryError: (state, action) => {
      state.uploadCategoryError =
        action.payload?.message || action.payload ||
        "something went wrong failed uploading category";
      state.uploadCategorySuccess = false;
    },
    
    resetCategoryUpload: (state) => {
      state.uploadCategorySuccess = false;
      state.uploadCategoryError = null;
    },
    
    deleteCategoryRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    deleteCategorySuccess: (state, action) => {
      state.isLoading = false;
      const categoryId = action.payload?.categoryId;
      state.message = action.payload?.message || "Category deleted successfully";
      state.error = null;
      // Remove deleted category from the list
      if (categoryId && state.categories && Array.isArray(state.categories)) {
        state.categories = state.categories.filter(
          (cat) => cat && cat.categoryId !== categoryId
        );
      }
    },
    
    deleteCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || "Failed to delete category";
    },
  },
});

export const {
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFailure,
  uploadCategorySuccess,
  uploadCategoryError,
  resetCategoryUpload,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;

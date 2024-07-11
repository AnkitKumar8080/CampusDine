import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: null,
  error: null,
  users: [],
  deleteUserSuccess: false,
  deleteUserError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequest: (state) => {
      state.isLoading = true;
      state.message = null;
      state.error = null;
      state.users = [];
    },

    getUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message || "";
      state.users = action.payload.data.users || [];
    },

    getUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload.message || "some error occured while uploading product";
    },

    deleteUserSuccess: (state) => {
      state.deleteUserSuccess = true;
    },

    deleteUserError: (state, action) => {
      state.deleteUserError =
        action.payload.message || "some error occured while deleting user";
    },
  },
});

export const {
  usersRequest,
  getUsersSuccess,
  getUsersFailure,
  deleteUserSuccess,
  deleteUserError,
} = usersSlice.actions;

export default usersSlice.reducer;

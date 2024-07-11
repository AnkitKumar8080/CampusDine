import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  message: null,
  orderList: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
      state.message = null;
      state.orderList = [];
    },

    createOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.success = action.payload.success;
    },

    orderListSuccess: (state, action) => {
      state.message = action.payload.message;
      state.orderList = action.payload.data.userOrders;
      state.success = action.payload.success;
    },

    orderListFailure: (state, action) => {
      state.error = action.payload.message;
      state.success = action.payload.success;
    },

    updateStatus: (state, action) => {
      state.message = action.payload.message;
    },

    errorUpdateStatus: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export const {
  updateStatus,
  errorUpdateStatus,
  orderRequest,
  orderListSuccess,
  orderListFailure,
} = orderSlice.actions;

export default orderSlice.reducer;

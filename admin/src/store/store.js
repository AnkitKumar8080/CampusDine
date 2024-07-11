import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import orderSlice from "../features/order/orderSlice";
import productSlice from "../features/product/productSlice";
import categorySlice from "../features/category/categorySlice";
import usersSlice from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    orders: orderSlice,
    product: productSlice,
    category: categorySlice,
    users: usersSlice,
  },
});

export default store;

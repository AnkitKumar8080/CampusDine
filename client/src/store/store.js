import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import categorySlice from "../features/userActions/category/categorySlice";
import productSlice from "../features/userActions/product/productSlice";
import cartSlice from "../features/userActions/cart/cartSlice";
import orderSlice from "../features/userActions/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;

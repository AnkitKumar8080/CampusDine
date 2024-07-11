import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemsCount: 0,
  totalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      // check for existing item if exists increment the quantity by 1
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        state.itemsCount++;
      }

      state.totalCost += action.payload.price;
    },

    removeItem: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (item) {
        state.cartItems.splice(state.cartItems.indexOf(item), 1);
        state.itemsCount--;
        state.totalCost -= action.payload.price * item.quantity;
      }
    },

    incrementItemCount: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (item) {
        item.quantity++; // increment quantity by 1 each time when action is called
        state.totalCost += action.payload.price;
      }
    },

    decrementItemCount: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );

      if (item && item.quantity > 1) {
        item.quantity--; // decrement quantity by 1
        state.totalCost -= action.payload.price;
      }
      // if item count goes less than 1 then remove item from cart
      else if (item.quantity <= 1) {
        state.cartItems.splice(state.cartItems.indexOf(item), 1);
        state.totalCost -= action.payload.price;
        state.itemsCount--;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.itemsCount = 0;
      state.totalCost = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItemCount,
  decrementItemCount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

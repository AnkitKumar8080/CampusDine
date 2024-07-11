import {
  addItem,
  decrementItemCount,
  incrementItemCount,
  removeItem,
} from "./cartSlice";

const addItemToCart = (item) => async (dispatch) => {
  dispatch(addItem(item)); // dispatch an action to add item to cart
};

const removeItemFromCart = (item) => async (dispatch) => {
  dispatch(removeItem(item)); // dispatch an action to remove item from cart
};

const incrementItem = (item) => async (dispatch) => {
  dispatch(incrementItemCount(item)); // dispatch an action to increment item count
};

const decrementItem = (item) => async (dispatch) => {
  dispatch(decrementItemCount(item)); // dispatch an action to decrement item count
};

export { incrementItem, decrementItem, addItemToCart, removeItemFromCart };

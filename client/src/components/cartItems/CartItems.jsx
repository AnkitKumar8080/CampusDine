import React, { useContext, useEffect, useState } from "react";
import "./cartItems.scss";
import {
  GoDash,
  GoPlus,
  mealsImage,
  LiaRupeeSignSolid,
  MdCancel,
  FaArrowRight,
  RxCross2,
} from "../../constants";
import { motion } from "framer-motion";
import context from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementItem,
  incrementItem,
  removeItemFromCart,
} from "../../features/userActions/cart/cartAction";
import { createOrder } from "../../features/userActions/order/orderAction";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [itemQuantity, setItemQuantity] = useState(0);

  useEffect(() => {
    getCurrentQuantity(); // gets the current item quantity
  }, [cartItems]);

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(cartItem));
  };

  const getCurrentQuantity = () => {
    const matchItem = cartItems?.find(
      (item) => item.productId === cartItem.productId
    );
    setItemQuantity(matchItem?.quantity);
  };

  const handleItemIncrement = () => {
    dispatch(incrementItem(cartItem)); // increment item
  };

  const handleItemDecrement = () => {
    dispatch(decrementItem(cartItem)); // decrement item
  };

  return (
    <div className="cart-item">
      <div className="item-info">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMAGE_URI}/assets/images/${
            cartItem.image
          }`}
          alt=""
        />
        <p>{cartItem.productName}</p>
      </div>
      <div className="cart-item-right">
        <div className="item-count">
          <motion.div
            className="icon-holder"
            whileTap={{ scale: 0.85 }}
            onClick={handleItemDecrement}
          >
            <GoDash className="icon-btn minus" />
          </motion.div>
          <span>{itemQuantity}</span>
          <motion.div
            className="icon-holder"
            whileTap={{ scale: 0.75 }}
            onClick={handleItemIncrement}
          >
            <GoPlus className="icon-btn plus" />
          </motion.div>
        </div>
        <div className="item-cost">
          <LiaRupeeSignSolid className="icon" />
          {cartItem.price}
        </div>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="item-cancel"
          onClick={handleRemoveItem}
        >
          <MdCancel />
        </motion.div>
      </div>
    </div>
  );
};

export default function CartItems() {
  const { setIsToggleCart } = useContext(context);

  // select the cart state
  const cart = useSelector((select) => select.cart);
  const { token } = useSelector((select) => select.auth);
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    if (cart.cartItems.length) {
      dispatch(createOrder(token, cart.cartItems));
    } else {
      alert("empy cart");
    }
  };

  return (
    <div className="cart-items">
      <RxCross2 className="close-cart" onClick={() => setIsToggleCart(false)} />
      <div className="cart-items-cont">
        {!cart.cartItems.length && <h1>No items in cart...</h1>}
        {cart.cartItems?.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem} />
        ))}
      </div>
      <div className="cart-bottom">
        {!!cart.cartItems.length && (
          <>
            <p>
              <span>Total:</span> <LiaRupeeSignSolid className="icon" />
              {cart.totalCost}
            </p>
            <button onClick={handlePlaceOrder}>
              Place Order
              <FaArrowRight className="icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

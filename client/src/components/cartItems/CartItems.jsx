import React, { useContext } from "react";
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

const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <img src={mealsImage} alt="" />
        <p>North Indian</p>
      </div>
      <div className="cart-item-right">
        <div className="item-count">
          <motion.div className="icon-holder" whileTap={{ scale: 0.85 }}>
            <GoDash className="icon-btn minus" />
          </motion.div>
          <span>1</span>
          <motion.div className="icon-holder" whileTap={{ scale: 0.75 }}>
            <GoPlus className="icon-btn plus" />
          </motion.div>
        </div>
        <div className="item-cost">
          <LiaRupeeSignSolid className="icon" />
          120
        </div>
        <motion.div whileTap={{ scale: 0.75 }} className="item-cancel">
          <MdCancel />
        </motion.div>
      </div>
    </div>
  );
};

export default function CartItems() {
  const { setIsToggleCart } = useContext(context);
  return (
    <div className="cart-items">
      <RxCross2 className="close-cart" onClick={() => setIsToggleCart(false)} />
      <div className="cart-items-cont">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="cart-bottom">
        <p>
          <span>Total:</span> <LiaRupeeSignSolid className="icon" />
          120
        </p>
        <button>
          Order now <FaArrowRight className="icon" />
        </button>
      </div>
    </div>
  );
}

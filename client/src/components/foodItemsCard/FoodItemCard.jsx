import React, { useEffect, useState } from "react";
import "./foodItemCard.scss";
import {
  mealsImage,
  IoMdStar,
  GoDotFill,
  LiaRupeeSignSolid,
  FaCirclePlus,
  GoDash,
  GoPlus,
} from "../../constants";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decrementItem,
  incrementItem,
} from "../../features/userActions/cart/cartAction";

export default function FoodItemCard({ item }) {
  // state for checking whether an item in added to cart or not
  const [isAddedTocart, setIsAddedTocart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(0);

  const dispatch = useDispatch();

  // cart state
  const cartItems = useSelector((state) => state.cart).cartItems;
  // console.log(cart);

  useEffect(() => {
    getCurrentQuantity(); // get current item quantity
  }, [cartItems]);

  // handle adding items to cart
  const handleAddItem = () => {
    dispatch(addItemToCart(item)); // add curent item to cart
    setIsAddedTocart(true);
  };

  // get current quantity of the item
  const getCurrentQuantity = () => {
    const matchedItem = cartItems?.find(
      (cartItem) => cartItem.productId === item.productId
    );
    setItemQuantity(matchedItem?.quantity);
  };

  const handleItemIncrement = () => {
    dispatch(incrementItem(item)); // increment item
  };

  const handleItemDecrement = () => {
    dispatch(decrementItem(item)); // decrement item
  };

  return (
    <div className="foodItemCard">
      <div className="img-div">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMAGE_URI}/assets/images/${
            item.image
          }`}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="item-description">
        <h2>{item.productName}</h2>
        <p>{item.description} </p>
        <div className="item-rating">
          <span>
            {item.rating}
            <IoMdStar className="icon star" />{" "}
          </span>
          <span>
            <GoDotFill className="icon veg" />
            veg
          </span>
        </div>
        <div className="item-cost">
          <span>
            <LiaRupeeSignSolid className="icon rupee" /> {item.price}
          </span>
          <div className="add-to-cart">
            {!itemQuantity ? (
              <FaCirclePlus className="icon" onClick={handleAddItem} />
            ) : (
              <div className="item-count">
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  onClick={handleItemDecrement}
                >
                  <GoDash className="icon-btn minus" />
                </motion.div>
                <span>{itemQuantity}</span>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={handleItemIncrement}
                >
                  <GoPlus className="icon-btn plus" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

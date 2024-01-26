import React, { useContext, useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import CategoriesCarousel from "../../components/categoriesCarousel/CategoriesCarousel";
import { motion } from "framer-motion";
import { fadeIn, menuVars, slideIn } from "../../utils/motion";
import FoodItemCard from "../../components/foodItemsCard/FoodItemCard";
import { foodItems } from "../../constants";
import CartItems from "../../components/cartItems/CartItems";
import context from "../../context/context";
import OutsideClickHandler from "react-outside-click-handler";

export default function Home() {
  const { isToggleCart, setIsToggleCart } = useContext(context);
  return (
    <div className="home">
      <OutsideClickHandler
        onOutsideClick={() => isToggleCart && setIsToggleCart(false)}
      >
        <Navbar />
        {isToggleCart && (
          <motion.div
            className="cart"
            variants={menuVars}
            initial="initial"
            animate="animate"
          >
            <CartItems />
          </motion.div>
        )}
      </OutsideClickHandler>

      <div className="home-wrapper">
        <motion.div
          variants={fadeIn("down", "spring", 0.1, 2)}
          initial="hidden"
          animate="show"
          className="category-div"
        >
          <CategoriesCarousel />
        </motion.div>

        <motion.div
          variants={slideIn("left", "spring", 0.1, 3)}
          initial="hidden"
          animate="show"
        >
          <h1 className="category-name">All Items</h1>
        </motion.div>
        <div className="food-items-wrapper">
          {foodItems.map((item) => (
            <FoodItemCard
              name={item.productName}
              desc={item.description}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

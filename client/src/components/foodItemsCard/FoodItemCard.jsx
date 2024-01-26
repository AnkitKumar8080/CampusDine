import React from "react";
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
export default function FoodItemCard({ name, desc, price, rating }) {
  return (
    <div className="foodItemCard">
      <img src={mealsImage} alt="" />
      <div className="item-description">
        <h2>{name}</h2>
        <p>{desc} </p>
        <div className="item-rating">
          <span>
            {rating}
            <IoMdStar className="icon star" />{" "}
          </span>
          <span>
            <GoDotFill className="icon veg" />
            veg
          </span>
        </div>
        <div className="item-cost">
          <span>
            <LiaRupeeSignSolid className="icon rupee" /> {price}
          </span>
          <div className="add-to-cart">
            <FaCirclePlus className="icon" />
            {/* <div className="item-count">
              <motion.div whileTap={{ scale: 0.85 }}>
                <GoDash className="icon-btn minus" />
              </motion.div>
              <span>1</span>
              <motion.div whileTap={{ scale: 0.75 }}>
                <GoPlus className="icon-btn plus" />
              </motion.div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./orders.scss";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  LiaRupeeSignSolid,
  RiHomeFill,
  mealsImage,
} from "../../constants";
import DropDown from "../../components/dropDown/DropDown";
import { motion, useAnimate } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

const OrderItemInfo = () => {
  return (
    <div className="order-item-info">
      <div className="item-img-name">
        {" "}
        <img src={mealsImage} alt="" />
        <p>north Indian</p>
      </div>
      <p>x2</p>
      <p>
        <LiaRupeeSignSolid /> 120
      </p>
    </div>
  );
};

const OrderItem = () => {
  const [dropOrderItemInfo, setDropOrderItemInfo] = useState(false);
  return (
    <div className="order-item">
      <OutsideClickHandler onOutsideClick={() => setDropOrderItemInfo(false)}>
        <div
          className="order-info"
          onClick={() => setDropOrderItemInfo(!dropOrderItemInfo)}
        >
          <p>
            <span>Order no:</span> 150
          </p>

          <p>
            <span>Status:</span> delivered
          </p>

          <p className="date">
            <span>Date:</span> 14.01.2024
          </p>
          <p>
            <span>Total:</span>
            <LiaRupeeSignSolid />
            120
          </p>
          {dropOrderItemInfo ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: dropOrderItemInfo ? "auto" : 0,
            opacity: dropOrderItemInfo ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="order-items"
        >
          <OrderItemInfo />
          <OrderItemInfo />
          <OrderItemInfo />
          <OrderItemInfo />
        </motion.div>
      </OutsideClickHandler>
    </div>
  );
};

export default function Orders() {
  const [selectedValue, setSelectedValue] = useState("All");

  // console.log(selectedValue);

  return (
    <div className="orders">
      <Navbar />
      <Link to={"/"}>
        <RiHomeFill className="home-icon" />
      </Link>
      <div className="orders-wrapper">
        <motion.div
          variants={slideIn("up", "spring", 0.2, 2)}
          initial="hidden"
          animate="show"
          className="orders-head"
        >
          <h1>My Orders</h1>
          <div className="selector">
            <DropDown
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              items={["All", "placed", "Delivered", "cancelled"]}
            />
          </div>
        </motion.div>
        <div className="order-summary">
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </div>
    </div>
  );
}

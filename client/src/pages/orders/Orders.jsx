import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./orders.scss";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  RiHomeFill,
  mealsImage,
} from "../../constants";
import DropDown from "../../components/dropDown/DropDown";
import { motion, useAnimate } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../features/userActions/order/orderAction.js";
// import { getOrderHistory } from "../../features/userActions/order/orderAction";

const OrderItemInfo = ({ item }) => {
  return (
    <div className="order-item-info">
      <div className="item-img-name">
        {" "}
        <img
          src={`${import.meta.env.VITE_API_BASE_IMAGE_URI}/assets/images/${
            item.image
          }`}
          alt={item.productName}
          loading="lazy"
        />
        <p>{item.productName}</p>
      </div>
      <p>x{item.quantity}</p>
      <p>
        <span style={{fontWeight:"bold", marginRight: "0.25em"}}>UGX</span> {item.price}
      </p>
    </div>
  );
};

const OrderItem = ({ order }) => {
  const [dropOrderItemInfo, setDropOrderItemInfo] = useState(false);
  
  // Format date from timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Format date and time from timestamp
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'placed':
        return '#e5570f'; // Orange
      case 'ready':
        return '#12c458'; // Green
      case 'delivered':
        return '#0066cc'; // Blue
      case 'cancelled':
        return '#ef4444'; // Red
      default:
        return '#999'; // Gray
    }
  };

  return (
    <div className="order-item">
      <OutsideClickHandler onOutsideClick={() => setDropOrderItemInfo(false)}>
        <div
          className="order-info"
          onClick={() => setDropOrderItemInfo(!dropOrderItemInfo)}
        >
          <p>
            <span>Order no:</span> {order.orderNumber}
          </p>

          <p className="status-container">
            <span>Status:</span>
            <span 
              className="status-badge"
              style={{
                backgroundColor: getStatusColor(order.orderStatus),
                color: 'white',
                padding: '0.25em 0.75em',
                borderRadius: '12px',
                fontSize: '0.85em',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginLeft: '0.5em'
              }}
            >
              {order.orderStatus || 'Unknown'}
            </span>
          </p>

          <p className="date">
            <span>Date:</span> {formatDate(order.createdAt)}
          </p>
          <p>
            <span>Total:</span>
            <span style={{fontWeight:"bold", marginLeft: "0.25em"}}>UGX</span>
            <span style={{marginLeft: "0.25em"}}>{order.total}</span>
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
          {order.items?.map((item, index) => (
            <OrderItemInfo key={index} item={item} />
          ))}
          {/* Status Timestamps */}
          <div style={{ marginTop: '1em', padding: '1em', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p style={{ fontSize: '0.9em', margin: '0.5em 0', color: 'rgba(255, 255, 255, 0.8)' }}>
              <strong>Placed:</strong> {formatDateTime(order.placedAt || order.createdAt)}
            </p>
            {order.readyAt && (
              <p style={{ fontSize: '0.9em', margin: '0.5em 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong>Ready:</strong> {formatDateTime(order.readyAt)}
              </p>
            )}
            {order.deliveredAt && (
              <p style={{ fontSize: '0.9em', margin: '0.5em 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                <strong>Delivered:</strong> {formatDateTime(order.deliveredAt)}
              </p>
            )}
          </div>
        </motion.div>
      </OutsideClickHandler>
    </div>
  );
};

export default function Orders() {
  const [selectedValue, setSelectedValue] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth) || localStorage.getItem("token");
  const orderHistory = useSelector((state) => state.order.orderHistory);
  const { isLoading } = useSelector((state) => state.order);

  // Fetch orders on mount
  useEffect(() => {
    const authToken = token || localStorage.getItem("token");
    if (authToken) {
      dispatch(getOrderHistory(authToken));
    }
  }, [dispatch, token]);

  // Auto-refresh orders every 10 seconds to show status updates
  useEffect(() => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;
    
    const refreshInterval = setInterval(() => {
      dispatch(getOrderHistory(authToken));
    }, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(refreshInterval);
  }, [dispatch, token]);

  // Filter orders based on selected status
  useEffect(() => {
    if (!orderHistory || orderHistory.length === 0) {
      setFilteredOrders([]);
      return;
    }

    if (selectedValue === "All") {
      setFilteredOrders(orderHistory);
    } else {
      const filtered = orderHistory.filter(order => 
        order.orderStatus?.toLowerCase() === selectedValue.toLowerCase()
      );
      setFilteredOrders(filtered);
    }
  }, [orderHistory, selectedValue]);

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
              items={["All", "Placed", "Ready", "Delivered", "Cancelled"]}
            />
          </div>
        </motion.div>
        <div className="order-summary">
          {isLoading ? (
            <div className="loading-message">
              <p>Loading your orders...</p>
            </div>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrderItem key={order.orderId || index} order={order} />
            ))
          ) : (
            <div className="no-orders-message">
              <p>
                {selectedValue === "All" 
                  ? "You haven't placed any orders yet." 
                  : `No ${selectedValue.toLowerCase()} orders found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

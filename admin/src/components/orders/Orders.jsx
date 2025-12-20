import "./orders.scss";
import { useContext, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import {
  TfiTime,
  userOrders as userOrder,
} from "../../constants/index";
import { filterOrdersByStatus } from "../../utils/helper";
import context from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderList,
  updateOrderStatus,
} from "../../features/order/orderAction";
import { useRef } from "react";

function OrderListChild({ order }) {
  const { selectedOrderItem, setSelectedOrderItem } = useContext(context);

  const handleOrderClick = (order) => {
    // set the selected order with order obj to display order items
    setSelectedOrderItem(order);
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

  return (
    <div
      className={`order-list-child ${
        selectedOrderItem.orderNumber === order.orderNumber
          ? ""
          : "hide-selected-order"
      }`}
      onClick={() => handleOrderClick(order)}
    >
      <div className="order-info-no">
        <p>
          ORDER NO: <span>{order.orderNumber}</span>
        </p>
        <p>
          <TfiTime className="icon" /> <span>{formatDateTime(order.placedAt || order.createdAt)}</span>
        </p>
        <p className="order-status-badge" style={{
          fontSize: '0.75em',
          padding: '0.25em 0.5em',
          borderRadius: '4px',
          display: 'inline-block',
          marginTop: '0.5em',
          backgroundColor: 
            order.orderStatus === 'placed' ? '#e5570f' :
            order.orderStatus === 'ready' ? '#12c458' :
            order.orderStatus === 'delivered' ? '#0066cc' :
            '#999',
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {order.orderStatus || 'Unknown'}
        </p>
      </div>
      <div className="order-info-price">
        <span style={{fontWeight:"bold", marginRight: "0.25em"}}>UGX</span>
        <span>{order.total}</span>
      </div>
    </div>
  );
}

const OrderListItem = ({ item }) => {
  return (
    <div className="order-list-item">
      <div className="img-name">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMAGE_URI}/assets/images/${
            item.image
          }
          `}
          alt={item.productName}
          loading="lazy"
        />

        <p>{item.productName}</p>
      </div>

      <div className="quantity">
        <span>x{item.quantity}</span>
      </div>

      <div className="price">
        <span style={{fontWeight:"bold", marginRight: "0.25em"}}>UGX</span> {item.price}
      </div>
    </div>
  );
};

export default function Orders() {
  const [selected, setSelected] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("placed");
  const orderList = useSelector((state) => state.orders.orderList);
  const [userOrders, setUserOrders] = useState(orderList);
  const { selectedOrderItem, setSelectedOrderItem } = useContext(context);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleOrderStatusClick = (index, status) => {
    setSelected(index);
    const filteredOrders = filterOrdersByStatus(orderList, status);
    setUserOrders(filteredOrders);
  };

  useEffect(() => {
    dispatch(getOrderList(token));
  }, [dispatch, token]);

  // Update userOrders when orderList changes
  useEffect(() => {
    if (orderList && orderList.length > 0) {
      // Apply current filter
      const statuses = ["Placed", "Ready", "Delivered"];
      const currentStatus = statuses[selected] || "Placed";
      const filteredOrders = filterOrdersByStatus(orderList, currentStatus);
      setUserOrders(filteredOrders);
    } else {
      setUserOrders([]);
    }
  }, [orderList, selected]);

  // Update selected status when order is selected
  useEffect(() => {
    if (selectedOrderItem && selectedOrderItem.orderStatus) {
      setSelectedStatus(selectedOrderItem.orderStatus.toLowerCase());
    }
  }, [selectedOrderItem]);

  const handleUpdateOrderStatus = async () => {
    if (!selectedOrderItem || !selectedOrderItem.orderId) {
      alert("Please select an order first");
      return;
    }
    
    const orderId = selectedOrderItem.orderId;
    const orderStatus = selectedStatus;
    
    if (orderStatus === selectedOrderItem.orderStatus?.toLowerCase()) {
      alert("Order status is already set to this value");
      return;
    }
    
    const result = await dispatch(updateOrderStatus(token, orderId, orderStatus));
    
    if (result?.success) {
      // Show success message
      alert(`Order status updated to ${orderStatus.toUpperCase()} successfully!`);
      // The order list will be refreshed automatically
    } else {
      alert(`Failed to update order status: ${result?.error?.message || "Unknown error"}`);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="orders">
      <div className="order-list-wrapper">
        <p className="heading">Orders</p>
        <div className="order-filters">
          {["Placed", "Ready", "Delivered"].map((status, index) => (
            <div
              key={index}
              className={`filters ${selected === index ? "active" : ""}`}
              onClick={() => handleOrderStatusClick(index, status)}
            >
              <p>{status}</p>
            </div>
          ))}
        </div>

        <div className="order-list">
          {userOrders?.map((order, index) => (
            <OrderListChild key={index} order={order} />
          ))}
        </div>
      </div>
      <div className="order-list-items-wrapper">
        <div className="order-update">
          <p className="order-update-title">Order Items Info</p>
          {selectedOrderItem && selectedOrderItem.orderId ? (
            <div className="order-update-controls">
              <div className="order-status-control">
                <label htmlFor="order-status">Update Order Status:</label>
                <select
                  id="order-status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value="placed">Placed</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="order-timestamps">
                <p className="timestamp-item">
                  <strong>Placed:</strong> {selectedOrderItem.placedAt ? new Date(parseInt(selectedOrderItem.placedAt)).toLocaleString('en-GB') : 'N/A'}
                </p>
                {selectedOrderItem.readyAt && (
                  <p className="timestamp-item">
                    <strong>Ready:</strong> {new Date(parseInt(selectedOrderItem.readyAt)).toLocaleString('en-GB')}
                  </p>
                )}
                {selectedOrderItem.deliveredAt && (
                  <p className="timestamp-item">
                    <strong>Delivered:</strong> {new Date(parseInt(selectedOrderItem.deliveredAt)).toLocaleString('en-GB')}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="order-update-placeholder">
              Select an order to update its status
            </p>
          )}
        </div>
        <div className="order-list-items-scroll">
          {selectedOrderItem &&
            selectedOrderItem.items?.map((item, index) => (
              <OrderListItem key={index} item={item} />
            ))}
        </div>
        <div className="submit-update">
          {selectedOrderItem && selectedOrderItem.orderId ? (
            <>
              <span>
                Total: <span style={{fontWeight:"bold"}}>UGX</span>{" "}
                {selectedOrderItem.total}
              </span>
              <button 
                onClick={handleUpdateOrderStatus}
                disabled={!selectedOrderItem || !selectedOrderItem.orderId}
              >
                Update Order Status
              </button>
            </>
          ) : (
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Select an order to view details
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

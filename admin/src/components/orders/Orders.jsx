import "./orders.scss";
import { useContext, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import {
  BsCurrencyRupee,
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
          <TfiTime className="icon" /> <span>12:45</span>
        </p>
      </div>
      <div className="order-info-price">
        <BsCurrencyRupee className="icon" />
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
        <BsCurrencyRupee className="icon" /> {item.price}
      </div>
    </div>
  );
};

export default function Orders() {
  const [selected, setSelected] = useState(1);
  const orderList = useSelector((state) => state.orders.orderList);
  const [userOrders, setUserOrders] = useState(orderList);
  const { selectedOrderItem } = useContext(context);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const statusRef = useRef();

  const handleOrderStatusClick = (index, status) => {
    setSelected(index);
    const filteredOrders = filterOrdersByStatus(orderList, status);
    setUserOrders(filteredOrders);
  };

  useEffect(() => {
    dispatch(getOrderList(token));
  }, []);

  const handleUpdateOrderStatus = () => {
    const orderId = selectedOrderItem.orderId;
    const orderStatus = statusRef.current.value;
    dispatch(updateOrderStatus(token, orderId, orderStatus));

    // console.log({
    //   orderId: selectedOrderItem.orderId,
    //   orderStatus: statusRef.current.value,
    //   token: token,
    // });
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
          <p>Order Items Info</p>
          <label htmlFor="order-status">Update Order Status:</label>
          <select
            id="order-status"
            defaultChecked={selectedOrderItem.orderStatus}
            ref={statusRef}
            // onChange={}
          >
            <option value="placed">Placed</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancel</option>
          </select>
        </div>
        <div className="order-list-items-scroll">
          {selectedOrderItem &&
            selectedOrderItem.items?.map((item, index) => (
              <OrderListItem key={index} item={item} />
            ))}
        </div>
        <div className="submit-update">
          <span>
            Total: <BsCurrencyRupee className="icon" />{" "}
            {selectedOrderItem.total}
          </span>{" "}
          <button onClick={handleUpdateOrderStatus}>update Order Status</button>
        </div>
      </div>
    </div>
  );
}

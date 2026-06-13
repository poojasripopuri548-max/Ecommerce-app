import { useState, useEffect } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Orders;
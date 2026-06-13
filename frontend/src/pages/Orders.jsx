import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    let active = true;

    api.get("/orders/myorders")
      .then((res) => {
        if (active) {
          setOrders(res.data);
        }
      })
      .catch((error) => {
        if (active) {
          setMessage(error.response?.data?.message || "Could not load orders");
        }
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>My Orders</h1>
        <p>Track your placed orders and current status.</p>
      </header>

      {message && <p className="notice">{message}</p>}

      {orders.length === 0 ? (
        <section className="empty-state">
          <p>No orders found.</p>
          <Link className="button" to="/">Shop Products</Link>
        </section>
      ) : (
        <section className="stack">
          {orders.map((order) => (
            <article className="item-row" key={order._id}>
              <div>
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                <p>Status: {order.status}</p>
                <p>Items: {order.products.length}</p>
              </div>
              <strong>Rs. {order.totalAmount}</strong>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Orders;

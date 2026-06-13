import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContextValue";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const [status, setStatus] = useState("");

  const totalAmount = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0),
    [cart]
  );

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/orders", {
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.qty,
        })),
        totalAmount,
      });

      clearCart();
      setStatus("Order placed successfully");
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setStatus("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      setStatus(error.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Checkout</h1>
        <p>Create an order and save it in MongoDB.</p>
      </header>

      {cart.length === 0 ? (
        <section className="empty-state">
          <p>Your cart is empty.</p>
          {status && <strong>{status}</strong>}
          <Link className="button" to="/">Add Products</Link>
        </section>
      ) : (
        <section className="checkout-layout">
          <div className="stack">
            {cart.map((item) => (
              <article className="item-row" key={item._id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.qty}</p>
                </div>
                <strong>Rs. {(item.price || 0) * (item.qty || 1)}</strong>
              </article>
            ))}
          </div>

          <aside className="summary-panel">
            <h2>Order Summary</h2>
            <p>Total Amount</p>
            <strong>Rs. {totalAmount}</strong>
            <button className="button" onClick={handleCheckout}>
              Place Order
            </button>
            {status && <p>{status}</p>}
          </aside>
        </section>
      )}
    </main>
  );
}

export default Checkout;

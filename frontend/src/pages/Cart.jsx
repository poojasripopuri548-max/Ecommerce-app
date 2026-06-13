import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContextValue";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>My Cart</h1>
        <p>{cart.length} item{cart.length === 1 ? "" : "s"} selected</p>
      </header>

      {cart.length === 0 ? (
        <section className="empty-state">
          <p>Cart is empty</p>
          <Link className="button" to="/">Add Products</Link>
        </section>
      ) : (
        <section className="stack">
          {cart.map((item) => (
            <article className="item-row" key={item._id}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: Rs. {item.price}</p>
                <p>Stock: {item.stock ?? "Available"}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQuantity(item._id)}>+</button>
              </div>

              <button className="ghost-button" onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </article>
          ))}

          <footer className="cart-summary">
            <strong>Total: Rs. {totalPrice}</strong>
            <div className="actions">
              <button className="ghost-button" onClick={clearCart}>Clear Cart</button>
              <Link className="button" to="/checkout">Checkout</Link>
            </div>
          </footer>
        </section>
      )}
    </main>
  );
}

export default Cart;

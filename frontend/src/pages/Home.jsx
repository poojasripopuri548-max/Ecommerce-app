import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/cartContextValue";

const fallbackProductImage =
  "https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&w=900&q=80";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="page-shell">
      <header className="store-hero">
        <div>
          <span className="eyebrow">New Season Essentials</span>
          <h1>Modern apparel, ready to ship.</h1>
          <p>
            Browse curated products, manage your cart, and place orders with a
            clean full-stack shopping flow.
          </p>
        </div>
        <img src={fallbackProductImage} alt="Black shirt product" />
      </header>

      {products.length === 0 ? (
        <section className="empty-state">
          <p>No products found. Add products from the admin dashboard.</p>
          <Link className="button" to="/admin">Open Admin</Link>
        </section>
      ) : (
        <section className="product-grid">
          {products.map((product) => {
            const productId = product._id || product.id;

            return (
              <article className="product-card" key={productId}>
                <img
                  src={product.image || fallbackProductImage}
                  alt={product.name}
                />

                <div className="product-info">
                  <p className="eyebrow">In stock: {product.stock}</p>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <strong>Rs. {product.price}</strong>
                </div>

                <div className="actions">
                  <Link className="ghost-button" to={`/products/${productId}`}>
                    Details
                  </Link>
                  <button
                    className="button"
                    onClick={() =>
                      addToCart({
                        ...product,
                        _id: productId,
                      })
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Home;

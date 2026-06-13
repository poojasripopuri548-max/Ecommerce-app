import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/cartContextValue";

const fallbackProductImage =
  "https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&w=1200&q=80";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="page-shell">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="details-layout">
        <img
          src={product.image || fallbackProductImage}
          alt={product.name}
        />
        <div className="details-copy">
          <span className="eyebrow">Product Details</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong>Rs. {product.price}</strong>
          <p>Stock: {product.stock}</p>
          <div className="actions">
            <button className="button" onClick={() => addToCart(product)}>
              Add To Cart
            </button>
            <Link className="ghost-button" to="/cart">Open Cart</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;

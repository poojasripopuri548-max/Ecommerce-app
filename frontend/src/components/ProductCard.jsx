import { useContext } from "react";
import { CartContext } from "../context/cartContextValue";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Rs. {product.price}</p>

      <button onClick={() => addToCart(product)}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;

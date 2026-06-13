import { useEffect, useState } from "react";
import api from "../services/api";

const initialProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
  stock: "",
};

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState(initialProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login as admin to view orders");
    }
  };

  useEffect(() => {
    let active = true;

    api.get("/products").then((res) => {
      if (active) {
        setProducts(res.data);
      }
    });

    api.get("/orders")
      .then((res) => {
        if (active) {
          setOrders(res.data);
        }
      })
      .catch((error) => {
        if (active) {
          setMessage(error.response?.data?.message || "Login as admin to view orders");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialProduct);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        setMessage("Product updated");
      } else {
        await api.post("/products", payload);
        setMessage("Product added");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Product save failed");
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || "",
      stock: product.stock || "",
    });
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setMessage("Product deleted");
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      setMessage("Order status updated");
      fetchOrders();
    } catch (error) {
      setMessage(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Add products, edit inventory, delete products, view orders, and change order status.</p>
      </header>

      {message && <p className="notice">{message}</p>}

      <section className="admin-grid">
        <form className="form-panel" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
          <input name="name" placeholder="Product name" value={formData.name} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />

          <div className="actions">
            <button className="button" type="submit">
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button className="ghost-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="stack">
          <h2>Products</h2>
          {products.map((product) => (
            <article className="item-row" key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <p>Rs. {product.price} | Stock: {product.stock}</p>
              </div>
              <div className="actions">
                <button className="ghost-button" onClick={() => startEdit(product)}>Edit</button>
                <button className="ghost-button" onClick={() => deleteProduct(product._id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      </section>

      <section className="stack">
        <h2>Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <article className="item-row" key={order._id}>
              <div>
                <h3>{order.user?.name || "Customer"}</h3>
                <p>Total: Rs. {order.totalAmount}</p>
                <p>Status: {order.status}</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;

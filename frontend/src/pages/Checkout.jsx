const handleCheckout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    await api.post(
      "/orders",
      {
        products: cart.map((item) => ({
          productId: item._id,
          quantity: item.qty,
        })),
        totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
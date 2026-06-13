const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Place Order
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (!req.body.products?.length) {
      return res.status(400).json({
        message: "Order must include at least one product"
      });
    }

    const order = new Order({
      user: req.user.id,
      products: req.body.products,
      totalAmount: req.body.totalAmount
    });

    await order.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get My Orders
router.get("/myorders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    })
      .populate("products.productId")
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get All Orders
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.productId");

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Order By ID
router.get("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Update Order Status
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Delete Order
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      message: "Order Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;

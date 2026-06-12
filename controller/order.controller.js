import mongoose from "mongoose";
import OrderModel from "../Model/Order.model.js";

// ✅ Save order after payment verified
export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    const { product, paymentId, orderId, totalAmount, paymentMethod } = req.body;

    if (!paymentId || !totalAmount) {
      return res.status(400).json({ msg: "paymentId and totalAmount are required" });
    }

    const newOrder = await OrderModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      product,
      paymentId,
      orderId,
      totalAmount,
      paymentMethod,
      status: "Processing",
    });

    return res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Error saving order:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all orders for logged in user
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ msg: "Unauthorized" });

    const orders = await OrderModel.find({ userId })
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
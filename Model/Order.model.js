import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Cloth" },
    name: String,
    price: Number,
    image: String,
    type: String,
    brand: String,
    color: [String],
  },
  paymentId: { type: String, required: true },
  orderId: { type: String },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: "card" },
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
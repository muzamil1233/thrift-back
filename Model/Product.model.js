import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  discount: {
    type: Number, // percentage e.g. 50 means 50% OFF
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  offer: {
    type: String, // e.g. "Buy 2 for 1199"
  },
  badge: {
    type: String, // e.g. "OVERSIZED FIT", "NEW ARRIVAL"
  },
  images: {
    type: [String], // array of image URLs
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
});

// Auto-calculate discount if not provided
productSchema.pre("save", function (next) {
  if (this.originalPrice && this.price && !this.discount) {
    this.discount = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  next();
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
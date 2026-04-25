import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ["Men", "Women", "Kids"],
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    default: []
  },
  color: {
    type: [String],
    default: []
  },
  material: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,   // ✅ MRP / crossed out price
  },
  discount: {
    type: Number,   // ✅ percentage e.g. 50 means 50% OFF
  },
  rating: {
    type: Number,
    default: 4.5    // ✅ star rating
  },
  offer: {
    type: String,   // ✅ e.g. "Buy 2 for 1199"
  },
  badge: {
    type: String,   // ✅ e.g. "OVERSIZED FIT"
  },
  stock: {
    type: Number,
    default: 0
  },
  brand: {
    type: String
  },
  description: {
    type: String
  },
  images: {
    type: [String],
    default: []
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-calculate discount from price and originalPrice if not provided
clothesSchema.pre("save", function (next) {
  if (this.originalPrice && this.price && !this.discount) {
    this.discount = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  next();
});

const Clothes = mongoose.model("Clothes", clothesSchema);

export default Clothes;
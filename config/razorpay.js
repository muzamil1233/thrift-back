import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// Safety check: Warn immediately if keys are missing
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("⚠️ WARNING: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env!");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
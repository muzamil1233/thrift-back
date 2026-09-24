import crypto from 'crypto';
// Import the instance you created in your config file (adjust path as needed):
import razorpay from '../config/razorpay.js'; 

// ===============================
// 1. Create Order
// ===============================
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "A valid amount is required." });
    }

    const options = {
      amount: Math.round(Number(amount)), // Razorpay strictly requires integer paise (₹1 = 100 paise)
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay createOrder error:", error);
    return res.status(500).json({ error: error.message || "Failed to create order" });
  }
};

// ===============================
// 2. Verify Payment
// ===============================
export const verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate incoming parameters
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing order_id, payment_id, or signature.",
      });
    }

    // Generate expected HMAC SHA-256 signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");

    // Timing-safe comparison to prevent timing attacks
    const isValid =
      digest.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(razorpay_signature));

    if (isValid) {
      // ✅ Payment is genuine!
      // You can update your order status to 'Paid' in MongoDB here.
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }
  } catch (error) {
    console.error("Razorpay verifyPayment error:", error);
    return res.status(500).json({ error: error.message || "Verification failed" });
  }
};
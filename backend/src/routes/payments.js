import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { Order } from "../models/Order.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Create Order
router.post("/create-order", requireAuth, async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const options = {
            amount: Math.round(amount * 100), // ₹ -> paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json(order);
    } catch (error) {
        console.error("Razorpay create order failed", error);
        res.status(500).json({ error: error.message });
    }
});

// Verify Payment and Save Order
router.post("/verify", requireAuth, async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            amount,
        } = req.body;

        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        const generated_signature = crypto
            .createHmac("sha256", keySecret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ error: "Invalid payment signature" });
        }

        // items should be provided by frontend or calculated from cart on backend
        // For this demo, we trust the frontend items (secure in prod with re-verification)
        const orderItems = items || [];

        // Create order in DB
        const order = await Order.create({
            userId: req.user._id,
            items: orderItems,
            totalAmount: amount,
            paymentStatus: "paid",
            orderStatus: "processing",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
        });

        res.json({ status: "success", orderId: order.orderId });
    } catch (error) {
        console.error("Payment verification failed", error);
        res.status(500).json({ error: "Payment verification failed" });
    }
});

export default router;

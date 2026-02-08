import express from "express";
import { Order } from "../models/Order.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

function calculateTotal(items) {
  if (!Array.isArray(items)) {
    return 0;
  }

  return items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);
}

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { items, paymentStatus, orderStatus, totalAmount } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "items are required" });
    }

    const computedTotal = calculateTotal(items);
    const finalTotal =
      totalAmount === undefined ? computedTotal : Number(totalAmount);

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount: Number.isNaN(finalTotal) ? computedTotal : finalTotal,
      paymentStatus: paymentStatus || "pending",
      orderStatus: orderStatus || "pending",
    });

    res.status(201).json({ data: order });
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", requireAuth, async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (req.user.role !== "admin" && userId !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { orderStatus, paymentStatus } = req.body || {};

      const order = await Order.findOne({
        $or: [{ _id: id }, { orderId: id }],
      });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (orderStatus) {
        order.orderStatus = orderStatus;
      }

      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
      }

      await order.save();
      res.json({ data: order });
    } catch (error) {
      next(error);
    }
  },
);

export default router;

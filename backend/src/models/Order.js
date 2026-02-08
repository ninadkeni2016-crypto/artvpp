import mongoose from "mongoose";
import { createPublicId } from "../utils/ids.js";

const orderItemSchema = new mongoose.Schema(
  {
    itemType: {
      type: String,
      enum: ["product", "service", "course"],
      required: true,
    },
    itemId: { type: String, required: true },
    title: { type: String },
    image: { type: String },
    vendorId: { type: String },
    itemType: {
      type: String,
      enum: ["product", "service", "course"],
      required: true,
    },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, default: 0, min: 0 },
    customizationNotes: { type: String },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, default: () => createPublicId("o") },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: { type: [orderItemSchema], default: [] },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "fulfilled", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const Order = mongoose.model("Order", orderSchema);

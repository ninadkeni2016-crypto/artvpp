import mongoose from "mongoose";
import { createPublicId } from "../utils/ids.js";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      default: () => createPublicId("p"),
    },
    type: {
      type: String,
      enum: ["physical", "digital", "merchandise"],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    description: { type: String, default: "" },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const Product = mongoose.model("Product", productSchema);

import mongoose from "mongoose";
import { createPublicId } from "../utils/ids.js";

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      unique: true,
      default: () => createPublicId("s"),
    },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["commission", "limited edition", "professional", "educational"],
      required: true,
    },
    startingPrice: { type: Number, required: true, min: 0 },
    deliveryTime: { type: String, default: "" },
    workflow: { type: String, default: "" },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const Service = mongoose.model("Service", serviceSchema);

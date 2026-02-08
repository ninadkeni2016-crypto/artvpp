import mongoose from "mongoose";
import { createPublicId } from "../utils/ids.js";

const serviceRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      default: () => createPublicId("sr"),
    },
    serviceId: { type: String, required: true },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "accepted", "declined", "completed"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const ServiceRequest = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema,
);

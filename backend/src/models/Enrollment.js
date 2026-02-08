import mongoose from "mongoose";
import { createPublicId } from "../utils/ids.js";

const enrollmentSchema = new mongoose.Schema(
  {
    enrollmentId: {
      type: String,
      unique: true,
      default: () => createPublicId("e"),
    },
    courseId: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

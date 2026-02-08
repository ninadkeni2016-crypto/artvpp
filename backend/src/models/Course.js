import mongoose from "mongoose";
import { createPublicId } from "../utils/ids.js";

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      unique: true,
      default: () => createPublicId("c"),
    },
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    duration: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    level: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export const Course = mongoose.model("Course", courseSchema);

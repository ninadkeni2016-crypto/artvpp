import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "artist", "creator", "admin"],
      default: "user",
    },
    isApproved: { type: Boolean, default: false }, // For artists/creators
    approvalDate: { type: Date },
    productCount: { type: Number, default: 0 },
    serviceCount: { type: Number, default: 0 },
    courseCount: { type: Number, default: 0 },
    profileImage: { type: String, default: "" },
    passwordHash: { type: String, required: true },
    addresses: [{
      id: String,
      label: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      isDefault: Boolean
    }],
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export function toPublicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profileImage: user.profileImage,
    addresses: user.addresses || [],
    createdAt: user.createdAt,
  };
}

export const User = mongoose.model("User", userSchema);

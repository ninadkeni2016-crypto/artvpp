import mongoose from "mongoose";

export function createPublicId(prefix) {
  return `${prefix}_${new mongoose.Types.ObjectId().toString()}`;
}

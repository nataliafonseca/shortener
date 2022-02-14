import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Administrator", "User"], default: "User" },
    phones: { type: [String], required: true },
  },
  {
    timestamp: true,
  }
);

export const UserModel = mongoose.model("user", UserSchema);

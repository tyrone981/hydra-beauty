import { Schema, models, model } from "mongoose";

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export const Admin = models.Admin || model("Admin", adminSchema);

import { Schema, models, model } from "mongoose";

const serviceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    details: { type: String, default: "", trim: true },
    image: { type: String, required: true, trim: true },
    duration: { type: String, default: "", trim: true },
    price: { type: Number, default: null },
    category: { type: String, default: "", trim: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = models.Service || model("Service", serviceSchema);
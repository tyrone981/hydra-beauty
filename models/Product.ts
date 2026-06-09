
import mongoose, { Schema, models, model } from 'mongoose';

const productSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    details: { type: String },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    badge: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model('Product', productSchema);
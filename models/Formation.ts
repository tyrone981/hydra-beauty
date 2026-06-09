
import mongoose, { Schema, models, model } from 'mongoose';

const formationSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    duration: { type: String },
    schedule: { type: String },
    seats: { type: Number },
    ctaLink: { type: String },
  },
  { timestamps: true }
);

export const Formation = models.Formation || model('Formation', formationSchema);
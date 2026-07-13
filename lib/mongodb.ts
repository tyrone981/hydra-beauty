// lib/mongodb.ts
import mongoose from "mongoose";

// Try with different options
const MONGODB_URI = 'mongodb+srv://yvanleonissoa_db_user:MyPassword123@cluster0.miysojn.mongodb.net/hydra-beauty?retryWrites=true&w=majority';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

let cached = global._mongooseCache;

if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "hydra-beauty",
      serverSelectionTimeoutMS: 30000, // Increase timeout
      socketTimeoutMS: 45000,
    });
  }

  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (error) {
    cached!.promise = null;
    throw error;
  }
}
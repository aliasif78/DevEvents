import mongoose from "mongoose";

/**
 * Global type declaration for caching the MongoDB connection
 * This prevents TypeScript errors when accessing global.mongoose
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * MongoDB connection URI from environment variables
 * Throws an error if MONGODB_URI is not defined
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global cache object to store the connection and connection promise
 * In development, Next.js hot reloads can create multiple connections
 * Caching ensures we reuse the existing connection instead of creating new ones
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose
 *
 * @returns Promise<mongoose.Connection> - The active MongoDB connection
 *
 * Connection caching strategy:
 * - If connection exists, return it immediately
 * - If connection is being established, wait for the existing promise
 * - Otherwise, create a new connection and cache both the promise and result
 *
 * This approach prevents connection exhaustion in development mode
 * where Next.js hot reloading would otherwise create multiple connections
 */
async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable buffering to fail fast if connection is lost
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose.connection;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        // Clear the cached promise on error so next call will retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the cached promise on error
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;

import mongoose from 'mongoose';

// Global cache to prevent multiple connections in development/serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If we have a cached connection and it's ready, return it
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If a connection promise is already pending, reuse it
  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 10000,
      bufferCommands: false, // Disable buffering to fail fast if not connected
    };

    console.log('🔄 Initiating new MongoDB connection...');
    
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise so we can retry on next request
    console.error('❌ MongoDB connection error:', e.message);
    throw e;
  }

  return cached.conn;
};

// Helper function to ensure connection is ready
export const ensureConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  await connectDB();
  return mongoose.connection.readyState === 1;
};

// Handle connection events (optional but good for logging)
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
  // We don't clear cached.promise here immediately to avoid race conditions during reconnects,
  // but if the connection is truly dead, the next ensureConnection check will fail readyState check
  // and trigger connectDB, which (if promise is still there) will return the old connection.
  // Ideally, if strictly disconnected, we might want to clear cached.conn.
  // However, Mongoose handles auto-reconnect usually. 
  // For Serverless, it's often safer to rely on Lambda freezing the state.
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error event:', err);
});

// Graceful shutdown
if (process.env.VERCEL !== '1' && !global.mongooseShutdownHooked) {
  global.mongooseShutdownHooked = true;
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
}

export default connectDB;

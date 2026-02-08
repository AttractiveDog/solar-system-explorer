import mongoose from 'mongoose';

// Cache the connection to reuse it across serverless function invocations
let cachedConnection = null;

const connectDB = async () => {
  // If we have a cached connection and it's ready, return it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    // Optimized connection options for serverless environments
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Serverless-optimized settings
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Limit connection pool size
      minPoolSize: 2, // Maintain minimum connections
      maxIdleTimeMS: 10000, // Remove connections after 10s of idle time
      
      // Buffering settings - critical for serverless
      bufferCommands: false, // Disable buffering to fail fast if not connected
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Cache the connection for reuse
    cachedConnection = conn;
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      cachedConnection = null; // Clear cache on error
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
      cachedConnection = null; // Clear cache on disconnect
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB reconnected');
    });

    // Graceful shutdown (only relevant for local development)
    if (process.env.VERCEL !== '1') {
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      });
    }

    return conn;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    cachedConnection = null; // Clear cache on error
    // In serverless, we shouldn't exit the process, as it causes "Invocation Failed"
    // Instead, allow the error to persist so subsequent requests might retry
    // or the error middleware catches it.
    throw error;
  }
};

// Helper function to ensure connection is ready
export const ensureConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  await connectDB();
  return mongoose.connection.readyState === 1;
};

export default connectDB;

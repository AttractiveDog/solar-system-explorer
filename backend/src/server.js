import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
// Connect to MongoDB
if (process.env.MONGODB_URI) {
  connectDB().catch(err => {
    console.error('❌ Failed to connect to MongoDB in initial connection:', err);
    // Do NOT exit process here for serverless, let the request handlers fail gracefully
  });
} else {
  console.warn('⚠️ MONGODB_URI is not defined. Database features will not work.');
}

// Initialize Express app
const app = express();

// Trust proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
  : ['*'];

console.log('🌐 CORS - Allowed origins:', allowedOrigins);

// More permissive CORS for production/Vercel
// Manual CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Log for debugging
  // console.log('🔍 Incoming origin:', origin);

  if (origin && (allowedOrigins.includes(origin) || allowedOrigins.includes('*'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Allow non-browser requests (e.g. server-to-server, Postman)
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    // Optional: Allow localhost/vercel.app even if not in explicit list (dev convenience)
    if (origin.includes('localhost') || origin.includes('vercel.app')) {
       res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }

  // Always set these headers for preflight
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// app.use(cors(corsOptions)); // Disable package-based CORS to prevent conflicts

// test Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API version
const API_VERSION = process.env.API_VERSION || 'v1';

// Serve static files for admin panel
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Handle OPTIONS requests explicitly for CORS preflight (Handled by manual middleware above)
// app.options('*', cors(corsOptions));

// Routes
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/clubs`, clubRoutes);
app.use(`/api/${API_VERSION}/events`, eventRoutes);
app.use(`/api/${API_VERSION}/achievements`, achievementRoutes);
app.use(`/api/${API_VERSION}/admin`, adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Solar System Explorer API',
    version: API_VERSION,
    endpoints: {
      users: `/api/${API_VERSION}/users`,
      clubs: `/api/${API_VERSION}/clubs`,
      events: `/api/${API_VERSION}/events`,
      achievements: `/api/${API_VERSION}/achievements`,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);

  // Ensure CORS headers are always sent, even in error responses
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Accept, Origin');
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server (only in non-serverless environment)
const PORT = process.env.PORT || 5000;

// For Vercel serverless deployment, we export the app
// For local development, we start the server
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 API available at http://localhost:${PORT}/api/${API_VERSION}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Close server & exit process
    // Only exit in development/local, not in serverless
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
  });
}

// Export the Express app for Vercel
export default app;

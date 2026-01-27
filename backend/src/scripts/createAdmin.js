import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import connectDB from '../config/database.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Default admin already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin', // Will be hashed by the model's pre-save hook
      email: 'admin@solarsystem.com',
      role: 'superadmin',
    });

    console.log('✅ Default admin created successfully');
    console.log('   Username: admin');
    console.log('   Password: admin');
    console.log('   ⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();

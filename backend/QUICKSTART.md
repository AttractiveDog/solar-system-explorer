# Quick Start Guide - Solar System Explorer Backend

## Overview

This backend provides a complete REST API for the Solar System Explorer application with MongoDB Atlas integration.

## Step-by-Step Setup

### 1. Create MongoDB Atlas Account (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Verify your email address

### 2. Create a Database Cluster

1. After logging in, click **"Create a Deployment"** or **"Build a Database"**
2. Choose the **FREE tier** (M0 Sandbox)
3. Select a **Cloud Provider** (AWS, Google Cloud, or Azure)
4. Choose a **Region** closest to you
5. Give your cluster a name (e.g., "SolarSystemCluster")
6. Click **"Create"**
7. Wait a few minutes for the cluster to be created

### 3. Create Database User

1. In the left sidebar, click **"Database Access"** under Security
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username (e.g., "solaradmin")
5. Create a strong password (save this somewhere safe!)
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

### 4. Configure Network Access

1. In the left sidebar, click **"Network Access"** under Security
2. Click **"Add IP Address"**
3. For development, you can:
   - Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - Or click **"Add Current IP Address"** for better security
4. Click **"Confirm"**

### 5. Get Your Connection String

1. Go back to **"Database"** in the left sidebar
2. Click the **"Connect"** button for your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver and latest version
5. Copy the connection string (it looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Important**: Replace `<username>` and `<password>` with your actual credentials

### 6. Configure Backend Environment

1. In the backend folder, create a `.env` file:

   ```bash
   cd backend
   copy .env.example .env
   ```

2. Open the `.env` file and update these values:

   ```env
   MONGODB_URI=mongodb+srv://solaradmin:YourPassword123@cluster0.xxxxx.mongodb.net/solar-system-explorer?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   API_VERSION=v1
   CORS_ORIGIN=http://localhost:5173
   ```

   **Replace**:
   - `solaradmin` with your database username
   - `YourPassword123` with your database password
   - `cluster0.xxxxx.mongodb.net` with your actual cluster URL
   - `solar-system-explorer` is the database name (you can change this)

### 7. Install Dependencies (Already Done)

The dependencies have already been installed. If you need to reinstall:

```bash
npm install
```

### 8. Seed the Database

Populate your database with sample data:

```bash
npm run seed
```

You should see output like:

```
✅ Created 3 users
✅ Created 4 clubs
✅ Created 4 events
✅ Created 7 achievements
✨ Database seeded successfully!
```

### 9. Start the Server

```bash
npm run dev
```

You should see:

```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server is running on port 5000 in development mode
📡 API available at http://localhost:5000/api/v1
```

### 10. Test the API

Open your browser and go to:

- http://localhost:5000 (Welcome message)
- http://localhost:5000/health (Health check)
- http://localhost:5000/api/v1/users (Get all users)

Or use this curl command:

```bash
curl http://localhost:5000/api/v1/users
```

## Common Issues & Solutions

### ❌ "MongoNetworkError: connection refused"

**Solution**: Check that your MongoDB connection string is correct and that you've whitelisted your IP address in MongoDB Atlas.

### ❌ "Authentication failed"

**Solution**: Verify your username and password in the connection string. Make sure you've replaced `<username>` and `<password>` with actual values.

### ❌ "Port 5000 is already in use"

**Solution**: Change the PORT in your `.env` file to another port (e.g., 5001, 3001).

### ❌ CORS errors from frontend

**Solution**: Make sure `CORS_ORIGIN` in `.env` matches your frontend URL (default: http://localhost:5173).

## MongoDB Atlas Dashboard

You can view your data in MongoDB Atlas:

1. Go to your cluster
2. Click **"Browse Collections"**
3. You'll see your databases and collections with the seeded data

## API Endpoints

Once running, your API will be available at: http://localhost:5000/api/v1

Main endpoints:

- `/users` - User management
- `/clubs` - Club management
- `/events` - Event management
- `/achievements` - Achievement system

See `API_DOCUMENTATION.md` for detailed endpoint documentation.

## Next Steps

1. **Connect Frontend**: Update your frontend to use the API endpoints
2. **Test Endpoints**: Use Postman or Thunder Client to test the API
3. **Customize Data**: Modify the seed script to add your own data
4. **Add Features**: Extend the API with new endpoints as needed

## Production Deployment

When deploying to production:

1. Update `NODE_ENV` to `production`
2. Update `CORS_ORIGIN` to your production frontend URL
3. Use environment variables for sensitive data
4. Consider using MongoDB Atlas IP whitelisting for security

## Support

For issues:

1. Check the README.md for detailed documentation
2. Review the API_DOCUMENTATION.md for endpoint details
3. Check MongoDB Atlas documentation at https://docs.atlas.mongodb.com/

Happy coding! 🚀

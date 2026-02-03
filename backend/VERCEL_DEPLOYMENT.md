# Vercel Deployment Guide

This backend has been optimized for deployment on Vercel. Follow these steps to deploy:

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. MongoDB Atlas connection string
3. Vercel CLI (optional, but recommended): `npm i -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for beginners)

1. **Push your code to GitHub/GitLab/Bitbucket**

   ```bash
   git add .
   git commit -m "Optimize backend for Vercel deployment"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your repository
   - Select the `backend` folder as the root directory

3. **Configure Environment Variables**
   In the Vercel dashboard, add these environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NODE_ENV` - Set to `production`
   - `API_VERSION` - Set to `v1` (or your preferred version)
   - `CORS_ORIGIN` - Your frontend URL(s). For multiple URLs, separate with commas:
     - Single: `https://your-frontend.vercel.app`
     - Multiple: `https://app1.vercel.app,https://app2.vercel.app`
     - See [CORS_CONFIGURATION.md](CORS_CONFIGURATION.md) for details

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your backend will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Navigate to backend directory**

   ```bash
   cd backend
   ```

4. **Deploy**

   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No (for first deployment)
   - What's your project's name? (Enter a name)
   - In which directory is your code located? `./`

5. **Set Environment Variables**

   ```bash
   vercel env add MONGODB_URI
   vercel env add NODE_ENV
   vercel env add API_VERSION
   vercel env add CORS_ORIGIN
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Configuration

### Update Frontend CORS Settings

Make sure your frontend is updated to use the new backend URL:

```javascript
const API_URL = "https://your-backend.vercel.app/api/v1";
```

### Update CORS_ORIGIN Environment Variable

In Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Update `CORS_ORIGIN` with your frontend URL

### File Uploads Consideration

⚠️ **Important**: Vercel's serverless functions have a **4.5 MB request body limit**.

Current setup uses `multer` for file uploads to local filesystem, which won't work on Vercel's serverless environment due to:

- Read-only filesystem (except `/tmp`)
- Temporary nature of serverless instances
- File upload size limits

**Recommended Solutions:**

1. **Use Vercel Blob Storage** (Recommended)
   - Install: `npm install @vercel/blob`
   - [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)

2. **Use Cloudinary or AWS S3** (Alternative)
   - More control and flexibility
   - Better for production applications

3. **Keep uploads separate** (Quick fix)
   - Deploy a separate file upload service
   - Or use existing image hosting service

## Vercel-Specific Optimizations Applied

✅ **Configuration File**: `vercel.json` defines build and routing settings
✅ **Serverless Export**: `server.js` now exports the Express app
✅ **Conditional Server Start**: Server only starts in non-Vercel environments
✅ **Environment Detection**: Uses `VERCEL` environment variable for detection
✅ **Build Scripts**: Added build and vercel-build scripts to package.json
✅ **Ignore File**: `.vercelignore` excludes unnecessary files from deployment

## Testing Your Deployment

1. **Health Check**

   ```bash
   curl https://your-backend.vercel.app/health
   ```

2. **API Endpoint Test**

   ```bash
   curl https://your-backend.vercel.app/api/v1/clubs
   ```

3. **Admin Panel**
   Visit: `https://your-backend.vercel.app/admin`

## Troubleshooting

### Common Issues

1. **Database Connection Fails**
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Verify `MONGODB_URI` environment variable is set correctly

2. **CORS Errors**
   - Verify `CORS_ORIGIN` includes your frontend URL(s)
   - For multiple URLs, ensure they're comma-separated
   - Check that frontend is making requests to correct backend URL
   - See [CORS_CONFIGURATION.md](CORS_CONFIGURATION.md) for detailed setup

3. **404 Errors**
   - Check `vercel.json` routing configuration
   - Ensure all routes are properly defined

4. **Function Timeout**
   - Vercel has a 10-second timeout for Hobby plan
   - Optimize database queries and reduce response time

### Logs and Monitoring

View logs in Vercel dashboard:

1. Go to your project
2. Click on "Deployments"
3. Select a deployment
4. Click "Functions" tab to see logs

## Local Development

The backend still works locally:

```bash
npm install
npm run dev
```

The code automatically detects if it's running on Vercel and adjusts accordingly.

## Continuous Deployment

Once connected to Git:

- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- Configure branch-specific deployments in Vercel dashboard

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Express.js on Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)

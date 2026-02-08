# Serverless File Upload Fix for Team Members

## Problem

When adding team members on the deployed Vercel backend, you get:

```
Error: ENOENT: no such file or directory, open '/var/task/backend/uploads/team-images/...'
```

## Root Cause

**Vercel serverless functions have a READ-ONLY filesystem** (except `/tmp`). You cannot write to directories like `uploads/team-images/` because:

1. The filesystem is read-only in serverless
2. Files don't persist between function invocations
3. The `/var/task/` directory contains your deployed code and cannot be modified

## Immediate Fix Applied ✅

### Changed: `backend/src/routes/teamRoutes.js`

- Added environment detection to use `/tmp/team-images` in Vercel
- Added directory creation to ensure `/tmp` subdirectory exists
- Keeps using local `uploads/` directory for development

### Changed: `backend/src/controllers/teamController.js`

- Added `getUploadDir()` helper function
- All file operations now use environment-aware paths
- Works in both local development and Vercel serverless

## ⚠️ IMPORTANT LIMITATION

**Files uploaded to `/tmp` are TEMPORARY and will be deleted:**

- When the serverless function "goes cold" (inactive)
- After the function execution completes
- They are NOT permanent storage

## Recommended Solution: Use Cloud Storage

For production, you should use a cloud storage service. Here are the options:

### Option 1: Cloudinary (Recommended - Easiest)

**Pros:**

- Free tier available
- Easy to integrate
- Automatic image optimization
- CDN included
- Direct upload from browser possible

**Setup:**

```bash
npm install cloudinary multer-storage-cloudinary
```

### Option 2: AWS S3

**Pros:**

- Very reliable
- Scalable
- Good pricing
- Industry standard

### Option 3: Vercel Blob Storage

**Pros:**

- Integrated with Vercel
- Simple to use
- Good for Vercel deployments

## Current Status

✅ **Fixed:** File upload now works in Vercel (files go to `/tmp`)
⚠️ **Warning:** Images are temporary and will be lost
🔧 **Next Step:** Implement cloud storage for permanent image hosting

## Testing After Deployment

After you redeploy to Vercel:

1. **Test adding a member:**

   ```bash
   # The upload will now succeed (no ENOENT error)
   ```

2. **Important Note:**
   - Images will work initially
   - But may disappear after some time (when function goes cold)
   - This is expected behavior with `/tmp` storage

## Quick Cloud Storage Implementation

If you want to implement Cloudinary (recommended):

1. Sign up at cloudinary.com (free tier)
2. Get your credentials (cloud_name, api_key, api_secret)
3. I can help you integrate it - just ask!

Would you like me to help you implement Cloudinary or another cloud storage solution for permanent image storage?

# File Upload Migration Guide for Vercel

## Current Situation

The backend currently uses local file storage via `multer`, which works locally but has limitations on Vercel:

- ⚠️ Serverless functions have **read-only filesystem** (except `/tmp`)
- ⚠️ `/tmp` is cleared between invocations
- ⚠️ **4.5 MB request body limit**
- ⚠️ Files uploaded to memory are lost after request completes

**Temporary Solution Applied**: The code now uses memory storage on Vercel, which allows the app to run but **files won't persist**. This is only suitable for development/testing.

## Recommended Solutions

### Option 1: Vercel Blob Storage (Easiest)

Vercel Blob is a simple blob storage solution built for Vercel deployments.

#### Step 1: Install Vercel Blob

```bash
npm install @vercel/blob
```

#### Step 2: Enable Vercel Blob in Dashboard

1. Go to your Vercel project
2. Navigate to "Storage" tab
3. Create a new Blob store
4. Copy the `BLOB_READ_WRITE_TOKEN` (automatically added to env vars)

#### Step 3: Update Upload Utility

Create `src/utils/cloudUpload.js`:

```javascript
import { put } from "@vercel/blob";

export async function uploadToBlob(file, folder = "events") {
  const filename = `${folder}/${Date.now()}-${file.originalname}`;

  const blob = await put(filename, file.buffer, {
    access: "public",
    contentType: file.mimetype,
  });

  return blob.url;
}
```

#### Step 4: Update Admin Controller

In `src/controllers/adminController.js`, replace file handling:

```javascript
import { uploadToBlob } from "../utils/cloudUpload.js";

// In your create/update event functions:
const imageUrls = [];
if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    const url = await uploadToBlob(file, "events");
    imageUrls.push(url);
  }
}
```

**Pricing**: Free tier includes 1GB storage and 100GB bandwidth

---

### Option 2: Cloudinary (Most Popular)

Cloudinary offers robust image management with transformations, optimizations, and CDN delivery.

#### Step 1: Install Cloudinary

```bash
npm install cloudinary multer-storage-cloudinary
```

#### Step 2: Setup Cloudinary Account

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret

#### Step 3: Add Environment Variables

In Vercel dashboard, add:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Step 4: Update Upload Utility

Replace `src/utils/upload.js`:

```javascript
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "solar-system-events",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1920, height: 1080, crop: "limit" }],
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB limit
  },
});
```

#### Step 5: Update Image Retrieval

Images will now have Cloudinary URLs like:
`https://res.cloudinary.com/your-cloud/image/upload/v1234567890/solar-system-events/event-123.jpg`

Store these URLs in MongoDB as before.

**Pricing**: Free tier includes 25GB storage and 25GB bandwidth/month

---

### Option 3: AWS S3 (Enterprise Grade)

For production applications requiring more control.

#### Step 1: Install AWS SDK

```bash
npm install @aws-sdk/client-s3 multer-s3
```

#### Step 2: Setup AWS

1. Create AWS account
2. Create S3 bucket
3. Create IAM user with S3 permissions
4. Get Access Key and Secret Key

#### Step 3: Add Environment Variables

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

#### Step 4: Update Upload Utility

```javascript
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = `events/${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
});
```

**Pricing**: Pay-as-you-go, ~$0.023 per GB/month for storage

---

## Comparison Table

| Feature              | Vercel Blob           | Cloudinary            | AWS S3             |
| -------------------- | --------------------- | --------------------- | ------------------ |
| **Setup Complexity** | ⭐ Easy               | ⭐⭐ Medium           | ⭐⭐⭐ Complex     |
| **Free Tier**        | 1GB / 100GB bandwidth | 25GB / 25GB bandwidth | 5GB / 20k requests |
| **Image Processing** | ❌ No                 | ✅ Yes                | ⚠️ Via Lambda      |
| **CDN**              | ✅ Built-in           | ✅ Built-in           | ⚠️ Via CloudFront  |
| **Best For**         | Quick deployment      | Image-heavy apps      | Enterprise apps    |
| **Integration**      | Native Vercel         | Good                  | Full control       |

## Migration Steps

### 1. Choose Your Solution

Based on your needs:

- **Quick MVP/Demo**: Vercel Blob
- **Production Image App**: Cloudinary
- **Enterprise/Custom**: AWS S3

### 2. Install Dependencies

```bash
npm install [chosen-package]
```

### 3. Update Code

- Replace `src/utils/upload.js` with cloud storage version
- Update controllers to use new upload URLs
- Test locally before deploying

### 4. Update Environment Variables

Add required credentials to Vercel dashboard

### 5. Update Database Schema

Ensure your Event model stores image URLs as strings:

```javascript
images: [{ type: String }]; // URLs from cloud storage
```

### 6. Migrate Existing Files (if any)

If you have existing uploads:

```bash
# Upload local files to cloud storage
node src/scripts/migrateUploads.js
```

### 7. Deploy and Test

```bash
vercel --prod
```

## Testing After Migration

Test file uploads:

```bash
curl -X POST https://your-backend.vercel.app/api/v1/admin/events \
  -H "Content-Type: multipart/form-data" \
  -F "title=Test Event" \
  -F "images=@test-image.jpg"
```

## Rollback Plan

If cloud storage fails:

1. Keep the current code (uses memory storage)
2. Files won't persist but app will work
3. Fix issues and redeploy

## Additional Resources

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Cloudinary Node.js Guide](https://cloudinary.com/documentation/node_integration)
- [AWS S3 SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html)

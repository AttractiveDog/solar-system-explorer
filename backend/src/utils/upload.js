import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Check if running on Vercel (serverless environment)
const isVercel = process.env.VERCEL === '1';

// Ensure uploads directory exists (only in non-serverless environments)
const uploadDir = 'uploads';
if (!isVercel && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Use memory storage for Vercel (temporary, stored in RAM)
// Use disk storage for local development
const storage = isVercel 
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: function (req, file, cb) {
        let folder = uploadDir;
        
        // Check if title exists in body (needs body parsing before file)
        if (req.body.title) {
          // Sanitize folder name
          const safeTitle = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
          folder = path.join(uploadDir, safeTitle);
          
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
          }
        }
        
        cb(null, folder);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
      }
    });

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    // Vercel has 4.5MB request body limit, so keep files smaller
    fileSize: isVercel ? 1024 * 1024 * 4 : 1024 * 1024 * 5 // 4MB on Vercel, 5MB locally
  }
});

// Helper function to check if we should use cloud storage
export const shouldUseCloudStorage = () => isVercel;

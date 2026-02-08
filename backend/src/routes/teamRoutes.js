import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    getTeamMembers,
    getTeamMemberById,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    restoreTeamMember,
    reorderTeamMembers,
} from '../controllers/teamController.js';
// adminAuth removed - no authentication required for admin panel

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/team-images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPEG, JPG, PNG, WEBP) are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Public routes
router.get('/team', getTeamMembers);
router.get('/team/:id', getTeamMemberById);

// Admin routes (authentication removed - publicly accessible)
router.post('/admin/team', upload.single('image'), createTeamMember);
router.put('/admin/team/:id', upload.single('image'), updateTeamMember);
router.delete('/admin/team/:id', deleteTeamMember);
router.patch('/admin/team/:id/restore', restoreTeamMember);
router.patch('/admin/team/reorder', reorderTeamMembers);

export default router;

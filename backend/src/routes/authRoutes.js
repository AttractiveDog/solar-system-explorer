import express from 'express';
import { syncFirebaseUser, getUserByFirebaseUid } from '../controllers/authController.js';

const router = express.Router();

/**
 * @route   POST /api/v1/auth/sync
 * @desc    Sync Firebase authenticated user with MongoDB
 * @access  Public
 */
router.post('/sync', syncFirebaseUser);

/**
 * @route   GET /api/v1/auth/firebase/:firebaseUid
 * @desc    Get user by Firebase UID
 * @access  Public
 */
router.get('/firebase/:firebaseUid', getUserByFirebaseUid);

export default router;

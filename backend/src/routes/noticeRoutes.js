import express from 'express';
import {
    getActiveNotices,
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice,
    toggleNoticeStatus
} from '../controllers/noticeController.js';

const router = express.Router();

// GET all active notices (public)
router.get('/', getActiveNotices);

// GET all notices (admin - includes inactive and expired)
router.get('/all', getAllNotices);

// GET single notice by ID
router.get('/:id', getNoticeById);

// CREATE new notice
router.post('/', createNotice);

// UPDATE notice
router.put('/:id', updateNotice);

// DELETE notice
router.delete('/:id', deleteNotice);

// TOGGLE notice active status
router.patch('/:id/toggle', toggleNoticeStatus);

export default router;

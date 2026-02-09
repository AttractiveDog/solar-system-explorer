import Notice from '../models/Notice.js';
import { ensureConnection } from '../config/database.js';

// @desc    Get all active notices (public)
// @route   GET /api/v1/notices
// @access  Public
export const getActiveNotices = async (req, res) => {
    try {
        await ensureConnection();
        const notices = await Notice.find({
            isActive: true,
            $or: [
                { expiresAt: null },
                { expiresAt: { $gt: new Date() } }
            ]
        })
            .sort({ priority: -1, order: 1, createdAt: -1 })
            .select('-__v');

        res.json({
            success: true,
            data: notices
        });
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notices',
            error: error.message
        });
    }
};

// @desc    Get all notices (admin - includes inactive and expired)
// @route   GET /api/v1/notices/all
// @access  Private (Admin)
export const getAllNotices = async (req, res) => {
    try {
        await ensureConnection();
        const notices = await Notice.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json({
            success: true,
            data: notices
        });
    } catch (error) {
        console.error('Error fetching all notices:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notices',
            error: error.message
        });
    }
};

// @desc    Get single notice by ID
// @route   GET /api/v1/notices/:id
// @access  Public
export const getNoticeById = async (req, res) => {
    try {
        await ensureConnection();
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: 'Notice not found'
            });
        }

        res.json({
            success: true,
            data: notice
        });
    } catch (error) {
        console.error('Error fetching notice:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notice',
            error: error.message
        });
    }
};

// @desc    Create new notice
// @route   POST /api/v1/notices
// @access  Private (Admin)
export const createNotice = async (req, res) => {
    try {
        await ensureConnection();
        const noticeData = {
            title: req.body.title,
            description: req.body.description,
            color: req.body.color || 'purple',
            priority: req.body.priority || 0,
            isActive: req.body.isActive !== undefined ? req.body.isActive : true,
            expiresAt: req.body.expiresAt || null,
            link: req.body.link || '',
            order: req.body.order || 0
        };

        const notice = new Notice(noticeData);
        await notice.save();

        res.status(201).json({
            success: true,
            message: 'Notice created successfully',
            data: notice
        });
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to create notice',
            error: error.message
        });
    }
};

// @desc    Update notice
// @route   PUT /api/v1/notices/:id
// @access  Private (Admin)
export const updateNotice = async (req, res) => {
    try {
        await ensureConnection();
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            priority: req.body.priority,
            isActive: req.body.isActive,
            expiresAt: req.body.expiresAt,
            link: req.body.link,
            order: req.body.order
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(key =>
            updateData[key] === undefined && delete updateData[key]
        );

        const notice = await Notice.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: 'Notice not found'
            });
        }

        res.json({
            success: true,
            message: 'Notice updated successfully',
            data: notice
        });
    } catch (error) {
        console.error('Error updating notice:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to update notice',
            error: error.message
        });
    }
};

// @desc    Delete notice
// @route   DELETE /api/v1/notices/:id
// @access  Private (Admin)
export const deleteNotice = async (req, res) => {
    try {
        await ensureConnection();
        const notice = await Notice.findByIdAndDelete(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: 'Notice not found'
            });
        }

        res.json({
            success: true,
            message: 'Notice deleted successfully',
            data: notice
        });
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete notice',
            error: error.message
        });
    }
};

// @desc    Toggle notice active status
// @route   PATCH /api/v1/notices/:id/toggle
// @access  Private (Admin)
export const toggleNoticeStatus = async (req, res) => {
    try {
        await ensureConnection();
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: 'Notice not found'
            });
        }

        notice.isActive = !notice.isActive;
        await notice.save();

        res.json({
            success: true,
            message: `Notice ${notice.isActive ? 'activated' : 'deactivated'} successfully`,
            data: notice
        });
    } catch (error) {
        console.error('Error toggling notice:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle notice status',
            error: error.message
        });
    }
};

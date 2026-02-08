import TeamMember from '../models/TeamMember.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimizeImage } from '../utils/imageOptimizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all team members (public endpoint)
export const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find({ isActive: true })
            .sort({ category: 1, order: 1 })
            .lean();

        // Group by category
        const grouped = {
            founders: teamMembers.filter(m => m.category === 'founder'),
            mentors: teamMembers.filter(m => m.category === 'mentor'),
            collegeSupport: teamMembers.filter(m => m.category === 'college-support'),
            coreTeam: teamMembers.filter(m => m.category === 'core-team'),
            graphics: teamMembers.filter(m => m.category === 'graphics'),
            management: teamMembers.filter(m => m.category === 'management'),
            members: {
                year1: teamMembers.filter(m => m.category === 'member' && m.year === '1st Year'),
                year2: teamMembers.filter(m => m.category === 'member' && m.year === '2nd Year'),
                year3: teamMembers.filter(m => m.category === 'member' && m.year === '3rd Year'),
                year4: teamMembers.filter(m => m.category === 'member' && m.year === '4th Year'),
            },
        };

        res.status(200).json({
            success: true,
            data: grouped,
        });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch team members',
            error: error.message,
        });
    }
};

// Get single team member by ID (public endpoint)
export const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamMember.findOne({ _id: id, isActive: true });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found',
            });
        }

        res.status(200).json({
            success: true,
            data: member,
        });
    } catch (error) {
        console.error('Error fetching team member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch team member',
            error: error.message,
        });
    }
};

// Create new team member (admin only)
export const createTeamMember = async (req, res) => {
    try {
        let imageName = 'placeholder.jpg';

        // Optimize image if uploaded
        if (req.file) {
            const filepath = path.join(__dirname, '../../uploads/team-images', req.file.filename);
            imageName = await optimizeImage(filepath, {
                maxWidth: 800,
                maxHeight: 800,
                quality: 85,
                format: 'webp',
            });
        }

        const memberData = {
            ...req.body,
            image: imageName,
        };

        // Auto-assign order number
        if (!memberData.order) {
            const lastMember = await TeamMember.findOne({ category: memberData.category })
                .sort({ order: -1 });
            memberData.order = lastMember ? lastMember.order + 1 : 0;
        }

        const member = await TeamMember.create(memberData);

        res.status(201).json({
            success: true,
            message: 'Team member created successfully',
            data: member,
        });
    } catch (error) {
        // Delete uploaded file if creation failed
        if (req.file) {
            const filepath = path.join(__dirname, '../../uploads/team-images', req.file.filename);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }

        console.error('Error creating team member:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to create team member',
            error: error.message,
        });
    }
};

// Update team member (admin only)
export const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamMember.findById(id);

        if (!member) {
            // Delete uploaded file if member not found
            if (req.file) {
                const filepath = path.join(__dirname, '../../uploads/team-images', req.file.filename);
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            }
            return res.status(404).json({
                success: false,
                message: 'Team member not found',
            });
        }

        // Handle image update
        if (req.file) {
            // Delete old image if not placeholder
            if (member.image && member.image !== 'placeholder.jpg') {
                const oldImagePath = path.join(__dirname, '../../uploads/team-images', member.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Optimize new image
            const filepath = path.join(__dirname, '../../uploads/team-images', req.file.filename);
            const optimizedName = await optimizeImage(filepath, {
                maxWidth: 800,
                maxHeight: 800,
                quality: 85,
                format: 'webp',
            });
            req.body.image = optimizedName;
        }

        // Update member
        Object.assign(member, req.body);
        await member.save();

        res.status(200).json({
            success: true,
            message: 'Team member updated successfully',
            data: member,
        });
    } catch (error) {
        // Delete uploaded file if update failed
        if (req.file) {
            const filepath = path.join(__dirname, '../../uploads/team-images', req.file.filename);
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }

        console.error('Error updating team member:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to update team member',
            error: error.message,
        });
    }
};

// Delete team member (soft delete - admin only)
export const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamMember.findById(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found',
            });
        }

        // Soft delete
        member.isActive = false;
        await member.save();

        res.status(200).json({
            success: true,
            message: 'Team member deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete team member',
            error: error.message,
        });
    }
};

// Restore soft-deleted member (admin only)
export const restoreTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await TeamMember.findById(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Team member not found',
            });
        }

        member.isActive = true;
        await member.save();

        res.status(200).json({
            success: true,
            message: 'Team member restored successfully',
            data: member,
        });
    } catch (error) {
        console.error('Error restoring team member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to restore team member',
            error: error.message,
        });
    }
};

// Reorder team members (admin only)
export const reorderTeamMembers = async (req, res) => {
    try {
        const { members } = req.body; // Array of { id, order }

        if (!Array.isArray(members)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request format. Expected array of members.',
            });
        }

        // Bulk update
        const updatePromises = members.map(({ id, order }) =>
            TeamMember.findByIdAndUpdate(id, { order }, { new: true })
        );

        await Promise.all(updatePromises);

        res.status(200).json({
            success: true,
            message: 'Team members reordered successfully',
        });
    } catch (error) {
        console.error('Error reordering team members:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reorder team members',
            error: error.message,
        });
    }
};

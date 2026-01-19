import { Achievement, UserAchievement } from '../models/Achievement.js';
import User from '../models/User.js';

// @desc    Get all achievements
// @route   GET /api/v1/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    
    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching achievements',
      error: error.message,
    });
  }
};

// @desc    Get single achievement
// @route   GET /api/v1/achievements/:id
// @access  Public
export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching achievement',
      error: error.message,
    });
  }
};

// @desc    Create new achievement
// @route   POST /api/v1/achievements
// @access  Public
export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    
    res.status(201).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating achievement',
      error: error.message,
    });
  }
};

// @desc    Update achievement
// @route   PUT /api/v1/achievements/:id
// @access  Public
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    res.status(200).json({
      success: true,
      data: achievement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating achievement',
      error: error.message,
    });
  }
};

// @desc    Delete achievement
// @route   DELETE /api/v1/achievements/:id
// @access  Public
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    // Remove from all users
    await UserAchievement.deleteMany({ achievement: achievement._id });

    res.status(200).json({
      success: true,
      data: {},
      message: 'Achievement deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting achievement',
      error: error.message,
    });
  }
};

// @desc    Get user's achievements
// @route   GET /api/v1/achievements/user/:userId
// @access  Public
export const getUserAchievements = async (req, res) => {
  try {
    const userAchievements = await UserAchievement.find({
      user: req.params.userId,
    }).populate('achievement');

    res.status(200).json({
      success: true,
      count: userAchievements.length,
      data: userAchievements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user achievements',
      error: error.message,
    });
  }
};

// @desc    Unlock achievement for user
// @route   POST /api/v1/achievements/:id/unlock
// @access  Public
export const unlockAchievement = async (req, res) => {
  try {
    const { userId } = req.body;
    const achievementId = req.params.id;

    // Check if achievement exists
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found',
      });
    }

    // Check if already unlocked
    const existing = await UserAchievement.findOne({
      user: userId,
      achievement: achievementId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Achievement already unlocked',
      });
    }

    // Create user achievement
    const userAchievement = await UserAchievement.create({
      user: userId,
      achievement: achievementId,
    });

    // Add points to user
    await User.findByIdAndUpdate(userId, {
      $inc: { 'stats.points': achievement.points },
      $push: { achievements: achievementId },
    });

    res.status(201).json({
      success: true,
      data: userAchievement,
      message: 'Achievement unlocked successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error unlocking achievement',
      error: error.message,
    });
  }
};

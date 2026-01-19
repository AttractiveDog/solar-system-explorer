import Club from '../models/Club.js';
import User from '../models/User.js';

// @desc    Get all clubs
// @route   GET /api/v1/clubs
// @access  Public
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate('members.user', 'username avatar')
      .populate('createdBy', 'username');
    
    res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clubs',
      error: error.message,
    });
  }
};

// @desc    Get single club
// @route   GET /api/v1/clubs/:id
// @access  Public
export const getClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('members.user', 'username avatar stats')
      .populate('createdBy', 'username avatar');
    
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching club',
      error: error.message,
    });
  }
};

// @desc    Create new club
// @route   POST /api/v1/clubs
// @access  Public
export const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    
    // Add creator as admin member
    club.members.push({
      user: req.body.createdBy,
      role: 'admin',
    });
    await club.save();

    // Add club to user's clubs array
    await User.findByIdAndUpdate(
      req.body.createdBy,
      { $push: { clubs: club._id } }
    );

    res.status(201).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating club',
      error: error.message,
    });
  }
};

// @desc    Update club
// @route   PUT /api/v1/clubs/:id
// @access  Public
export const updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating club',
      error: error.message,
    });
  }
};

// @desc    Delete club
// @route   DELETE /api/v1/clubs/:id
// @access  Public
export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    // Remove club from all users
    await User.updateMany(
      { clubs: club._id },
      { $pull: { clubs: club._id } }
    );

    res.status(200).json({
      success: true,
      data: {},
      message: 'Club deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting club',
      error: error.message,
    });
  }
};

// @desc    Join a club
// @route   POST /api/v1/clubs/:id/join
// @access  Public
export const joinClub = async (req, res) => {
  try {
    const { userId } = req.body;
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    // Check if user is already a member
    const isMember = club.members.some(
      member => member.user.toString() === userId
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member',
      });
    }

    // Add user to club
    club.members.push({ user: userId, role: 'member' });
    await club.save();

    // Add club to user
    await User.findByIdAndUpdate(
      userId,
      { $push: { clubs: club._id } }
    );

    res.status(200).json({
      success: true,
      data: club,
      message: 'Successfully joined club',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error joining club',
      error: error.message,
    });
  }
};

// @desc    Leave a club
// @route   POST /api/v1/clubs/:id/leave
// @access  Public
export const leaveClub = async (req, res) => {
  try {
    const { userId } = req.body;
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    // Remove user from club
    club.members = club.members.filter(
      member => member.user.toString() !== userId
    );
    await club.save();

    // Remove club from user
    await User.findByIdAndUpdate(
      userId,
      { $pull: { clubs: club._id } }
    );

    res.status(200).json({
      success: true,
      data: club,
      message: 'Successfully left club',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error leaving club',
      error: error.message,
    });
  }
};

import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Club from '../models/Club.js';
import Event from '../models/Event.js';
import { Achievement } from '../models/Achievement.js';

// @desc    Admin login
// @route   POST /api/v1/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password',
      });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Admin account is deactivated',
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Return success (in production, you'd generate JWT token here)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/v1/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalClubs, totalEvents, totalAchievements] = await Promise.all([
      User.countDocuments(),
      Club.countDocuments(),
      Event.countDocuments(),
      Achievement.countDocuments(),
    ]);

    const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });
    const activeUsers = await User.countDocuments({ 
      'joinedDate': { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalClubs,
        totalEvents,
        totalAchievements,
        upcomingEvents,
        activeUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message,
    });
  }
};

// @desc    Get all users with pagination
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
export const getAllUsersAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-__v')
      .populate('clubs', 'name')
      .populate('achievements', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// @desc    Get single user
// @route   GET /api/v1/admin/users/:id
// @access  Private (Admin)
export const getUserByIdAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-__v')
      .populate('clubs', 'name')
      .populate('achievements', 'title');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// @desc    Get all clubs with pagination
// @route   GET /api/v1/admin/clubs
// @access  Private (Admin)
export const getAllClubsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const clubs = await Club.find()
      .select('-__v')
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Club.countDocuments();

    res.status(200).json({
      success: true,
      count: clubs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
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
// @route   GET /api/v1/admin/clubs/:id
// @access  Private (Admin)
export const getClubByIdAdmin = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('members.user', 'username email')
      .populate('createdBy', 'username email');

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

// @desc    Get single event
// @route   GET /api/v1/admin/events/:id
// @access  Private (Admin)
export const getEventByIdAdmin = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('club', 'name')
      .populate('createdBy', 'username email')
      .populate('participants', 'username email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message,
    });
  }
};

// @desc    Get all events with pagination
// @route   GET /api/v1/admin/events
// @access  Private (Admin)
export const getAllEventsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find()
      .select('-__v')
      .populate('club', 'name')
      .populate('createdBy', 'username email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments();

    res.status(200).json({
      success: true,
      count: events.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Private (Admin)
export const deleteUserAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

// @desc    Delete club
// @route   DELETE /api/v1/admin/clubs/:id
// @access  Private (Admin)
export const deleteClubAdmin = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    await club.deleteOne();

    res.status(200).json({
      success: true,
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

// @desc    Delete event
// @route   DELETE /api/v1/admin/events/:id
// @access  Private (Admin)
export const deleteEventAdmin = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message,
    });
  }
};

// @desc    Update user
// @route   PUT /api/v1/admin/users/:id
// @access  Private (Admin)
export const updateUserAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// @desc    Update club
// @route   PUT /api/v1/admin/clubs/:id
// @access  Private (Admin)
export const updateClubAdmin = async (req, res) => {
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
      message: 'Club updated successfully',
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating club',
      error: error.message,
    });
  }
};

// @desc    Update event
// @route   PUT /api/v1/admin/events/:id
// @access  Private (Admin)
export const updateEventAdmin = async (req, res) => {
  try {
    // Process participants if provided
    if (req.body.participants) {
      let participantEmails = [];
      if (typeof req.body.participants === 'string') {
        participantEmails = req.body.participants.split(',').map(email => email.trim());
      } else if (Array.isArray(req.body.participants)) {
        participantEmails = req.body.participants;
      }

      if (participantEmails.length > 0) {
        const users = await User.find({ email: { $in: participantEmails } });
        const participantIds = users.map(user => user._id);
        req.body.participants = participantIds;

        // Add event to these users' events array
         await User.updateMany(
          { _id: { $in: participantIds } },
          { $addToSet: { events: req.params.id } }
        );
      }
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating event',
      error: error.message,
    });
  }
};

// @desc    Create new club
// @route   POST /api/v1/admin/clubs
// @access  Private (Admin)
export const createClubAdmin = async (req, res) => {
  try {
    const { name, description, icon, color, gradient, category, createdBy } = req.body;

    // Validate required fields
    if (!name || !description || !icon || !color || !gradient || !createdBy) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if club name already exists
    const clubExists = await Club.findOne({ name });
    if (clubExists) {
      return res.status(400).json({
        success: false,
        message: 'Club name already exists',
      });
    }

    // Create club
    const club = await Club.create({
      name,
      description,
      icon,
      color,
      gradient,
      category: category || 'other',
      createdBy,
      members: [{
        user: createdBy,
        role: 'admin',
      }]
    });

    // Add club to user's clubs array
    await User.findByIdAndUpdate(
      createdBy,
      { $push: { clubs: club._id } }
    );

    res.status(201).json({
      success: true,
      data: club,
      message: 'Club created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating club',
      error: error.message,
    });
  }
};

// @desc    Create new event
// @route   POST /api/v1/admin/events
// @access  Private (Admin)
export const createEventAdmin = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      club, 
      date, 
      time, 
      duration, 
      location, 
      venue, 
      meetingLink, 
      maxParticipants, 
      createdBy 
    } = req.body;

    // Validate required fields
    if (!title || !description || !club || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if club exists
    const clubDoc = await Club.findById(club);
    if (!clubDoc) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    // Process participants (expecting comma-separated emails or array of emails)
    let participantIds = [];
    if (req.body.participants) {
      let participantEmails = [];
      if (typeof req.body.participants === 'string') {
        participantEmails = req.body.participants.split(',').map(email => email.trim());
      } else if (Array.isArray(req.body.participants)) {
        participantEmails = req.body.participants;
      }

      if (participantEmails.length > 0) {
        const users = await User.find({ email: { $in: participantEmails } });
        participantIds = users.map(user => user._id);
      }
    }

    // Create event
    const event = await Event.create({
      title,
      description,
      club,
      date,
      time,
      duration: duration || 60,
      location: location || 'online',
      venue,
      meetingLink,
      maxParticipants: maxParticipants || null,
      participants: participantIds,
      createdBy: createdBy || clubDoc.createdBy,
      status: 'upcoming'
    });

    // Add event to users' events array
    if (participantIds.length > 0) {
      await User.updateMany(
        { _id: { $in: participantIds } },
        { $addToSet: { events: event._id } }
      );
    }

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: error.message,
    });
  }
};

import Event from '../models/Event.js';
import User from '../models/User.js';

// @desc    Get all events
// @route   GET /api/v1/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { status, club } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (club) filter.club = club;

    const events = await Event.find(filter)
      .populate('club', 'name icon color')
      .populate('participants', 'username avatar')
      .populate('createdBy', 'username')
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
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

// @desc    Get single event
// @route   GET /api/v1/events/:id
// @access  Public
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('club')
      .populate('participants', 'username displayName avatar photoURL stats')
      .populate('createdBy', 'username avatar');

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

// @desc    Create new event
// @route   POST /api/v1/events
// @access  Public
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating event',
      error: error.message,
    });
  }
};

// @desc    Update event
// @route   PUT /api/v1/events/:id
// @access  Public
export const updateEvent = async (req, res) => {
  try {
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
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating event',
      error: error.message,
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/v1/events/:id
// @access  Public
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
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

// @desc    Register for an event
// @route   POST /api/v1/events/:id/register
// @access  Public
export const registerForEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if event is full
    if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full',
      });
    }

    // Check if user is already registered
    if (event.participants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already registered',
      });
    }

    event.participants.push(userId);
    await event.save();

    res.status(200).json({
      success: true,
      data: event,
      message: 'Successfully registered for event',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error registering for event',
      error: error.message,
    });
  }
};

// @desc    Unregister from an event
// @route   POST /api/v1/events/:id/unregister
// @access  Public
export const unregisterFromEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    event.participants = event.participants.filter(
      id => id.toString() !== userId
    );
    await event.save();

    res.status(200).json({
      success: true,
      data: event,
      message: 'Successfully unregistered from event',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error unregistering from event',
      error: error.message,
    });
  }
};

// @desc    Get upcoming events
// @route   GET /api/v1/events/upcoming
// @access  Public
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() },
      status: 'upcoming',
    })
      .populate('club', 'name icon color')
      .populate('participants', 'username avatar')
      .sort({ date: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming events',
      error: error.message,
    });
  }
};

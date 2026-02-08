import User from '../models/User.js';
import Admin from '../models/Admin.js';
import AllowedEmail from '../models/AllowedEmail.js';

/**
 * Sync Firebase user with MongoDB
 * Creates or updates user from Firebase authentication
 */
export const syncFirebaseUser = async (req, res) => {
  try {
    const { firebaseUid, email, displayName, photoURL, provider } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({
        success: false,
        message: 'Firebase UID and email are required',
      });
    }

    // Check if user exists by Firebase UID
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // Check if user exists by email (migration case)
      user = await User.findOne({ email });

      if (user) {
        // Update existing user with Firebase data
        user.firebaseUid = firebaseUid;
        user.displayName = displayName || user.displayName;
        user.photoURL = photoURL || user.photoURL;
        user.provider = provider || user.provider;

        // Use photoURL as avatar if not set
        if (photoURL && !user.avatar) {
          user.avatar = photoURL;
        }

        await user.save();
      } else {
        // Create new user
        // Check if email is in the allowed list
        const isAllowed = await AllowedEmail.findOne({ email });

        if (!isAllowed) {
          return res.status(403).json({
            success: false,
            message: 'Email not authorized for registration. Please contact administrator.',
          });
        }

        const username = email.split('@')[0] + '_' + Date.now(); // Generate unique username

        user = await User.create({
          firebaseUid,
          username,
          email,
          displayName: displayName || username,
          photoURL,
          avatar: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          provider: provider || 'google',
          stats: {
            rank: 'Voyager',
            points: 0,
            contributions: 0,
            projects: 0,
          },
        });
      }
    } else {
      // Update existing Firebase user
      user.displayName = displayName || user.displayName;
      user.photoURL = photoURL || user.photoURL;

      if (photoURL && (!user.avatar || user.avatar.includes('dicebear'))) {
        user.avatar = photoURL;
      }

      await user.save();
    }

    // Populate related data
    await user.populate('clubs achievements');

    res.status(200).json({
      success: true,
      data: user,
      message: 'User synced successfully',
    });
  } catch (error) {
    console.error('Error syncing Firebase user:', error);
    res.status(500).json({
      success: false,
      message: 'Error syncing user',
      error: error.message,
    });
  }
};

/**
 * Get user by Firebase UID
 */
export const getUserByFirebaseUid = async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const user = await User.findOne({ firebaseUid })
      .populate('clubs')
      .populate('achievements');

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
    console.error('Error fetching user by Firebase UID:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};


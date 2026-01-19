import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  avatar: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  stats: {
    rank: {
      type: String,
      default: 'Voyager',
      enum: ['Voyager', 'Explorer', 'Navigator', 'Pioneer', 'Legend']
    },
    points: {
      type: Number,
      default: 0,
    },
    contributions: {
      type: Number,
      default: 0,
    },
    projects: {
      type: Number,
      default: 0,
    },
  },
  social: {
    github: String,
    linkedin: String,
    website: String,
  },
  clubs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  }],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  joinedDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for performance
userSchema.index({ username: 1, email: 1 });

export default mongoose.model('User', userSchema);

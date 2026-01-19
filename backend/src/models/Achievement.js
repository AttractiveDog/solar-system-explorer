import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['contribution', 'participation', 'skill', 'leadership', 'milestone'],
    default: 'milestone',
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common',
  },
  points: {
    type: Number,
    default: 10,
  },
  criteria: {
    type: mongoose.Schema.Types.Mixed, // Flexible criteria object
  },
}, {
  timestamps: true,
});

const userAchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  achievement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true,
  },
  unlockedAt: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 100, // Percentage
  },
}, {
  timestamps: true,
});

// Compound index to ensure user can't unlock same achievement twice
userAchievementSchema.index({ user: 1, achievement: 1 }, { unique: true });

export const Achievement = mongoose.model('Achievement', achievementSchema);
export const UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);

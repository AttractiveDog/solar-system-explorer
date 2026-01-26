import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: {
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
  color: {
    type: String,
    required: true,
  },
  gradient: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['development', 'design', 'data', 'business', 'other'],
    default: 'other',
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'admin'],
      default: 'member',
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Virtual for member count
clubSchema.virtual('memberCount').get(function() {
  return this.members ? this.members.length : 0;
});

// Ensure virtuals are included when converting to JSON
clubSchema.set('toJSON', { virtuals: true });
clubSchema.set('toObject', { virtuals: true });

export default mongoose.model('Club', clubSchema);

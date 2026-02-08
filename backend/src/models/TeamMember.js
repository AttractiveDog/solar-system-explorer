import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['founder', 'mentor', 'college-support', 'core-team', 'graphics', 'management', 'member'],
            message: '{VALUE} is not a valid category'
        },
    },
    year: {
        type: String,
        trim: true,
        // Only required for 'member' category
    },
    branch: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: 'placeholder.jpg',
    },
    bio: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },
    github: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['online', 'away', 'offline'],
        default: 'offline',
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Index for efficient queries
teamMemberSchema.index({ category: 1, order: 1 });
teamMemberSchema.index({ isActive: 1 });

// Virtual for full image URL
teamMemberSchema.virtual('imageUrl').get(function () {
    return this.image ? `/uploads/team-images/${this.image}` : '/uploads/team-images/placeholder.jpg';
});

// Ensure virtuals are included in JSON
teamMemberSchema.set('toJSON', { virtuals: true });
teamMemberSchema.set('toObject', { virtuals: true });

export default mongoose.model('TeamMember', teamMemberSchema);

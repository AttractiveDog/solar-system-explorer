import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    color: {
        type: String,
        enum: ['purple', 'cyan', 'orange', 'green', 'blue', 'red'],
        default: 'purple'
    },
    priority: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date,
        default: null
    },
    link: {
        type: String,
        trim: true,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for efficient querying
noticeSchema.index({ isActive: 1, createdAt: -1 });
noticeSchema.index({ expiresAt: 1 });

// Virtual for checking if notice is expired
noticeSchema.virtual('isExpired').get(function () {
    return this.expiresAt && this.expiresAt < new Date();
});

// Method to check if notice should be displayed
noticeSchema.methods.shouldDisplay = function () {
    return this.isActive && (!this.expiresAt || this.expiresAt > new Date());
};

export default mongoose.model('Notice', noticeSchema);

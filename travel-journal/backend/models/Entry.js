const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    photos: [{
      url: String,
      caption: String,
    }],
    mood: {
      type: String,
      enum: ['amazing', 'good', 'okay', 'bad'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    tags: [String],
  },
  { timestamps: true }
);

// Index for user queries
entrySchema.index({ userId: 1, startDate: -1 });

module.exports = mongoose.model('Entry', entrySchema);

const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
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
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Entry', entrySchema);

const mongoose = require('mongoose');

const monitoredServiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    pingIntervalMinutes: {
      type: Number,
      default: 15, // free tier default; paid tier can go lower (e.g. 5)
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastPingStatus: {
      type: String,
      enum: ['up', 'down', 'unknown'],
      default: 'unknown',
    },
    lastPingAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MonitoredService', monitoredServiceSchema);

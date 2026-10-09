const mongoose = require('mongoose');

const pingLogSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonitoredService',
    required: true,
  },
  status: {
    type: String,
    enum: ['up', 'down'],
    required: true,
  },
  responseTimeMs: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Auto-expire logs after 30 days to keep the free-tier database small
pingLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = mongoose.model('PingLog', pingLogSchema);

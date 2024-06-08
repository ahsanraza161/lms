const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  object: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);

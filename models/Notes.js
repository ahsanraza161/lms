const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  // courseId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Course', // Assuming you have a Course model
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  // accessLevel: {
  //   type: String,
  //   enum: ['public', 'course', 'private'], // Different visibility levels
  //   default: 'private',
  // },
});

module.exports = mongoose.model('Note', NoteSchema);

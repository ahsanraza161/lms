const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  downloadURL: {
    type: String,
    required: true,
  },
  tutorialLink: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;

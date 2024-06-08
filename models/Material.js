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
  attachment: {
    type: String, // Assuming you'll store the path or URL to the uploaded file
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

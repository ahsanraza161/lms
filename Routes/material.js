const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const Course = require('../models/Course');

// @route POST api/courses/:courseId/materials
// @Desc Add a Material to a Course
// @access private (modify based on your authentication middleware)
router.post('/:courseId/upload', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, date, tutorialLink, downloadURL } = req.body;
    console.log('Received data:', req.body); // Log the received data


    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Validate downloadURL to ensure it points to your Firebase Storage bucket

    const newMaterial = new Material({
      title,
      date,
      downloadURL,
      tutorialLink,
      course: courseId,
    });

    const savedMaterial = await newMaterial.save();
    return res.status(201).json(savedMaterial);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

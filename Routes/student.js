const express = require('express');
require('dotenv').config();
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const auth = require('../Middlewares/auth');

// @route POST api/courses
// @Describe get courses of students
// @access private
router.get('/', auth, async (req, res) => {
  const id = req.user.id;
  try {
    const student = await Student.findById(id);

    // Get the course IDs associated with the student
    const courseIds = student.courses;

    // Find all courses with the retrieved IDs
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Return the courses associated with the student
    return res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route GET api/users
// @describe Get Teacher data
// @access private
router.get('/getteacherdata', auth, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await Student.findById(id)
      .select('-password')
      .populate('course');

    const course = await Course.findById(user.course);

    return res.status(200).json({ course, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
});

module.exports = router;

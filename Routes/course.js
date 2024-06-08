const express = require('express');
require('dotenv').config();
const router = express.Router();
const Course = require('../models/Course');
const Student = require('../models/Student');
const Activity = require('../models/Activity.js');
const auth = require('../Middlewares/auth');

// @route GET api/courses
// @Describe Get all Courses
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: 'students',
      model: 'Students', // Assuming 'Student' is the name of your student model
    });
    return res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route POST api/courses
// @Describe Add a Course
// @access private
router.post('/', auth, async (req, res) => {
  try {
    const adminid = req.user.id;
    const { name, teacher, teacher_id, start_date, classes_days, total_days } =
      req.body;

    let course = new Course({
      name,
      teacher,
      start_date,
      classes_days,
      total_days,
    });

    course = await course.save();

    let Teacher = await Student.findByIdAndUpdate(teacher_id, {
      course: course._id,
    });

    // Capture Activity;
    const admin = await Student.findById(adminid).select('-password');
    const newActivity = new Activity({
      name: admin.name,
      action: 'created a course of',
      object: name,
    });

    await newActivity.save();

    return res.status(200).json({ course, Teacher });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route POST api/courses
// @Describe Add a Course in students and courses field
// @access private
router.post('/addcourse', auth, async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const adminid = req.user.id;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { courses: courseId } }, // Use $addToSet to avoid adding duplicates
      { new: true }
    );
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'course not found' });
    }
    // Update the courses model with the student ID
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } }, // Use $addToSet to avoid adding duplicates
      { new: true }
    );

    res.json({ student: updatedStudent, course: updatedCourse });
  } catch (err) {
    console.error(err);

    // Capture Activity;
    const admin = await Student.findById(adminid).select('-password');
    const newActivity = new Activity({
      name: admin.name,
      action: 'added a course of',
      object: studen,
    });

    await newActivity.save();
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route DELETE api/courses
// @Describe Delete a Course
// @access private
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id);

    res.status(200).json({ msg: 'Course Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @Describe Delete Student from  Course
// @access private
router.delete('/deletestudent/:courseId/:studentId', async (req, res) => {
  const { courseId, studentId } = req.params;
  try {
    // Update the student document to remove the courseId from the courses array
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { courses: courseId } },
      { new: true }
    );

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: studentId } },
      { new: true }
    );

    return res.status(200).json({ updatedStudent, updatedCourse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

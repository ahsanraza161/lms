const express = require('express');
require('dotenv').config();
const router = express.Router();
const sendMail = require('../utils/sendmail');
const auth = require('../Middlewares/auth');
const { requestAcceptedEmail } = require('../utils/emails');

const Student = require('../models/Student');
const Course = require('../models/Course');
const Activity = require('../models/Activity.js');

// @route GET api/admin/pending
// @describe Get all Users with status pending
// @access private
router.get('/pending', auth, async (req, res) => {
  try {
    const students = await Student.find({
      status: 'pending',
    })
      .sort({
        created_at: -1,
      })
      .select('-password');
    res.json(students);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});
// @route GET api/admin/getteacher
// @describe Get all teacher with status approved
// @access private
router.get('/getteacher', auth, async (req, res) => {
  try {
    const teacher = await Student.find({
      usertype: 'Faculty',
      status: 'approved',
    });
    return res.status(200).json(teacher);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

// @route GET api/admin/approved
// @describe Get all Students with status approved
// @access private
router.get('/approved', auth, async (req, res) => {
  try {
    const students = await Student.find({
      status: 'approved',
      usertype: 'Student', // Assuming you have a field called userType
    })
      .populate({
        path: 'courses',
        model: 'Courses',
      })
      .sort({ created_at: -1 })
      .select('-password');

    return res.status(200).json(students);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

// @route GET api/admin/getNumbers
// @describe Get all Numbers
// @access private
router.get('/getNumbers', auth, async (req, res) => {
  try {
    const students = await Student.find({
      usertype: 'Student',
      status: 'approved',
    });
    const teachers = await Student.find({
      usertype: 'Faculty',
      status: 'approved',
    });
    const courses = await Course.find();
    return res.status(200).json({
      students: students.length,
      teachers: teachers.length,
      courses: courses.length,
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

// @route PATCH api/admin/:id
// @describe Change the Student status from pending to approved
// @access private
router.patch('/:id', auth, async (req, res) => {
  try {
    const adminid = req.user.id;
    const id = req.params.id; // Retrieve the id parameter from the URL
    const student = await Student.findById(id).select('-password');

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Update the status
    student.status = 'approved';

    // Save the updated student
    await student.save();

    await sendMail(
      'Request Accepted',
      requestAcceptedEmail(student.name),
      student.email
    );

    // Capture Activity
    const admin = await Student.findById(adminid).select('-password');
    const newActivity = new Activity({
      name: admin.name,
      action: 'changed the status from pending to approved',
      object: student.name,
    });

    await newActivity.save();

    return res
      .status(200)
      .json({ msg: 'Email Successfully Sent and Activity also captured' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

// @route DELETE api/admin
// @describe Delete the students
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const adminid = req.user.id;
    const student = await Student.findById(id).select('-password');

    await Student.findByIdAndDelete(id);

    // Capture Activity;
    const admin = await Student.findById(adminid).select('-password');
    const newActivity = new Activity({
      name: admin.name,
      action: 'deleted the student',
      object: student.name,
    });

    await newActivity.save();
    return res
      .status(200)
      .json({ msg: 'Deleted successfully and Activity also captured' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});
// @route DELETE api/admin
// @describe Delete the students
// @access private
router.delete('/teacher/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const adminid = req.user.id;
    const student = await Student.findById(id).select('-password');

    await Student.findByIdAndDelete(id);

    // Capture Activity;
    const admin = await Student.findById(adminid).select('-password');
    const newActivity = new Activity({
      name: admin.name,
      action: 'deleted the faculty',
      object: student.name,
    });

    await newActivity.save();
    return res
      .status(200)
      .json({ msg: 'Deleted successfully and Activity also captured' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

module.exports = router;

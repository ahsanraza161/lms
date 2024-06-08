const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../Middlewares/auth');

const Student = require('../models/Student');

// @route POST api/users
// @describe Login User
// @access public
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: 'User does not exist' });
    } else if (student.status === 'pending') {
      return res.status(400).json({
        msg: 'Your account request has been sent to admin, You cannot login now',
      });
    }
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Password Incorrect' });
    }

    const payload = {
      student: {
        id: student.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtsecret,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ msg: 'Server error' });
        }
        // If no error, token is generated successfully
        return res.status(200).json({ token, usertype: student.usertype });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route GET api/users
// @describe Get User data
// @access private
router.get('/', auth, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await Student.findById(id).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
});

// @route GET api/users
// @describe Update User data
// @access private
router.put('/', auth, async (req, res) => {
  const id = req.user.id;
  const {
    name,
    fatherName,
    dateOfBirth,
    gender,
    cnic,
    address,
    qualification,
    subject,
    completionYear,
    universityCollege,
    email,
  } = req.body;
  try {
    const userFields = {
      name,
      fatherName,
      dateOfBirth,
      gender,
      cnic,
      address,
      qualification,
      subject,
      completionYear,
      universityCollege,
      email,
    };

    let user = await Student.findById(id).select('-password'); // Excluding password field

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    user = await Student.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true }
    ).select('-password'); // Excluding password field

    return res.json({ msg: 'User updated', user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err });
  }
});



module.exports = router;

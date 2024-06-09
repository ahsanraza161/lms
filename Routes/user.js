const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const crypto = require('crypto');
const sendMail = require('../utils/sendmail');
const Student = require('../models/Student');
const { requestSentEmail, forgotPasswordEmail } = require('../utils/emails');

// @route POST api/users
// @describe Register a new User
// @access public
router.post('/', async (req, res) => {
  const {
    usertype,
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
    password,
  } = req.body;
  try {
    // Check for existing student with email
    const student = await Student.findOne({ email });
    if (student) {
      return res.status(400).send({ message: 'User already exist' });
    }

    // Hash password securely
    const saltRounds = 10; // Adjust based on security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new user
    const newStudent = new Student({
      usertype,
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
      password: hashedPassword,
      status: 'pending',
    });

    await newStudent.save();

    await sendMail('Request Sent to Admin', requestSentEmail(name), email);

    return res.status(200).json({ msg: 'Your request has been send to admin' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

// @route POST api/users
// @describe Forgot Password
// @access public
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Student.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "user with this email doesn't exist" });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetTokenExpiry = Date.now() + 3600 * 1000;

    await user.save();

    const resetLink = `https://kit=-lms.vercel.app/resetpassword/${resetToken}`;

    try {
      await sendMail(
        'Reset Password',
        forgotPasswordEmail(user.name, resetLink),
        email
      );
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save();
      console.error(err);
      return res.status(500).json({ msg: err });
    }

    return res.status(200).json({ msg: 'Email has been Successfully sent' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
});

// @route POST api/users
// @describe Reset Password
// @access public
router.put('/:passwordResetToken', async (req, res) => {
  const { passwordResetToken } = req.params;
  const { password, confirmPassword } = req.body;
  try {
    const token = crypto
      .createHash('sha256')
      .update(passwordResetToken)
      .digest('hex');

    const user = await Student.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.status(400).json({ msg: 'Token error' });
    }
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "password doesn't match" });
    }

    // Hash password securely
    const saltRounds = 10; // Adjust based on security needs
    user.password = await bcrypt.hash(password, saltRounds);

    await user.save();

    return res.status(200).json({ msg: 'Password Successfuly changed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

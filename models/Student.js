const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  usertype: String,
  name: String,
  fatherName: String,
  dateOfBirth: String,
  gender: String,
  cnic: String,
  address: String,
  qualification: String,
  subject: String,
  completionYear: Number,
  universityCollege: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  status: {
    type: String,
    enum: ['pending', 'approved'],
    required: true,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiry: {
    type: Date,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  course: {
    type: String,
  },
});

const User = mongoose.model('Students', StudentSchema);
module.exports = User;

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.sender,
    pass: process.env.apppass,
  },
});

async function sendMail(subject, text, to) {
  if (!subject || !text) {
    console.error('Subject and text are required to send an email');
    return; // Do not proceed if subject or text is missing
  }

  var mailOptions = {
    from: process.env.sender,
    //! Change
    to: to || 'mhuzaif523@gmail.com',
    subject: subject,
    html: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = sendMail;

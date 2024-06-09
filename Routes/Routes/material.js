const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname.toLowerCase().split(' ').join('-');
    const extension = path.extname(file.originalname);
    cb(null, originalName + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();
const Material = require('../models/Material');
const Course = require('../models/Course');

// Serve static files from the "uploads" directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// @route POST api/courses/:courseId/materials
// @Describe Add a Material to a Course
// @access private (modify based on your authentication middleware)
router.post('/:courseId/upload', upload.single('attachment'), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, date, tutorialLink } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const attachment = req.file ? req.file.filename : ''; // Store only the filename
    const newMaterial = new Material({
      title,
      date,
      attachment,
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

// @route GET api/courses/:courseId
// @Describe Get all Materials for a Course
// @access public (modify based on your authentication middleware)
router.get('/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const materials = await Material.find({ course: courseId });

    const materialsWithUrls = materials.map(material => ({
      ...material._doc,
      attachment: material.attachment ? `${req.protocol}://${req.get('host')}/api/materials/download/${material.attachment}` : ''
    }));

    return res.status(200).json(materialsWithUrls);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// @route GET api/materials/download/:filename
// @Describe Download or view an attachment
// @access public (modify based on your authentication middleware)
router.get('/download/:filename', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    const fileStream = fs.createReadStream(filePath);

    const mimeType = mime.lookup(filePath); // Use mime.lookup() to get the MIME type
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);

    fileStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const Activity = require('../models/Activity');

const router = express.Router();

// @route POST /api/admin/activity
// @describe Capture activity in admin panel
// @access private
router.post('/', async (req, res) => {
  try {
    console.log('api hits')
    const { userId, action, details = {} } = req.body;
    const activityLog = new Activity({
      userId,
      action,
      timestamp: Date.now(),
      ...details,
    });
    await activityLog.save();
    console.log(`Activity captured: ${userId} performed ${action}`);
    res.status(201).json({ message: 'Activity captured successfully' });
  } catch (err) {
    console.error('Error capturing activity:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route GET /api/admin/activity
// @describe Get activity data
// @access private
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find({}).sort({ timestamp: -1 }); // Sort by timestamp in descending order
    res.status(200).json(activities);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

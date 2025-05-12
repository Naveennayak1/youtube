const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// GET /api/videos?search=react&category=Education
router.get('/', async (req, res) => {
  try {
    const { search = '', category = '' } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    const videos = await Video.find(filter).limit(50); // limit for performance

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

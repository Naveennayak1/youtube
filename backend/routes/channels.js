const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');
const authMiddleware = require('../middleware/authMiddleware');

// Create channel (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const channel = new Channel({ ...req.body, owner: req.user.userId });
    await channel.save();
    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get channel by ID
router.get('/:id', async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('videos');
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

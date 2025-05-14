const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Video = require('../models/Video');
const authMiddleware = require('../middleware/authMiddleware');
const Channel = require('../models/Channel');

// Get videos with optional search and category filter
router.get('/', async (req, res) => {
  try {
    const { search = '', category = '' } = req.query;
    let filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (category && category !== 'All') filter.category = category;

    const videos = await Video.find(filter).limit(50);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get video by ID with ObjectId validation
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const video = await Video.findById(id)
      .populate('channelId', 'channelName')
      .populate('uploader', 'username');

    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create video (protected)
// Create video (protected)
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const video = new Video(req.body);
    await video.save();

    // Update channel videos array
    await Channel.findByIdAndUpdate(video.channelId, {
      $push: { videos: video._id },
    });

    res.status(201).json(video);
  } catch (err) {
    next(err); // Pass error to centralized error handler
  }
});

// Update video (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete video (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Like video
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.likes++;
    await video.save();
    res.json({ likes: video.likes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Dislike video
router.post('/:id/dislike', authMiddleware, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.dislikes++;
    await video.save();
    res.json({ dislikes: video.dislikes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

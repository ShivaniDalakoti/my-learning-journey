const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const { authMiddleware } = require('../middleware/auth');

// Get all entries for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.userId })
      .sort({ startDate: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single entry
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    // Check ownership
    if (entry.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create entry
router.post('/', authMiddleware, async (req, res) => {
  const entry = new Entry({
    ...req.body,
    userId: req.userId,
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update entry
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    // Check ownership
    if (entry.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(entry, req.body);
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete entry
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    // Check ownership
    if (entry.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

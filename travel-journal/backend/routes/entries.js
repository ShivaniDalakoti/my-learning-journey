const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create entry
router.post('/', async (req, res) => {
  const entry = new Entry(req.body);
  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update entry
router.put('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    Object.assign(entry, req.body);
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

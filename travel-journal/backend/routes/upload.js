const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const path = require('path');

// Upload single image
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    url: imageUrl,
    filename: req.file.filename,
    size: req.file.size,
  });
});

// Upload multiple images
router.post('/multiple', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const uploadedImages = req.files.map((file) => ({
    url: `/uploads/${file.filename}`,
    filename: file.filename,
  }));

  res.json({
    success: true,
    images: uploadedImages,
    count: req.files.length,
  });
});

module.exports = router;

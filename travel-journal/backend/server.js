const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const entriesRouter = require('./routes/entries');
const uploadRouter = require('./routes/upload');
const authRouter = require('./routes/auth');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Auth routes
app.use('/api/auth', authRouter);

// Entry routes
app.use('/api/entries', entriesRouter);

// Upload routes
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Imports
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes'); // 👈 Naya Route

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); // 👈 Events API connect ho gayi

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
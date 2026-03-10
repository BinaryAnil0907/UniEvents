const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String },
  year: { type: String },
  division: { 
    type: String, 
    required: true,
    uppercase: true,
    enum: ['A', 'B', 'C', 'D'] // 🔥 Strict Enum
  },
  rollNo: { 
    type: Number, 
    required: true,
    min: 1, // 🔥 Minimum 1
    max: 100 // 🔥 Maximum 100
  },
  role: { 
    type: String, 
    default: 'student' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
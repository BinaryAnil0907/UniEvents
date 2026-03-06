const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String },
  year: { type: String },
  role: { type: String, default: 'student' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
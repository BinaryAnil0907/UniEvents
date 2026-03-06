const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register Logic
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, department, year, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      department,
      year,
      role: role || 'student' // Default role student rahega
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully! 🎉",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// 2. Login Logic (Updated with Role)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // ✅ Sending full user object including ROLE
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role // 👈 This was missing
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
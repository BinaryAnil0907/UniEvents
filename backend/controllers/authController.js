const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, department, year, division, rollNo, role } = req.body;

    // 🔥 BACKEND VALIDATIONS
    const divNormal = division ? division.toUpperCase() : '';
    const validDivs = ['A', 'B', 'C', 'D'];
    if (!validDivs.includes(divNormal)) {
      return res.status(400).json({ message: "Invalid Division! Choose between A and D." });
    }

    const rollInt = parseInt(rollNo);
    if (isNaN(rollInt) || rollInt < 1 || rollInt > 100) {
      return res.status(400).json({ message: "Invalid Roll No! Enter between 1 and 100." });
    }

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
      division: divNormal, 
      rollNo: rollInt,   
      role: role || 'student'
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

// Login User (Same logic)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
const express = require('express');
const router = express.Router();

// 🚨 DHYAN SE DEKHO: loginUser ko yahan bracket ke andar add karna hai
const { registerUser, loginUser } = require('../controllers/authController');

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser); 

module.exports = router;
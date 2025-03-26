
const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get current user
router.get('/me', protect, authController.getMe);

module.exports = router;

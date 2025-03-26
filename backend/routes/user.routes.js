
const express = require('express');
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Update profile
router.put('/profile', userController.updateProfile);

// Update avatar
router.put('/avatar', upload.single('avatar'), userController.updateAvatar);

// Change password
router.put('/password', userController.changePassword);

// Get user activity
router.get('/activity', userController.getUserActivity);

// Get notifications
router.get('/notifications', userController.getNotifications);

// Mark notification as read
router.put('/notifications/:type/:notificationId', userController.markNotificationRead);

module.exports = router;

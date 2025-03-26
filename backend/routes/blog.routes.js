
const express = require('express');
const blogController = require('../controllers/blog.controller');
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

const router = express.Router();

// Public routes
router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPost);

// Protected routes
router.use(protect);

// Create post with file uploads
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), blogController.createPost);

// Comment on a post
router.post('/:id/comments', blogController.createComment);

// Like/unlike a post
router.post('/:id/like', blogController.toggleLike);

module.exports = router;

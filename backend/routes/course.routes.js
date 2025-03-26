
const express = require('express');
const courseController = require('../controllers/course.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);

// Protected routes
router.use(protect);
router.get('/user/enrolled', courseController.getEnrolledCourses);
router.post('/:id/enroll', courseController.enrollCourse);

module.exports = router;

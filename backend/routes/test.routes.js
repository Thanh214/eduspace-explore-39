
const express = require('express');
const testController = require('../controllers/test.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all tests
router.get('/user', testController.getUserTests);

// Get tests for a course
router.get('/course/:courseId', testController.getTests);

// Get a single test
router.get('/:id', testController.getTest);

// Submit test answers
router.post('/:id/submit', testController.submitTest);

module.exports = router;

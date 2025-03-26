
const express = require('express');
const documentController = require('../controllers/document.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocument);

// Protected routes
router.use(protect);
router.get('/user/downloaded', documentController.getDownloadedDocuments);
router.post('/:id/download', documentController.downloadDocument);

module.exports = router;

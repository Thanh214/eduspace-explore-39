
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create subdirectories for different types of uploads
const coursesDir = path.join(uploadDir, 'courses');
const documentsDir = path.join(uploadDir, 'documents');
const avatarsDir = path.join(uploadDir, 'avatars');
const blogPostsDir = path.join(uploadDir, 'blog_posts');

[coursesDir, documentsDir, avatarsDir, blogPostsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationDir = uploadDir;
    
    // Determine the destination based on upload type
    if (req.path.includes('/courses')) {
      destinationDir = coursesDir;
    } else if (req.path.includes('/documents')) {
      destinationDir = documentsDir;
    } else if (req.path.includes('/users/avatar')) {
      destinationDir = avatarsDir;
    } else if (req.path.includes('/blogs')) {
      destinationDir = blogPostsDir;
    }
    
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images and documents
  if (
    file.mimetype.startsWith('image/') || 
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/vnd.ms-powerpoint' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Định dạng file không được hỗ trợ'), false);
  }
};

// Export multer middleware
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  },
  fileFilter: fileFilter
});


const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Middleware to verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Vui lòng đăng nhập để tiếp tục'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const [user] = await db.query(
      'SELECT ID, email, full_name, avatar_url, phone, address, balance, dob FROM users WHERE ID = ?',
      [decoded.id]
    );

    if (!user.length) {
      return res.status(401).json({
        status: 'error',
        message: 'Người dùng không tồn tại'
      });
    }

    // Add user to request
    req.user = user[0];
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      status: 'error',
      message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'
    });
  }
};

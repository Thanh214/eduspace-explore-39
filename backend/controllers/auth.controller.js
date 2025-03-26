
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, full_name, phone, address } = req.body;

    // Check if email exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUser.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Email đã được sử dụng'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const [result] = await db.query(
      'INSERT INTO users (email, password_hash, full_name, phone, address) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, full_name, phone, address]
    );

    // Get the new user
    const [newUser] = await db.query(
      'SELECT ID, email, full_name, avatar_url, phone, address, balance FROM users WHERE ID = ?',
      [result.insertId]
    );

    // Generate token
    const token = generateToken(newUser[0].ID);

    res.status(201).json({
      status: 'success',
      message: 'Đăng ký thành công',
      data: {
        user: newUser[0],
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi trong quá trình đăng ký'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    const user = users[0];

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Generate token
    const token = generateToken(user.ID);

    // Send user data (without password)
    const userData = {
      id: user.ID,
      email: user.email,
      name: user.full_name,
      avatar: user.avatar_url,
      phone: user.phone,
      address: user.address,
      balance: user.balance
    };

    res.status(200).json({
      status: 'success',
      message: 'Đăng nhập thành công',
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi trong quá trình đăng nhập'
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi trong quá trình lấy thông tin người dùng'
    });
  }
};

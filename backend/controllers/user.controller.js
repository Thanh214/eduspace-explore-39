
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.ID;
    const { full_name, phone, address } = req.body;
    
    // Update user
    await db.query(
      'UPDATE users SET full_name = ?, phone = ?, address = ? WHERE ID = ?',
      [full_name, phone, address, userId]
    );
    
    // Get updated user
    const [updatedUser] = await db.query(
      'SELECT ID, email, full_name, avatar_url, phone, address, balance FROM users WHERE ID = ?',
      [userId]
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Cập nhật thông tin thành công',
      data: {
        user: updatedUser[0]
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi cập nhật thông tin'
    });
  }
};

// Update user avatar
exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.user.ID;
    
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Không tìm thấy file ảnh'
      });
    }
    
    // Get old avatar to delete it
    const [oldAvatar] = await db.query('SELECT avatar_url FROM users WHERE ID = ?', [userId]);
    
    // Delete old avatar file if exists
    if (oldAvatar[0]?.avatar_url) {
      const oldAvatarPath = path.join(__dirname, '..', oldAvatar[0].avatar_url);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }
    
    // Update with new avatar
    await db.query(
      'UPDATE users SET avatar_url = ? WHERE ID = ?',
      [req.file.path, userId]
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Cập nhật ảnh đại diện thành công',
      data: {
        avatarUrl: `${req.protocol}://${req.get('host')}/uploads/avatars/${path.basename(req.file.path)}`
      }
    });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi cập nhật ảnh đại diện'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.ID;
    const { currentPassword, newPassword } = req.body;
    
    // Get current user with password
    const [user] = await db.query('SELECT password_hash FROM users WHERE ID = ?', [userId]);
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user[0].password_hash);
    
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Mật khẩu hiện tại không đúng'
      });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    await db.query(
      'UPDATE users SET password_hash = ? WHERE ID = ?',
      [hashedPassword, userId]
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi đổi mật khẩu'
    });
  }
};

// Get user activity (enrolled courses, downloaded documents, etc.)
exports.getUserActivity = async (req, res) => {
  try {
    const userId = req.user.ID;
    
    // Get enrolled courses
    const [courses] = await db.query(`
      SELECT c.ID, c.title, c.image_url, ce.enrollment_status, ce.created_at as enrollment_date
      FROM courses c
      JOIN courses_enrollment ce ON c.ID = ce.course_id
      WHERE ce.user_id = ?
      ORDER BY ce.created_at DESC
      LIMIT 5
    `, [userId]);
    
    // Get downloaded documents
    const [documents] = await db.query(`
      SELECT d.ID, d.title, d.type_file, dl.created_at as download_date
      FROM document d
      JOIN download dl ON d.ID = dl.document_id
      WHERE dl.user_id = ?
      ORDER BY dl.created_at DESC
      LIMIT 5
    `, [userId]);
    
    // Get comments
    const [comments] = await db.query(`
      SELECT c.ID, c.content, c.created_at, bp.ID as post_id, bp.title as post_title
      FROM comments c
      JOIN blog_post bp ON c.blog_post_id = bp.ID
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
      LIMIT 5
    `, [userId]);
    
    // Get test results
    const [tests] = await db.query(`
      SELECT ct.ID, ct.title, c.ID as course_id, c.title as course_title, g.grade
      FROM grades g
      JOIN courses c ON g.course_id = c.ID
      JOIN courses_test ct ON ct.course_id = c.ID
      WHERE g.user_id = ?
      ORDER BY g.ID DESC
      LIMIT 5
    `, [userId]);

    // Format response
    const userActivity = {
      courses: courses.map(course => ({
        id: course.ID,
        title: course.title,
        image: course.image_url ? `${req.protocol}://${req.get('host')}/uploads/courses/${path.basename(course.image_url)}` : null,
        status: course.enrollment_status,
        enrollmentDate: course.enrollment_date
      })),
      documents: documents.map(doc => ({
        id: doc.ID,
        title: doc.title,
        type: doc.type_file,
        downloadDate: doc.download_date
      })),
      comments: comments.map(comment => ({
        id: comment.ID,
        content: comment.content,
        postId: comment.post_id,
        postTitle: comment.post_title,
        createdAt: comment.created_at
      })),
      tests: tests.map(test => ({
        id: test.ID,
        title: test.title,
        courseId: test.course_id,
        courseTitle: test.course_title,
        grade: test.grade
      }))
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        activity: userActivity
      }
    });
  } catch (error) {
    console.error('Error getting user activity:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy hoạt động người dùng'
    });
  }
};

// Get user notifications
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.ID;
    
    // Get comment notifications
    const [commentNotifications] = await db.query(`
      SELECT cn.*, bp.title as post_title, u.full_name as commenter_name
      FROM comment_notifications cn
      JOIN blog_post bp ON cn.blog_post_id = bp.ID
      JOIN comments c ON cn.comment_id = c.ID
      JOIN users u ON c.user_id = u.ID
      WHERE cn.user_id = ?
      ORDER BY cn.created_at DESC
    `, [userId]);
    
    // Get reaction notifications
    const [reactionNotifications] = await db.query(`
      SELECT rn.*, bp.title as post_title, u.full_name as reactor_name
      FROM reaction_notifications rn
      JOIN blog_post bp ON rn.blog_post_id = bp.ID
      JOIN likes l ON rn.reaction_id = l.ID
      JOIN users u ON l.user_id = u.ID
      WHERE rn.user_id = ?
      ORDER BY rn.created_at DESC
    `, [userId]);
    
    // Combine and format notifications
    const allNotifications = [
      ...commentNotifications.map(n => ({
        id: n.ID,
        type: 'comment',
        message: n.message,
        details: {
          postId: n.blog_post_id,
          postTitle: n.post_title,
          commenterName: n.commenter_name
        },
        read: !!n.read_status,
        createdAt: n.created_at
      })),
      ...reactionNotifications.map(n => ({
        id: n.ID,
        type: 'reaction',
        message: n.message,
        details: {
          postId: n.blog_post_id,
          postTitle: n.post_title,
          reactorName: n.reactor_name
        },
        read: !!n.read_status,
        createdAt: n.created_at
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json({
      status: 'success',
      results: allNotifications.length,
      data: {
        notifications: allNotifications
      }
    });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy thông báo'
    });
  }
};

// Mark notification as read
exports.markNotificationRead = async (req, res) => {
  try {
    const userId = req.user.ID;
    const { notificationId, type } = req.params;
    
    let updated = false;
    
    if (type === 'comment') {
      const [result] = await db.query(
        'UPDATE comment_notifications SET read_status = 1 WHERE ID = ? AND user_id = ?',
        [notificationId, userId]
      );
      updated = result.affectedRows > 0;
    } else if (type === 'reaction') {
      const [result] = await db.query(
        'UPDATE reaction_notifications SET read_status = 1 WHERE ID = ? AND user_id = ?',
        [notificationId, userId]
      );
      updated = result.affectedRows > 0;
    }
    
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy thông báo'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Đã đánh dấu thông báo là đã đọc'
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi cập nhật thông báo'
    });
  }
};

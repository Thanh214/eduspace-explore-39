
const db = require('../config/db');
const path = require('path');

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const [posts] = await db.query(`
      SELECT bp.*, u.full_name as author_name, u.avatar_url as author_avatar,
        COUNT(DISTINCT c.ID) as comments_count,
        COUNT(DISTINCT l.ID) as likes_count
      FROM blog_post bp
      JOIN users u ON bp.user_id = u.ID
      LEFT JOIN comments c ON bp.ID = c.blog_post_id
      LEFT JOIN likes l ON bp.ID = l.blog_post_id
      GROUP BY bp.ID
      ORDER BY bp.created_at DESC
    `);

    // Format response
    const formattedPosts = posts.map(post => ({
      id: post.ID,
      title: post.title,
      content: post.content ? post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '') : null,
      image: post.image_url ? `${req.protocol}://${req.get('host')}/uploads/blog_posts/${path.basename(post.image_url)}` : null,
      fileUrl: post.file_url ? `${req.protocol}://${req.get('host')}/uploads/blog_posts/${path.basename(post.file_url)}` : null,
      author: {
        id: post.user_id,
        name: post.author_name,
        avatar: post.author_avatar ? `${req.protocol}://${req.get('host')}/uploads/avatars/${path.basename(post.author_avatar)}` : null
      },
      commentsCount: post.comments_count,
      likesCount: post.likes_count,
      createdAt: post.created_at,
      updatedAt: post.updated_at
    }));

    res.status(200).json({
      status: 'success',
      results: formattedPosts.length,
      data: {
        posts: formattedPosts
      }
    });
  } catch (error) {
    console.error('Error getting blog posts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách bài viết'
    });
  }
};

// Get single blog post
exports.getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Get post details
    const [posts] = await db.query(`
      SELECT bp.*, u.full_name as author_name, u.avatar_url as author_avatar
      FROM blog_post bp
      JOIN users u ON bp.user_id = u.ID
      WHERE bp.ID = ?
    `, [postId]);

    if (posts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài viết'
      });
    }

    const post = posts[0];

    // Get comments
    const [comments] = await db.query(`
      SELECT c.*, u.full_name as commenter_name, u.avatar_url as commenter_avatar
      FROM comments c
      JOIN users u ON c.user_id = u.ID
      WHERE c.blog_post_id = ?
      ORDER BY c.created_at DESC
    `, [postId]);

    // Get likes count
    const [likesResult] = await db.query(`
      SELECT COUNT(*) as likes_count
      FROM likes
      WHERE blog_post_id = ?
    `, [postId]);

    // Format comments
    const formattedComments = comments.map(comment => ({
      id: comment.ID,
      content: comment.content,
      commenter: {
        id: comment.user_id,
        name: comment.commenter_name,
        avatar: comment.commenter_avatar ? `${req.protocol}://${req.get('host')}/uploads/avatars/${path.basename(comment.commenter_avatar)}` : null
      },
      createdAt: comment.created_at
    }));

    // Format post
    const formattedPost = {
      id: post.ID,
      title: post.title,
      content: post.content,
      image: post.image_url ? `${req.protocol}://${req.get('host')}/uploads/blog_posts/${path.basename(post.image_url)}` : null,
      fileUrl: post.file_url ? `${req.protocol}://${req.get('host')}/uploads/blog_posts/${path.basename(post.file_url)}` : null,
      author: {
        id: post.user_id,
        name: post.author_name,
        avatar: post.author_avatar ? `${req.protocol}://${req.get('host')}/uploads/avatars/${path.basename(post.author_avatar)}` : null
      },
      comments: formattedComments,
      likesCount: likesResult[0].likes_count,
      createdAt: post.created_at,
      updatedAt: post.updated_at
    };

    res.status(200).json({
      status: 'success',
      data: {
        post: formattedPost
      }
    });
  } catch (error) {
    console.error('Error getting blog post:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy thông tin bài viết'
    });
  }
};

// Create blog post
exports.createPost = async (req, res) => {
  try {
    const userId = req.user.ID;
    const { title, content } = req.body;

    // File paths
    let imageUrl = null;
    let fileUrl = null;

    if (req.files) {
      if (req.files.image) {
        imageUrl = req.files.image[0].path;
      }
      if (req.files.file) {
        fileUrl = req.files.file[0].path;
      }
    }

    // Insert post
    const [result] = await db.query(
      'INSERT INTO blog_post (user_id, title, content, image_url, file_url) VALUES (?, ?, ?, ?, ?)',
      [userId, title, content, imageUrl, fileUrl]
    );

    res.status(201).json({
      status: 'success',
      message: 'Tạo bài viết thành công',
      data: {
        id: result.insertId,
        title,
        content
      }
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi tạo bài viết'
    });
  }
};

// Comment on a post
exports.createComment = async (req, res) => {
  try {
    const userId = req.user.ID;
    const postId = req.params.id;
    const { content } = req.body;

    // Check if post exists
    const [post] = await db.query('SELECT * FROM blog_post WHERE ID = ?', [postId]);
    
    if (post.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài viết'
      });
    }

    // Create comment
    const [result] = await db.query(
      'INSERT INTO comments (user_id, blog_post_id, content) VALUES (?, ?, ?)',
      [userId, postId, content]
    );

    // Create notification for post author (if not the same user)
    if (post[0].user_id !== userId) {
      await db.query(
        'INSERT INTO comment_notifications (user_id, blog_post_id, comment_id, message, read_status) VALUES (?, ?, ?, ?, ?)',
        [post[0].user_id, postId, result.insertId, 'Có người đã bình luận về bài viết của bạn', 0]
      );
    }

    // Get user info for response
    const [user] = await db.query('SELECT full_name, avatar_url FROM users WHERE ID = ?', [userId]);

    res.status(201).json({
      status: 'success',
      message: 'Bình luận thành công',
      data: {
        id: result.insertId,
        content,
        commenter: {
          id: userId,
          name: user[0].full_name,
          avatar: user[0].avatar_url ? `${req.protocol}://${req.get('host')}/uploads/avatars/${path.basename(user[0].avatar_url)}` : null
        },
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi bình luận'
    });
  }
};

// Like/unlike a post
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user.ID;
    const postId = req.params.id;
    const { reaction_type = 'like' } = req.body;

    // Check if post exists
    const [post] = await db.query('SELECT * FROM blog_post WHERE ID = ?', [postId]);
    
    if (post.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài viết'
      });
    }

    // Check if already liked
    const [existingLike] = await db.query(
      'SELECT * FROM likes WHERE user_id = ? AND blog_post_id = ?',
      [userId, postId]
    );

    let message = '';
    let likeId = null;

    if (existingLike.length > 0) {
      // User already liked, remove like (unlike)
      await db.query(
        'DELETE FROM likes WHERE ID = ?',
        [existingLike[0].ID]
      );
      message = 'Đã bỏ thích bài viết';
    } else {
      // User hasn't liked, add like
      const [result] = await db.query(
        'INSERT INTO likes (user_id, blog_post_id, reaction_type) VALUES (?, ?, ?)',
        [userId, postId, reaction_type]
      );
      
      likeId = result.insertId;
      message = 'Đã thích bài viết';

      // Create notification for post author (if not the same user)
      if (post[0].user_id !== userId) {
        await db.query(
          'INSERT INTO reaction_notifications (user_id, blog_post_id, reaction_id, message, read_status) VALUES (?, ?, ?, ?, ?)',
          [post[0].user_id, postId, likeId, 'Có người đã thích bài viết của bạn', 0]
        );
      }
    }

    // Get updated likes count
    const [likesResult] = await db.query(
      'SELECT COUNT(*) as likes_count FROM likes WHERE blog_post_id = ?',
      [postId]
    );

    res.status(200).json({
      status: 'success',
      message,
      data: {
        likesCount: likesResult[0].likes_count,
        isLiked: !existingLike.length
      }
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi thích/bỏ thích bài viết'
    });
  }
};

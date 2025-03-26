
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, 
        COUNT(DISTINCT ch.ID) AS lessons_count,
        COUNT(DISTINCT ce.user_id) AS students_count
      FROM courses c
      LEFT JOIN chapter ch ON c.ID = ch.course_id
      LEFT JOIN courses_enrollment ce ON c.ID = ce.course_id
      GROUP BY c.ID
    `);

    // Format response
    const formattedCourses = courses.map(course => ({
      id: course.ID,
      title: course.title,
      description: course.description,
      level: course.level,
      image: course.image_url ? `${req.protocol}://${req.get('host')}/uploads/courses/${path.basename(course.image_url)}` : null,
      lessons: course.lessons_count,
      students: course.students_count,
      createdAt: course.created_at,
      updatedAt: course.updated_at
    }));

    res.status(200).json({
      status: 'success',
      results: formattedCourses.length,
      data: {
        courses: formattedCourses
      }
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách khóa học'
    });
  }
};

// Get single course
exports.getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Get course details
    const [courses] = await db.query(`
      SELECT c.*, 
        COUNT(DISTINCT ch.ID) AS lessons_count,
        COUNT(DISTINCT ce.user_id) AS students_count
      FROM courses c
      LEFT JOIN chapter ch ON c.ID = ch.course_id
      LEFT JOIN courses_enrollment ce ON c.ID = ce.course_id
      WHERE c.ID = ?
      GROUP BY c.ID
    `, [courseId]);

    if (courses.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy khóa học'
      });
    }

    const course = courses[0];

    // Get chapters and lessons
    const [chapters] = await db.query(`
      SELECT ch.*, COUNT(l.ID) as lesson_count
      FROM chapter ch
      LEFT JOIN lesson l ON ch.ID = l.chapter_id
      WHERE ch.course_id = ?
      GROUP BY ch.ID
      ORDER BY ch.chapter_order
    `, [courseId]);

    // Get lessons for each chapter
    const chaptersWithLessons = await Promise.all(chapters.map(async (chapter) => {
      const [lessons] = await db.query(`
        SELECT l.*
        FROM lesson l
        WHERE l.chapter_id = ?
        ORDER BY l.lesson_order
      `, [chapter.ID]);

      return {
        id: chapter.ID,
        title: chapter.title,
        order: chapter.chapter_order,
        lessons: lessons.map(lesson => ({
          id: lesson.ID,
          title: lesson.title,
          order: lesson.lesson_order
        }))
      };
    }));

    // Format course data
    const formattedCourse = {
      id: course.ID,
      title: course.title,
      description: course.description,
      fullDescription: course.description_full,
      level: course.level,
      image: course.image_url ? `${req.protocol}://${req.get('host')}/uploads/courses/${path.basename(course.image_url)}` : null,
      lessonsCount: course.lessons_count,
      studentsCount: course.students_count,
      chapters: chaptersWithLessons,
      createdAt: course.created_at,
      updatedAt: course.updated_at
    };

    res.status(200).json({
      status: 'success',
      data: {
        course: formattedCourse
      }
    });
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy thông tin khóa học'
    });
  }
};

// Get user enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.ID;

    const [enrolledCourses] = await db.query(`
      SELECT c.*, ce.enrollment_status, ce.created_at as enrollment_date,
        (SELECT COUNT(*) FROM lesson l JOIN chapter ch ON l.chapter_id = ch.ID WHERE ch.course_id = c.ID) as total_lessons
      FROM courses c
      JOIN courses_enrollment ce ON c.ID = ce.course_id
      WHERE ce.user_id = ?
    `, [userId]);

    // Format response
    const formattedCourses = enrolledCourses.map(course => ({
      id: course.ID,
      title: course.title,
      description: course.description,
      level: course.level,
      image: course.image_url ? `${req.protocol}://${req.get('host')}/uploads/courses/${path.basename(course.image_url)}` : null,
      status: course.enrollment_status,
      enrollmentDate: course.enrollment_date,
      totalLessons: course.total_lessons,
      progress: 0, // Will need to calculate from user progress later
    }));

    res.status(200).json({
      status: 'success',
      results: formattedCourses.length,
      data: {
        courses: formattedCourses
      }
    });
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách khóa học đã đăng ký'
    });
  }
};

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user.ID;
    const courseId = req.params.id;

    // Check if course exists
    const [course] = await db.query('SELECT * FROM courses WHERE ID = ?', [courseId]);
    
    if (course.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy khóa học'
      });
    }

    // Check if already enrolled
    const [enrollment] = await db.query(
      'SELECT * FROM courses_enrollment WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (enrollment.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Bạn đã đăng ký khóa học này rồi'
      });
    }

    // Enroll user
    await db.query(
      'INSERT INTO courses_enrollment (user_id, course_id, enrollment_status) VALUES (?, ?, ?)',
      [userId, courseId, 'active']
    );

    res.status(201).json({
      status: 'success',
      message: 'Đăng ký khóa học thành công'
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi đăng ký khóa học'
    });
  }
};


const db = require('../config/db');

// Get all tests for a course
exports.getTests = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if course exists
    const [course] = await db.query('SELECT * FROM courses WHERE ID = ?', [courseId]);
    
    if (course.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy khóa học'
      });
    }

    // Get tests
    const [tests] = await db.query(`
      SELECT ct.*, COUNT(q.ID) as questions_count
      FROM courses_test ct
      LEFT JOIN question q ON ct.ID = q.course_test_id
      WHERE ct.course_id = ?
      GROUP BY ct.ID
    `, [courseId]);

    // Format response
    const formattedTests = tests.map(test => ({
      id: test.ID,
      title: test.title,
      timeLimit: test.time_limit,
      questionsCount: test.questions_count,
      createdAt: test.created_at,
      updatedAt: test.updated_at
    }));

    res.status(200).json({
      status: 'success',
      results: formattedTests.length,
      data: {
        tests: formattedTests
      }
    });
  } catch (error) {
    console.error('Error getting tests:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách bài kiểm tra'
    });
  }
};

// Get a single test with questions and answers
exports.getTest = async (req, res) => {
  try {
    const testId = req.params.id;

    // Get test details
    const [tests] = await db.query('SELECT * FROM courses_test WHERE ID = ?', [testId]);
    
    if (tests.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài kiểm tra'
      });
    }

    const test = tests[0];

    // Get questions
    const [questions] = await db.query(`
      SELECT *
      FROM question
      WHERE course_test_id = ?
    `, [testId]);

    // Get answers for each question
    const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
      const [answers] = await db.query(`
        SELECT *
        FROM answers
        WHERE question_id = ?
      `, [question.ID]);

      return {
        id: question.ID,
        text: question.question_text,
        type: question.question_type,
        answers: answers.map(answer => ({
          id: answer.ID,
          text: answer.answer_text,
          isCorrect: !!answer.is_correct
        }))
      };
    }));

    // Format test
    const formattedTest = {
      id: test.ID,
      title: test.title,
      courseId: test.course_id,
      timeLimit: test.time_limit,
      questions: questionsWithAnswers,
      createdAt: test.created_at,
      updatedAt: test.updated_at
    };

    res.status(200).json({
      status: 'success',
      data: {
        test: formattedTest
      }
    });
  } catch (error) {
    console.error('Error getting test:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy thông tin bài kiểm tra'
    });
  }
};

// Submit test answers
exports.submitTest = async (req, res) => {
  try {
    const userId = req.user.ID;
    const testId = req.params.id;
    const { answers } = req.body;

    // Check if test exists
    const [tests] = await db.query(`
      SELECT ct.*, c.ID as course_id
      FROM courses_test ct
      JOIN courses c ON ct.course_id = c.ID
      WHERE ct.ID = ?
    `, [testId]);
    
    if (tests.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy bài kiểm tra'
      });
    }

    const test = tests[0];
    
    // Check enrollment
    const [enrollment] = await db.query(
      'SELECT * FROM courses_enrollment WHERE user_id = ? AND course_id = ?',
      [userId, test.course_id]
    );

    if (enrollment.length === 0) {
      return res.status(403).json({
        status: 'error',
        message: 'Bạn chưa đăng ký khóa học này'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    let totalQuestions = 0;

    // Get all questions for the test
    const [questions] = await db.query('SELECT * FROM question WHERE course_test_id = ?', [testId]);
    totalQuestions = questions.length;

    // Check user answers against correct answers
    for (const questionId in answers) {
      const userAnswer = answers[questionId];
      
      // Get correct answers for this question
      const [correctAnswersResult] = await db.query(
        'SELECT * FROM answers WHERE question_id = ? AND is_correct = 1',
        [questionId]
      );

      if (Array.isArray(userAnswer)) {
        // Multiple correct answers
        const correctAnswerIds = correctAnswersResult.map(a => a.ID);
        const isAllCorrect = userAnswer.length === correctAnswerIds.length && 
                             userAnswer.every(id => correctAnswerIds.includes(parseInt(id)));
        
        if (isAllCorrect) {
          correctAnswers++;
        }
      } else {
        // Single answer
        const isCorrect = correctAnswersResult.some(a => a.ID === parseInt(userAnswer));
        if (isCorrect) {
          correctAnswers++;
        }
      }
    }

    // Calculate grade
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 10 : 0;

    // Check if grade already exists and update or insert
    const [existingGrade] = await db.query(
      'SELECT * FROM grades WHERE user_id = ? AND course_id = ?',
      [userId, test.course_id]
    );

    if (existingGrade.length > 0) {
      // Update grade if new score is higher
      if (score > existingGrade[0].grade) {
        await db.query(
          'UPDATE grades SET grade = ? WHERE ID = ?',
          [score, existingGrade[0].ID]
        );
      }
    } else {
      // Insert new grade
      await db.query(
        'INSERT INTO grades (user_id, course_id, grade) VALUES (?, ?, ?)',
        [userId, test.course_id, score]
      );
    }

    res.status(200).json({
      status: 'success',
      message: 'Nộp bài thành công',
      data: {
        correctAnswers,
        totalQuestions,
        score,
        percentage: `${Math.round((correctAnswers / totalQuestions) * 100)}%`
      }
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi nộp bài kiểm tra'
    });
  }
};

// Get all tests for user
exports.getUserTests = async (req, res) => {
  try {
    const userId = req.user.ID;

    // Get enrolled courses
    const [enrollments] = await db.query(
      'SELECT course_id FROM courses_enrollment WHERE user_id = ?',
      [userId]
    );

    if (enrollments.length === 0) {
      return res.status(200).json({
        status: 'success',
        results: 0,
        data: {
          tests: []
        }
      });
    }

    const courseIds = enrollments.map(e => e.course_id);

    // Get tests for enrolled courses
    const [tests] = await db.query(`
      SELECT ct.*, c.title as course_title, COUNT(q.ID) as questions_count
      FROM courses_test ct
      JOIN courses c ON ct.course_id = c.ID
      LEFT JOIN question q ON ct.ID = q.course_test_id
      WHERE ct.course_id IN (${courseIds.join(',')})
      GROUP BY ct.ID
    `);

    // Get grades for user
    const [grades] = await db.query(
      'SELECT course_id, grade FROM grades WHERE user_id = ?',
      [userId]
    );

    // Format response with completion status
    const formattedTests = tests.map(test => {
      const grade = grades.find(g => g.course_id === test.course_id);
      
      return {
        id: test.ID,
        title: test.title,
        courseId: test.course_id,
        courseName: test.course_title,
        timeLimit: test.time_limit,
        questionsCount: test.questions_count,
        completed: !!grade,
        score: grade ? grade.grade : null,
        createdAt: test.created_at
      };
    });

    res.status(200).json({
      status: 'success',
      results: formattedTests.length,
      data: {
        tests: formattedTests
      }
    });
  } catch (error) {
    console.error('Error getting user tests:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách bài kiểm tra'
    });
  }
};

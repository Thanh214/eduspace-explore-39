
const db = require('../config/db');
const path = require('path');

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    // Get all documents
    const [documents] = await db.query(`
      SELECT d.*, COUNT(DISTINCT dl.ID) as download_count
      FROM document d
      LEFT JOIN download dl ON d.ID = dl.document_id
      GROUP BY d.ID
    `);

    // Format response
    const formattedDocuments = documents.map(doc => ({
      id: doc.ID,
      title: doc.title,
      description: doc.description,
      link: doc.link_url ? `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc.link_url)}` : null,
      image: doc.image_url ? `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc.image_url)}` : null,
      price: doc.price,
      type: doc.type_file,
      downloadCount: doc.download_count,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    }));

    res.status(200).json({
      status: 'success',
      results: formattedDocuments.length,
      data: {
        documents: formattedDocuments
      }
    });
  } catch (error) {
    console.error('Error getting documents:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách tài liệu'
    });
  }
};

// Get single document
exports.getDocument = async (req, res) => {
  try {
    const documentId = req.params.id;

    // Get document details
    const [documents] = await db.query(`
      SELECT d.*, COUNT(DISTINCT dl.ID) as download_count
      FROM document d
      LEFT JOIN download dl ON d.ID = dl.document_id
      WHERE d.ID = ?
      GROUP BY d.ID
    `, [documentId]);

    if (documents.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy tài liệu'
      });
    }

    const doc = documents[0];

    // Format response
    const formattedDocument = {
      id: doc.ID,
      title: doc.title,
      description: doc.description,
      link: doc.link_url ? `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc.link_url)}` : null,
      image: doc.image_url ? `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc.image_url)}` : null,
      price: doc.price,
      type: doc.type_file,
      downloadCount: doc.download_count,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    };

    res.status(200).json({
      status: 'success',
      data: {
        document: formattedDocument
      }
    });
  } catch (error) {
    console.error('Error getting document:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy thông tin tài liệu'
    });
  }
};

// Download document
exports.downloadDocument = async (req, res) => {
  try {
    const userId = req.user.ID;
    const documentId = req.params.id;

    // Check if document exists
    const [documents] = await db.query('SELECT * FROM document WHERE ID = ?', [documentId]);
    
    if (documents.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy tài liệu'
      });
    }

    const document = documents[0];

    // Check if document has a price and handle payment if needed
    if (document.price > 0) {
      // Check if user has already purchased
      const [purchases] = await db.query(
        'SELECT * FROM payments WHERE user_id = ? AND document_id = ? AND status = ?',
        [userId, documentId, 'success']
      );

      if (purchases.length === 0) {
        // Check user balance
        const [users] = await db.query('SELECT balance FROM users WHERE ID = ?', [userId]);
        const user = users[0];

        if (user.balance < document.price) {
          return res.status(400).json({
            status: 'error',
            message: 'Số dư tài khoản không đủ để tải tài liệu này'
          });
        }

        // Process payment
        await db.query('START TRANSACTION');

        try {
          // Deduct from user balance
          await db.query(
            'UPDATE users SET balance = balance - ? WHERE ID = ?',
            [document.price, userId]
          );

          // Create payment record
          await db.query(
            'INSERT INTO payments (user_id, document_id, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)',
            [userId, documentId, document.price, 'credit_card', 'success']
          );

          await db.query('COMMIT');
        } catch (error) {
          await db.query('ROLLBACK');
          throw error;
        }
      }
    }

    // Record download
    await db.query(
      'INSERT INTO download (user_id, document_id, download_status) VALUES (?, ?, ?)',
      [userId, documentId, 'success']
    );

    // Update download count
    await db.query(
      'UPDATE document SET download_count = download_count + 1 WHERE ID = ?',
      [documentId]
    );

    // Return download link
    const downloadLink = document.link_url ? 
      `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(document.link_url)}` : 
      null;

    if (!downloadLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy file tài liệu'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Tải tài liệu thành công',
      data: {
        documentUrl: downloadLink
      }
    });
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi tải tài liệu'
    });
  }
};

// Get user downloaded documents
exports.getDownloadedDocuments = async (req, res) => {
  try {
    const userId = req.user.ID;

    const [downloads] = await db.query(`
      SELECT d.*, dl.created_at as download_date
      FROM document d
      JOIN download dl ON d.ID = dl.document_id
      WHERE dl.user_id = ?
      ORDER BY dl.created_at DESC
    `, [userId]);

    // Format response
    const formattedDocuments = downloads.map(doc => ({
      id: doc.ID,
      title: doc.title,
      description: doc.description,
      link: doc.link_url ? `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc.link_url)}` : null,
      image: doc.image_url ? `${req.protocol}://${req.get('host')}/uploads/documents/${path.basename(doc.image_url)}` : null,
      price: doc.price,
      type: doc.type_file,
      downloadDate: doc.download_date,
    }));

    res.status(200).json({
      status: 'success',
      results: formattedDocuments.length,
      data: {
        documents: formattedDocuments
      }
    });
  } catch (error) {
    console.error('Error getting downloaded documents:', error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách tài liệu đã tải'
    });
  }
};

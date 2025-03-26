
const mysql = require('mysql2');
require('dotenv').config();

// Create a pool of connections to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test connection
(async () => {
  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
})();

module.exports = promisePool;

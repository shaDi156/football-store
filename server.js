const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB config (force web_project DB)
const DB_NAME = 'web_project';
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: DB_NAME,
});

// health check
app.get('/api/health', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// place jersey order
app.post('/api/orders', async (req, res) => {
  const {
    productId,
    productName,
    price,
    qty,
    name,
    phone,
    address,
    payment,
    notes,
  } = req.body;

  const quantity = Math.max(1, Number(qty) || 1);
  const unitPrice = Number(price) || 0;
  const totalAmount = quantity * unitPrice;

  if (!productName || !name) {
    return res.status(400).json({ error: 'Missing required fields: productName, name' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO orders
        (product_id, product_name, unit_price, quantity, total_amount,
         customer_name, phone, address, payment_method, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        productId || null,
        productName,
        unitPrice,
        quantity,
        totalAmount,
        name,
        phone || null,
        address || null,
        payment || null,
        notes || null,
      ]
    );

    res.json({ message: 'Order received', orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// optional: list orders (for admin dashboard)
app.get('/api/orders', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, product_name, quantity, total_amount, customer_name,
              phone, payment_method, status, created_at
       FROM orders
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// demo auth logs (login/signup events)
app.post('/api/logs', async (req, res) => {
  const { action, email, password } = req.body;
  const normalizedAction = (action || '').toLowerCase();

  if (!['login', 'signup'].includes(normalizedAction) || !email || !password) {
    return res.status(400).json({ error: 'Missing or invalid fields: action, email, password' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO logs (action, email, password) VALUES (?, ?, ?)`,
      [normalizedAction, email, password]
    );
    res.json({ message: 'Logged', logId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log(`✅ Connected to MySQL database "${DB_NAME}"`);
  } catch (err) {
    console.error(`\x1b[31m❌ Unable to connect to MySQL database "${DB_NAME}":`, err.message, '\x1b[0m');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

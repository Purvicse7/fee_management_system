const express = require('express');
const router = express.Router();
const pool = require('../db');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all fee structures (protected, admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const [feeStructures] = await pool.execute('SELECT * FROM fee_structures');
    res.json(feeStructures);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new fee structure (admin only)
router.post('/', protect, admin, async (req, res) => {
  const { branch, semester, amount, description } = req.body;
  if (!branch || !semester || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO fee_structures (branch, semester, amount, description) VALUES (?, ?, ?, ?)',
      [branch, semester, amount, description]
    );
    res.status(201).json({ message: 'Fee structure created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

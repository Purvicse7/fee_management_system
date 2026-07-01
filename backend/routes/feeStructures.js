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

// GET a single fee structure by id (protected, admin only)
router.get('/:id', protect, admin, async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.execute('SELECT * FROM fee_structures WHERE id = ?', [id]);
    if (!rows || rows.length === 0) return res.status(404).json({ message: 'Fee structure not found' });
    res.json(rows[0]);
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
    // Return the created row
    const insertedId = result.insertId;
    const [rows] = await pool.execute('SELECT * FROM fee_structures WHERE id = ?', [insertedId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a fee structure (protected, admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const id = req.params.id;
  // Accept partial updates; use COALESCE to keep existing values when param is null
  const { branch = null, semester = null, amount = null, description = null } = req.body;
  try {
    // Ensure the fee structure exists
    const [exists] = await pool.execute('SELECT id FROM fee_structures WHERE id = ?', [id]);
    if (!exists || exists.length === 0) return res.status(404).json({ message: 'Fee structure not found' });

    await pool.execute(
      `UPDATE fee_structures SET
         branch = COALESCE(?, branch),
         semester = COALESCE(?, semester),
         amount = COALESCE(?, amount),
         description = COALESCE(?, description),
         updated_at = NOW()
       WHERE id = ?`,
      [branch, semester, amount, description, id]
    );

    const [rows] = await pool.execute('SELECT * FROM fee_structures WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a fee structure (protected, admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.execute('DELETE FROM fee_structures WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Fee structure not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

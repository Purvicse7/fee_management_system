const express = require('express');
const router = express.Router();
const pool = require('../db');
const { protect } = require('../middleware/authMiddleware');

// POST make a payment (protected)
router.post('/', protect, async (req, res) => {
  const { studentId, feeStructureId, amount, paymentMethod, transactionId } = req.body;
  if (!studentId || !feeStructureId || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO payments (student_id, fee_structure_id, amount, payment_method, transaction_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [studentId, feeStructureId, amount, paymentMethod, transactionId, 'Pending']
    );
    res.status(201).json({ message: 'Payment recorded', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET payment history for logged-in student
router.get('/history', protect, async (req, res) => {
  try {
    const studentId = req.user.id; // from token
    const [payments] = await pool.execute(
      `SELECT p.*, fs.branch, fs.semester 
       FROM payments p 
       JOIN fee_structures fs ON p.fee_structure_id = fs.id 
       WHERE p.student_id = ?`, [studentId]
    );
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;


const express = require('express');
const router = express.Router();
const pool = require('../db');
const { protect, admin } = require('../middleware/authMiddleware');

// GET report of fees collected per branch and semester (admin only)
router.get('/fee-collections', protect, admin, async (req, res) => {
  try {
    const [report] = await pool.execute(
      `SELECT fs.branch, fs.semester, SUM(p.amount) AS total_collected
       FROM payments p
       JOIN fee_structures fs ON p.fee_structure_id = fs.id
       WHERE p.status = 'Completed'
       GROUP BY fs.branch, fs.semester`
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

















/*
// =================== NEW CODE ENDS HERE ===================

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// File: backend/routes/reports.js
// =================== NEW CODE STARTS HERE ===================
// --- 1. Authentication Middleware ---
// This function will protect our routes
const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  // Verify token (pseudo-code)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = decoded;
    next();
  });
};
// --- 2. Create Student Routes ---
// We define the protected routes directly here for simplicity
// GET /api/students - This route is now protected  
router.get('/students', protect, async (req, res) => {
  try {
    const [students] = await pool.execute('SELECT * FROM students');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// You can add more protected routes here, for example:
router.get('/profile', protect, async (req, res) => {
  res.json({ message: `Welcome user with ID: ${req.user.id}` });
});
// =================== NEW CODE ENDS HERE ===================
// GET report of fees collected per branch and semester (admin only)
router.get('/fee-collections', protect, admin, async (req, res) => {
  try {
    const [report] = await pool.execute(
      `SELECT fs.branch, fs.semester, SUM(p.amount) AS total_collected
       FROM payments p
       JOIN fee_structures fs ON p.fee_structure_id = fs.id
       WHERE p.status = 'Completed'
       GROUP BY fs.branch, fs.semester`
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
// =================== NEW CODE ENDS HERE ===================

*/
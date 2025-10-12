// File: routes/students.js

const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// GET /api/students - This route is now protected
// To access it, a valid JWT must be provided in the Authorization header.
router.get('/', protect, async (req, res) => {
  try {
    const [students] = await pool.execute(
      'SELECT u.name, u.email, s.roll_number, s.branch, s.semester FROM students s JOIN users u ON s.user_id = u.id'
    );
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// File: backend/routes/students.js

// ... (keep the existing code at the top)

// POST /api/students - Create a new student profile
// This route should be protected and ideally restricted to admins
router.post('/', protect, async (req, res) => {
  const { userId, rollNumber, branch, semester, contactNumber, address, hostelResident } = req.body;

  // Basic validation
  if (!userId || !rollNumber || !branch || !semester) {
    return res.status(400).json({ message: 'Please provide all required student details.' });
  }

  try {
    // Insert the new student record into the database
    const [result] = await pool.execute(
      'INSERT INTO students (user_id, roll_number, branch, semester, contact_number, address, hostel_resident) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, rollNumber, branch, semester, contactNumber, address, hostelResident]
    );

    res.status(201).json({ message: 'Student profile created successfully', studentId: result.insertId });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A student with this Roll Number already exists.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ... (keep module.exports = router; at the bottom)

module.exports = router;
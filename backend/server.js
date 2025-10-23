/*const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Correct path to routes folder

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// This tells Express to use your auth routes for any URL starting with /api
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

*/
// File: backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const pool = require('./db.js'); // Import the database connection

// --- Import Route Files ---
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const feeStructureRoutes = require('./routes/feeStructures');
const paymentRoutes = require('./routes/payments');
const reportsRoutes = require('./routes/reports');



dotenv.config();
const app = express();

// --- Middleware Setup ---
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// --- Use Authentication Routes ---
// Any request starting with /api will be handled by the authRoutes file
app.use('/api', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/fee-structures', feeStructureRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportsRoutes);
// =================== NEW CODE STARTS HERE ===================

// --- 1. Authentication Middleware ---
// This function will protect our routes
const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info (id, role) to the request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// --- 2. Create Student Routes ---
// We define the protected routes directly here for simplicity
// GET /api/students - This route is now protected
app.get('/api/students', protect, async (req, res) => {
    // Only logged-in users can reach this point
    console.log('User accessing protected route:', req.user);

    try {
        const [students] = await pool.execute(
            'SELECT u.name, u.email, s.roll_number, s.branch, s.semester FROM students s JOIN users u ON s.user_id = u.id'
        );
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// You can add more protected routes here, for example:
app.get('/api/profile', protect, async (req, res) => {
    // req.user contains the logged-in user's info from the token
    res.json({ message: `Welcome user with ID: ${req.user.id}` });
});


// =================== NEW CODE ENDS HERE ===================


// --- Start the Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
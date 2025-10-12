// File: middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer TOKEN_STRING")
      token = authHeader.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request (excluding password)
      req.user = decoded; // The decoded token payload (id, role)
      next(); // Move to the next middleware or route handler

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
}

module.exports = { protect, admin };
// Password and input validators
// Usage: const { validatePassword } = require('../utils/validators');

function validatePassword(password) {
  const errors = [];
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { valid: false, errors };
  }

  if (password.length < 8) errors.push('Password must be at least 8 characters long');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain at least one digit');
  if (!/[!@#$%^&*(),.?"':{}|<>\[\]\\/\\~`+-=_]/.test(password)) errors.push('Password must contain at least one special character');

  return { valid: errors.length === 0, errors };
}

module.exports = {
  validatePassword
};

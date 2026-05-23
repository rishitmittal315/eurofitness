const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, (req, res) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });
});

// Update user profile
router.put('/profile', verifyToken, (req, res) => {
  const { name, phone, age, gender } = req.body;
  
  db.run(
    `UPDATE users SET name = ?, phone = ?, age = ?, gender = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [name, phone, age, gender, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

// Get all users (admin only)
router.get('/', verifyToken, (req, res) => {
  db.all(`SELECT id, name, email, phone, age, gender, membership_plan, membership_start_date FROM users`, (err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(users);
  });
});

module.exports = router;

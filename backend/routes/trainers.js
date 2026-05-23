const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all trainers
router.get('/', (req, res) => {
  db.all(
    `SELECT id, name, email, phone, specialization, experience, bio, profile_image, hourly_rate, rating FROM trainers WHERE is_available = 1`,
    (err, trainers) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(trainers);
    }
  );
});

// Get trainer by ID
router.get('/:id', (req, res) => {
  db.get(
    `SELECT id, name, email, phone, specialization, experience, bio, profile_image, hourly_rate, rating FROM trainers WHERE id = ?`,
    [req.params.id],
    (err, trainer) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!trainer) {
        return res.status(404).json({ message: 'Trainer not found' });
      }
      res.json(trainer);
    }
  );
});

// Update trainer profile
router.put('/profile', verifyToken, (req, res) => {
  const { bio, specialization, experience, hourly_rate } = req.body;
  
  db.run(
    `UPDATE trainers SET bio = ?, specialization = ?, experience = ?, hourly_rate = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [bio, specialization, experience, hourly_rate, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Trainer profile updated successfully' });
    }
  );
});

module.exports = router;

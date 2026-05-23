const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Admin dashboard statistics
router.get('/dashboard', verifyToken, (req, res) => {
  const stats = {};

  // Get user count
  db.get(`SELECT COUNT(*) as count FROM users`, (err, userCount) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.totalUsers = userCount.count;

    // Get trainer count
    db.get(`SELECT COUNT(*) as count FROM trainers`, (err, trainerCount) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.totalTrainers = trainerCount.count;

      // Get total revenue
      db.get(`SELECT SUM(amount) as total FROM payments WHERE status = 'completed'`, (err, revenue) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.totalRevenue = revenue.total || 0;

        // Get recent messages
        db.all(`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5`, (err, messages) => {
          if (err) return res.status(500).json({ error: err.message });
          stats.recentMessages = messages;

          res.json(stats);
        });
      });
    });
  });
});

// Get all contact messages
router.get('/messages', verifyToken, (req, res) => {
  db.all(`SELECT * FROM contact_messages ORDER BY created_at DESC`, (err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(messages);
  });
});

// Mark message as read
router.put('/messages/:id', verifyToken, (req, res) => {
  db.run(
    `UPDATE contact_messages SET status = 'read' WHERE id = ?`,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Message marked as read' });
    }
  );
});

// Delete message
router.delete('/messages/:id', verifyToken, (req, res) => {
  db.run(
    `DELETE FROM contact_messages WHERE id = ?`,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Message deleted' });
    }
  );
});

module.exports = router;

const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all membership plans
router.get('/plans', (req, res) => {
  db.all(`SELECT * FROM membership_plans`, (err, plans) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(plans);
  });
});

// Create membership plan (admin only)
router.post('/plans', verifyToken, (req, res) => {
  const { name, duration_months, price, description, features } = req.body;

  db.run(
    `INSERT INTO membership_plans (name, duration_months, price, description, features) VALUES (?, ?, ?, ?, ?)`,
    [name, duration_months, price, description, JSON.stringify(features)],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Membership plan created', planId: this.lastID });
    }
  );
});

// Get user's current membership
router.get('/user/current', verifyToken, (req, res) => {
  db.get(
    `SELECT membership_plan, membership_start_date, membership_end_date FROM users WHERE id = ?`,
    [req.user.id],
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(data);
    }
  );
});

// Subscribe to membership plan
router.post('/subscribe', verifyToken, (req, res) => {
  const { plan_id } = req.body;

  db.get(`SELECT * FROM membership_plans WHERE id = ?`, [plan_id], (err, plan) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration_months);

    db.run(
      `UPDATE users SET membership_plan = ?, membership_start_date = ?, membership_end_date = ? WHERE id = ?`,
      [plan.name, startDate.toISOString(), endDate.toISOString(), req.user.id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Membership activated successfully', endDate });
      }
    );
  });
});

module.exports = router;

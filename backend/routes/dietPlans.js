const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all diet plans
router.get('/', (req, res) => {
  db.all(`SELECT * FROM diet_plans`, (err, plans) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(plans);
  });
});

// Get diet plan by ID
router.get('/:id', (req, res) => {
  db.get(`SELECT * FROM diet_plans WHERE id = ?`, [req.params.id], (err, plan) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!plan) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    res.json(plan);
  });
});

// Create diet plan (admin only)
router.post('/', verifyToken, (req, res) => {
  const { name, description, calories, protein, carbs, fats, duration_days, price } = req.body;

  db.run(
    `INSERT INTO diet_plans (name, description, calories, protein, carbs, fats, duration_days, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description, calories, protein, carbs, fats, duration_days, price],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Diet plan created', planId: this.lastID });
    }
  );
});

module.exports = router;

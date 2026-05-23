const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const router = express.Router();

// Register user
router.post('/register', (req, res) => {
  const { name, email, password, phone, age, gender } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO users (name, email, password, phone, age, gender) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, phone, age, gender],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Registration failed', error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    }
  );
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.json({ message: 'Login successful', token, user });
  });
});

// Register trainer
router.post('/register-trainer', (req, res) => {
  const { name, email, password, phone, specialization, experience, hourly_rate } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    `INSERT INTO trainers (name, email, password, phone, specialization, experience, hourly_rate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, phone, specialization, experience, hourly_rate],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Registration failed', error: err.message });
      }
      res.status(201).json({ message: 'Trainer registered successfully', trainerId: this.lastID });
    }
  );
});

// Login trainer
router.post('/login-trainer', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  db.get(`SELECT * FROM trainers WHERE email = ?`, [email], (err, trainer) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (!trainer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, trainer.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: trainer.id, email: trainer.email, role: 'trainer' },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.json({ message: 'Login successful', token, trainer });
  });
});

module.exports = router;

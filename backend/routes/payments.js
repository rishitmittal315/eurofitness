const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const db = require('../config/database');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  const { amount, description, payment_type } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      description: description,
      metadata: { userId: req.user.id, paymentType: payment_type }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Record payment
router.post('/record-payment', verifyToken, (req, res) => {
  const { amount, payment_method, stripe_payment_id, description, payment_type } = req.body;

  db.run(
    `INSERT INTO payments (user_id, amount, payment_method, stripe_payment_id, status, description, payment_type) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [req.user.id, amount, payment_method, stripe_payment_id, 'completed', description, payment_type],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Payment recorded', paymentId: this.lastID });
    }
  );
});

// Get user's payment history
router.get('/history', verifyToken, (req, res) => {
  db.all(
    `SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC`,
    [req.user.id],
    (err, payments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(payments);
    }
  );
});

module.exports = router;

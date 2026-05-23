const express = require('express');
const db = require('../config/database');
const nodemailer = require('nodemailer');

const router = express.Router();

// Send contact message
router.post('/send', (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Save to database
  db.run(
    `INSERT INTO contact_messages (name, email, subject, message, phone) VALUES (?, ?, ?, ?, ?)`,
    [name, email, subject, message, phone],
    async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Send email notification
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || 'admin@eurofitness.com',
          subject: `New contact message: ${subject}`,
          html: `<h2>New Contact Message</h2>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Phone:</strong> ${phone}</p>
                 <p><strong>Subject:</strong> ${subject}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message}</p>`
        });
      } catch (emailError) {
        console.log('Email sending failed:', emailError);
      }

      res.status(201).json({ message: 'Message sent successfully' });
    }
  );
});

module.exports = router;

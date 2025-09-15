const express = require('express');
const router = express.Router();
const User = require('../model/User');
const transporter = require('../utils/mailer'); // Nodemailer config
const crypto = require('crypto');

// POST /api/contact - Handle contact form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save user contact info to MongoDB
    const newUser = new User({ name, email, message });
    await newUser.save();

    // Generate a unique chat link
    const roomId = crypto.randomBytes(16).toString('hex'); // Generates a unique room ID

    // Send email to admin for approval with the chat link
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${email}>`,
      to: "your.email@gmail.com", // Replace with your email
      subject: `📩 New Message from ${name}`,
      html: `
        <p>You have received a new message from:</p>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <p>Approve the user to chat with them: <a href="http://localhost:3000/chat/${roomId}">Chat Link</a></p>
      `
    });

    res.status(201).json({ message: 'Form submitted and email sent successfully!' });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
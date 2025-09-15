const nodemailer = require('nodemailer');

// Create a transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',  // For Gmail, you can change this if using other providers
  auth: {
    user: 'mahawarkhushi27@gmail.com',  // Your Gmail address
    pass: 'fzywnblqxsqvruwr'       // The 16-character app password you got from Google
  }
});

module.exports = transporter; 
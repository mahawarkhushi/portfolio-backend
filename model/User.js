// models/User.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
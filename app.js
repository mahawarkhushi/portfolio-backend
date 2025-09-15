const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/contact', contactRoutes);

// === Real-time ephemeral 1-to-1 chat setup ===
io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  // Join the room based on the roomId
  socket.on('join-room', ({ roomId }) => {
    socket.join(roomId);
    console.log(`👤 ${socket.id} joined room: ${roomId}`);
  });

  // Send message to the room
  socket.on('send-message', ({ roomId, message, sender }) => {
    io.to(roomId).emit('receive-message', {
      message,
      sender,
      timestamp: new Date().toISOString(), // Set timestamp for the message
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
module.exports = function (io) {
    io.on('connection', (socket) => {
      console.log(`🟢 User connected: ${socket.id}`);
  
      // Join room (this is where user and admin join a unique room)
      socket.on('join-room', ({ roomId }) => {
        socket.join(roomId);
        console.log(`👤 ${socket.id} joined room: ${roomId}`);
      });
  
      // Send message to that room
      socket.on('send-message', ({ roomId, message, sender }) => {
        io.to(roomId).emit('receive-message', {
          message,
          sender,
          timestamp: new Date().toISOString(),
        });
      });
  
      // Handling disconnect
      socket.on('disconnect', () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
        // Optionally, you can remove users from the rooms on disconnect:
        // socket.rooms.forEach((room) => socket.leave(room));
      });
    });
  };  
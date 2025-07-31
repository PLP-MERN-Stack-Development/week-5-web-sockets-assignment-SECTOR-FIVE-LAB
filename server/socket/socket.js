io.on('connection', (socket) => {
  socket.on('private_message', ({ sender, receiver, message }) => {
    const room = `${sender}-${receiver}`;
    socket.join(room);
    io.to(room).emit('private_message', { sender, message });
  });
});
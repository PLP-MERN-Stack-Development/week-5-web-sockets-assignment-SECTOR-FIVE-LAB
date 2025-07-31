export const sendTypingStatus = (socket, room, user) => {
  socket.emit('typing', { room, user });
};

export const listenForTypingStatus = (socket, callback) => {
  socket.on('typing', callback);
};
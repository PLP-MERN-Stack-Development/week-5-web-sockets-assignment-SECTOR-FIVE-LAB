export const sendReadReceipt = (socket, messageId, user) => {
  socket.emit('message_read', { messageId, user });
};

export const listenForReadReceipts = (socket, callback) => {
  socket.on('message_read', callback);
};
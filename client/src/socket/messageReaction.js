export const addReaction = (socket, messageId, reaction) => {
  socket.emit('add_reaction', { messageId, reaction });
};

export const listenForReactions = (socket, callback) => {
  socket.on('reaction_added', callback);
};
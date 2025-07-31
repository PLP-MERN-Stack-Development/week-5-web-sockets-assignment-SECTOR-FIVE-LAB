import { useState, useEffect, useCallback } from 'react';
import socketService from '../socket/socket.js';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Connect to chat
  const joinChat = useCallback(async (username) => {
    try {
      const socket = await socketService.getConnectedSocket();
      if (socket) {
        socket.emit('user_join', username);
        setCurrentUser({ username, id: socket.id });
      }
    } catch (error) {
      console.error('Failed to join chat:', error);
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (message) => {
    try {
      const socket = await socketService.getConnectedSocket();
      if (socket && message.trim()) {
        socket.emit('send_message', { message });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, []);

  // Send private message
  const sendPrivateMessage = useCallback(async (to, message) => {
    try {
      const socket = await socketService.getConnectedSocket();
      if (socket && message.trim()) {
        socket.emit('private_message', { to, message });
      }
    } catch (error) {
      console.error('Failed to send private message:', error);
    }
  }, []);

  // Set typing status
  const setTyping = useCallback(async (isTyping) => {
    try {
      const socket = await socketService.getConnectedSocket();
      if (socket) {
        socket.emit('typing', isTyping);
      }
    } catch (error) {
      console.error('Failed to set typing status:', error);
    }
  }, []);

  // Add reaction to message
  const addReaction = useCallback(async (messageId, reaction) => {
    try {
      const socket = await socketService.getConnectedSocket();
      if (socket) {
        socket.emit('add_reaction', { messageId, reaction });
      }
    } catch (error) {
      console.error('Failed to add reaction:', error);
    }
  }, []);

  // Socket event listeners
  useEffect(() => {
    let socket = null;

    const initializeSocket = async () => {
      try {
        socket = await socketService.getConnectedSocket();
        
        const handleConnect = () => {
          setIsConnected(true);
          console.log('Connected to chat server');
        };

        const handleDisconnect = () => {
          setIsConnected(false);
          console.log('Disconnected from chat server');
        };

        const handleReceiveMessage = (message) => {
          setMessages(prev => [...prev, message]);
        };

        const handleUserList = (userList) => {
          setUsers(userList);
        };

        const handleUserJoined = (user) => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            system: true,
            message: `${user.username} joined the chat`,
            timestamp: new Date().toISOString(),
          }]);
        };

        const handleUserLeft = (user) => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            system: true,
            message: `${user.username} left the chat`,
            timestamp: new Date().toISOString(),
          }]);
        };

        const handleTypingUsers = (users) => {
          setTypingUsers(users);
        };

        const handleReactionAdded = ({ messageId, reaction }) => {
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
              : msg
          ));
        };

        // Register event listeners
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('receive_message', handleReceiveMessage);
        socket.on('user_list', handleUserList);
        socket.on('user_joined', handleUserJoined);
        socket.on('user_left', handleUserLeft);
        socket.on('typing_users', handleTypingUsers);
        socket.on('reaction_added', handleReactionAdded);

        // Set initial connection state
        setIsConnected(socket.connected);

        // Cleanup function
        return () => {
          socket.off('connect', handleConnect);
          socket.off('disconnect', handleDisconnect);
          socket.off('receive_message', handleReceiveMessage);
          socket.off('user_list', handleUserList);
          socket.off('user_joined', handleUserJoined);
          socket.off('user_left', handleUserLeft);
          socket.off('typing_users', handleTypingUsers);
          socket.off('reaction_added', handleReactionAdded);
        };
      } catch (error) {
        console.error('Failed to initialize socket:', error);
        setIsConnected(false);
      }
    };

    const cleanup = initializeSocket();

    return () => {
      cleanup.then(cleanupFn => {
        if (cleanupFn) cleanupFn();
      });
    };
  }, []);

  return {
    messages,
    users,
    typingUsers,
    isConnected,
    currentUser,
    joinChat,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    addReaction,
  };
}; 
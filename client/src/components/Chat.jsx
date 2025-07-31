import { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import UserList from './UserList';
import MessageInput from './MessageInput';

const Chat = ({ 
  messages, 
  users, 
  typingUsers, 
  isConnected, 
  currentUser, 
  sendMessage, 
  setTyping,
  addReaction 
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <h2>Chat Room</h2>
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
            <span className="status-text">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className="users-toggle"
            onClick={() => setShowUsers(!showUsers)}
          >
            Users ({users.length})
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Messages */}
        <div className="messages-container">
          <MessageList 
            messages={messages} 
            currentUser={currentUser}
            addReaction={addReaction}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* Users Sidebar */}
        {showUsers && (
          <div className="users-sidebar">
            <UserList 
              users={users} 
              currentUser={currentUser}
              typingUsers={typingUsers}
            />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="chat-input-container">
        <MessageInput 
          onSendMessage={sendMessage}
          onTyping={setTyping}
          isConnected={isConnected}
        />
      </div>
    </div>
  );
};

export default Chat; 
import { useState } from 'react';

const MessageList = ({ messages, currentUser, addReaction }) => {
  const [hoveredMessage, setHoveredMessage] = useState(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleReaction = (messageId, reaction) => {
    addReaction(messageId, reaction);
  };

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="no-messages">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.system ? 'system-message' : ''} ${
              message.senderId === currentUser?.id ? 'own-message' : ''
            }`}
            onMouseEnter={() => setHoveredMessage(message.id)}
            onMouseLeave={() => setHoveredMessage(null)}
          >
            {message.system ? (
              <div className="system-message-content">
                <span className="system-text">{message.message}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            ) : (
              <>
                <div className="message-header">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                
                <div className="message-content">
                  <p>{message.message}</p>
                </div>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="message-reactions">
                    {message.reactions.map((reaction, index) => (
                      <span key={index} className="reaction">
                        {reaction}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reaction buttons */}
                {hoveredMessage === message.id && (
                  <div className="reaction-buttons">
                    {reactions.map((reaction) => (
                      <button
                        key={reaction}
                        className="reaction-button"
                        onClick={() => handleReaction(message.id, reaction)}
                        title="Add reaction"
                      >
                        {reaction}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList; 
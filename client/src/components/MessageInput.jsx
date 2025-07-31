import { useState, useEffect, useRef } from 'react';

const MessageInput = ({ onSendMessage, onTyping, isConnected }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (message.trim() && isConnected) {
      await onSendMessage(message);
      setMessage('');
      setIsTyping(false);
      await onTyping(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setMessage(value);

    // Handle typing indicator
    if (value.trim()) {
      if (!isTyping) {
        setIsTyping(true);
        await onTyping(true);
      }
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(async () => {
        setIsTyping(false);
        await onTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
      await onTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            disabled={!isConnected}
            className="message-input"
            rows="1"
          />
          
          <button
            type="submit"
            disabled={!message.trim() || !isConnected}
            className="send-button"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput; 
import { useState } from 'react';

const Login = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    setError('');
    onJoin(username.trim());
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Chat App</h1>
        <p>Enter your username to join the conversation</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="username-input"
              autoFocus
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <button type="submit" className="join-button">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 
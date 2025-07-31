import { useState } from 'react';
import { useChat } from './hooks/useChat';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    messages,
    users,
    typingUsers,
    isConnected,
    currentUser,
    joinChat,
    sendMessage,
    setTyping,
    addReaction,
  } = useChat();

  const handleJoin = (username) => {
    joinChat(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onJoin={handleJoin} />
      ) : (
        <div className="chat-app">
          <Chat
            messages={messages}
            users={users}
            typingUsers={typingUsers}
            isConnected={isConnected}
            currentUser={currentUser}
            sendMessage={sendMessage}
            setTyping={setTyping}
            addReaction={addReaction}
          />
          
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

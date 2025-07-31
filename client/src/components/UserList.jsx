const UserList = ({ users, currentUser, typingUsers }) => {
  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      
      <div className="users-container">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${
              user.id === currentUser?.id ? 'current-user' : ''
            }`}
          >
            <div className="user-info">
              <span className="user-name">{user.username}</span>
              {user.id === currentUser?.id && (
                <span className="current-user-badge">You</span>
              )}
            </div>
            
            {typingUsers.includes(user.username) && (
              <div className="typing-indicator">
                <span className="typing-text">typing...</span>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList; 
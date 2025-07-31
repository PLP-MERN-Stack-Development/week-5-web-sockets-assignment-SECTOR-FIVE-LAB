# Web Socket Chat Application

A real-time chat application built with MERN stack and Socket.io for Web Socket functionality.

## Features

- Real-time messaging
- User presence (join/leave notifications)
- Typing indicators
- Message reactions
- User list with online status
- Responsive design
- Beautiful modern UI

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── socket/      # Socket.io client utilities
│   │   └── App.jsx      # Main app component
├── server/          # Node.js backend
│   ├── server.js    # Main server file with Socket.io
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the chat application

## How to Use

1. **Join the Chat**
   - Enter your username in the login screen
   - Click "Join Chat" to enter the chat room

2. **Send Messages**
   - Type your message in the input field
   - Press Enter or click the send button
   - Messages appear in real-time for all connected users

3. **View Users**
   - Click the "Users" button to see all online users
   - See who is currently typing

4. **Add Reactions**
   - Hover over any message to see reaction options
   - Click on an emoji to add a reaction

5. **Logout**
   - Click the "Logout" button to return to the login screen

## Features Explained

### Real-time Messaging
- Messages are sent instantly to all connected users
- No page refresh required
- Messages are stored temporarily in server memory

### User Presence
- Users are notified when someone joins or leaves
- Online user list updates in real-time
- Connection status indicator

### Typing Indicators
- Shows when someone is typing
- Automatically disappears after 1 second of inactivity
- Animated typing dots

### Message Reactions
- Add emoji reactions to any message
- Reactions are visible to all users
- Hover over messages to see reaction options

### Responsive Design
- Works on desktop and mobile devices
- Adaptive layout for different screen sizes
- Touch-friendly interface

## Technical Details

### Backend (Node.js + Socket.io)
- Express server with Socket.io integration
- CORS enabled for frontend communication
- Real-time event handling
- User management and message broadcasting

### Frontend (React + Socket.io-client)
- React functional components with hooks
- Custom useChat hook for state management
- Socket.io-client for Web Socket connection
- Modern CSS with gradients and animations

### Web Socket Events
- `user_join`: User joins the chat
- `send_message`: Send a message to all users
- `typing`: Typing indicator
- `receive_message`: Receive a message
- `user_list`: Update user list
- `user_joined/user_left`: User presence notifications
- `add_reaction`: Add reaction to message

## Development

### Adding New Features
1. Add new Socket.io events in `server/server.js`
2. Handle events in the frontend `useChat` hook
3. Create new React components as needed
4. Update styles in `App.css`

### Customization
- Modify colors in CSS variables
- Add new message types
- Implement private messaging
- Add file upload functionality
- Integrate with a database for message persistence

## Troubleshooting

### Connection Issues
- Ensure both servers are running
- Check that ports 5000 and 5173 are available
- Verify CORS settings in server.js

### Message Not Sending
- Check browser console for errors
- Verify Socket.io connection status
- Ensure username is set before sending messages

## License

This project is for educational purposes as part of the MERN Stack Development course. 
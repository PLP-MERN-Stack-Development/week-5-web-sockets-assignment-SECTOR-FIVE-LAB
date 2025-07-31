// socket.js - Socket.io client setup

import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.connectionPromise = null;
  }

  connect() {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      if (!this.socket) {
        this.socket = io(SOCKET_URL, {
          transports: ['websocket', 'polling'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        this.socket.on('connect', () => {
          console.log('Connected to server');
          this.isConnected = true;
          resolve(this.socket);
        });

        this.socket.on('disconnect', () => {
          console.log('Disconnected from server');
          this.isConnected = false;
        });

        this.socket.on('connect_error', (error) => {
          console.error('Connection error:', error);
          this.isConnected = false;
          reject(error);
        });

        // If already connected, resolve immediately
        if (this.socket.connected) {
          this.isConnected = true;
          resolve(this.socket);
        }
      } else {
        resolve(this.socket);
      }
    });

    return this.connectionPromise;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionPromise = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  isSocketConnected() {
    return this.isConnected && this.socket && this.socket.connected;
  }

  async getConnectedSocket() {
    if (!this.socket || !this.socket.connected) {
      await this.connect();
    }
    return this.socket;
  }
}

export default new SocketService(); 
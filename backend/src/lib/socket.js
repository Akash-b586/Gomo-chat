// socket.js

// Import necessary modules
import { Server } from "socket.io";
import http from "http";
import express from "express";

// Initialize the Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize the Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Allowed origins for cross-origin requests
  },
});

// Used to store the mapping of user IDs to their respective socket IDs
const userSocketMap = {}; // Format: { userId: socketId }

/**
 * Retrieves the socket ID of a user by their user ID.
 * 
 * @param {string} userId - The ID of the user.
 * @returns {string | undefined} - The socket ID associated with the user, or undefined if the user is not online.
 */
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Extract userId from the socket handshake query
  const userId = socket.handshake.query.userId;

  if (userId) {
    // Map the user ID to their socket ID
    userSocketMap[userId] = socket.id;
  }

  // Notify all clients about the updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the user from the map and update the online users list
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export the io instance, Express app, and server for use in other modules
export { io, app, server };

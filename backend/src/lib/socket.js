// socket.js

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://gomo-chat.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Used to store the mapping of user IDs to their respective socket IDs
const userSocketMap = {}; // Format: { userId: socketId }


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

export { io, app, server };

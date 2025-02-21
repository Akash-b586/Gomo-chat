import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;  // Provide a fallback port
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Dynamic CORS configuration based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Graceful Shutdown
const shutdown = () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Closed all connections.");
    process.exit(0);
  });
};

// Catch uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception: ", err);
  shutdown();
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection: ", err);
  shutdown();
});

// Start server
server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB();
});

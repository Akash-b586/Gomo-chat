// message.routes.js

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { sendMessage, getMessages, getUsersForSidebar } from "../controllers/message.controller.js";

const router = express.Router();

/**
 * GET /users
 * 
 * Endpoint to fetch the list of users who are available for chatting.
 * This route is protected and requires authentication using `protectRoute` middleware.
 * 
 * @route GET /messages/users
 * @returns {Object} List of users available for chat in the sidebar.
 */
router.get("/users", protectRoute, getUsersForSidebar);

/**
 * GET /:id
 * 
 * Endpoint to fetch all messages exchanged between the authenticated user and the user with the provided ID.
 * This route is protected and requires authentication using `protectRoute` middleware.
 * 
 * @route GET /messages/:id
 * @param {string} id - The user ID to fetch the message history with.
 * @returns {Array} List of messages between the authenticated user and the specified user.
 */
router.get("/:id", protectRoute, getMessages);

/**
 * POST /send/:id
 * 
 * Endpoint to send a message to a specific user identified by their user ID.
 * This route is protected and requires authentication using `protectRoute` middleware.
 * 
 * @route POST /messages/send/:id
 * @param {string} id - The user ID to whom the message will be sent.
 * @returns {Object} The sent message or confirmation.
 */
router.post("/send/:id", protectRoute, sendMessage);

export default router;

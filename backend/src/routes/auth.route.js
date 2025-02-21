import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * POST /signup
 * 
 * Endpoint to register a new user. Expects user details such as username, email, password, etc.
 * Calls the signup controller function to handle the logic.
 */
router.post("/signup", signup);

/**
 * POST /login
 * 
 * Endpoint to authenticate a user and provide a JWT token.
 * Expects email and password for login. 
 * Calls the login controller function to handle the authentication logic.
 */
router.post("/login", login);

/**
 * POST /logout
 * 
 * Endpoint to logout a user by clearing the JWT token.
 * Calls the logout controller function to handle the logout logic.
 */
router.post("/logout", logout);

/**
 * PUT /update-profile
 * 
 * Endpoint to allow an authenticated user to update their profile.
 * Requires the user to be logged in, validated by the `protectRoute` middleware.
 * Calls the updateProfile controller function to update user data.
 */
router.put("/update-profile", protectRoute, updateProfile);

/**
 * GET /check
 * 
 * Endpoint to check if the user is authenticated. 
 * Returns user details if the user is logged in.
 * Requires the user to be logged in, validated by the `protectRoute` middleware.
 */
router.get("/check", protectRoute, checkAuth);

export default router;

// protectRoute.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Middleware function to protect routes by verifying the JWT token.
 * Ensures that only authenticated users can access certain routes.
 *
 * @param {Object} req - The request object from the Express middleware.
 * @param {Object} res - The response object from the Express middleware.
 * @param {Function} next - The next middleware function to call.
 * @returns {void} - Calls `next()` if the token is valid and the user is authenticated.
 */
export const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    // If no token is provided, return Unauthorized error
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is invalid, return Unauthorized error
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find the user in the database based on the userId stored in the token
    const user = await User.findById(decoded.userId).select("-password");

    // If user is not found, return Not Found error
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Attach the user object to the request object for access in subsequent middleware or route handlers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in protectRoute middleware: ", error.message);

    // Return a server error if something goes wrong during token validation
    res.status(500).json({ message: "Internal Server Error" });
  }
};

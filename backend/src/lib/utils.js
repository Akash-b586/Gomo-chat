// auth.js

// Import the jsonwebtoken library
import jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) for the specified user and sets it as a cookie in the response.
 *
 * @param {string} userId - The unique identifier for the user.
 * @param {Object} res - The Express response object used to set the cookie.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (userId, res) => {
  // Generate a JWT token with the user ID as the payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expiration time (7 days)
  });

  // Set the token as a secure, HTTP-only cookie in the response
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (7 days)
    httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript to prevent XSS attacks
    sameSite: "strict", // Restricts the cookie to the same site to prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development", // Sends the cookie over HTTPS in production
  });

  return token;
};

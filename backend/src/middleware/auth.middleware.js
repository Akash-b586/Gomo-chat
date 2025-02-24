// protectRoute.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find the user in the database based on the userId stored in the token
    const user = await User.findById(decoded.userId).select("-password");

    // If user is not found, return Not Found error
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the Mongoose library.
 * 
 * Environment variables required:
 * - MONGODB_URI: The connection string for your MongoDB database.
 * 
 * Example .env configuration:
 * ```
 * MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority
 * ```
 * 
 * This function attempts to establish a connection and logs:
 * - A success message with the host if the connection is successful.
 * - An error message if the connection fails.
 */
export const connectDB = async () => {
  try {
    // Connect to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log success message with the host of the connection
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error details for debugging
    console.error("MongoDB connection error:", error);

    // Optionally exit the process if the connection fails
    process.exit(1); // Exit with failure code
  }
};

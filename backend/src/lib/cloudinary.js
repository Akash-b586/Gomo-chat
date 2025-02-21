import { v2 as cloudinary } from "cloudinary";

// Import the dotenv library to load environment variables from a .env file
import { config } from "dotenv";

// Load environment variables from the .env file into process.env
config();

/**
 * Configures Cloudinary with credentials from environment variables.
 *
 * Environment variables required:
 * - CLOUDINARY_CLOUD_NAME: The Cloudinary cloud name associated with your account.
 * - CLOUDINARY_API_KEY: Your Cloudinary API key.
 * - CLOUDINARY_API_SECRET: Your Cloudinary API secret.
 *
 * Make sure to define these variables in your `.env` file:
 * ```
 * CLOUDINARY_CLOUD_NAME=your-cloud-name
 * CLOUDINARY_API_KEY=your-api-key
 * CLOUDINARY_API_SECRET=your-api-secret
 * ```
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured Cloudinary instance for use in other parts of the application
export default cloudinary;

import axios from "axios";

/**
 * Axios Instance Configuration
 * 
 * Creates a pre-configured axios instance for API communication with:
 * - Environment-specific base URL
 * - Credentials inclusion for authentication
 * 
 * @constant {Object} axiosInstance
 * 
 * @example
 * // Import and use for API calls
 * axiosInstance.get('/users')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 */
export const axiosInstance = axios.create({
    /**
   * Base URL configuration
   * - Development: Local server endpoint
   * - Production: Relative API endpoint
   */
  baseURL: import.meta.env.MODE === "development"
  ? "http://localhost:5001/api" // Local development server
  : "/api",                     // Production API endpoint

  /**
   * Enable credentials for cross-origin requests
   * - Sends cookies and authentication headers
   * - Maintains session state with backend
   */
  withCredentials: true,
});

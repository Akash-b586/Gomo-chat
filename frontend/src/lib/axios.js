import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
  ? "https://gomo-chat.onrender.com/api"
  : "https://gomo-chat.onrender.com/api",                     

  withCredentials: true,
});

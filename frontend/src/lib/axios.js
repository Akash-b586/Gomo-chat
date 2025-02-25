import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
  ? "https://gomo-chat.onrender.com/"
  : "https://gomo-chat.onrender.com/",                     

  withCredentials: true,
});

import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

/**
 * Zustand store for managing chat-related data and actions.
 * 
 * @description This store manages the state and logic for a chat application. 
 * It handles fetching users, retrieving messages, sending messages, and 
 * real-time updates using WebSocket subscriptions.
 */
export const useChatStore = create((set, get) => ({
  // State properties
  messages: [], // Stores chat messages for the selected user
  users: [], // List of users available for messaging
  selectedUser: null, // Currently selected user for messaging
  isUsersLoading: false, // Indicates if the user list is being fetched
  isMessagesLoading: false, // Indicates if the messages are being fetched

  /**
   * Fetches the list of users available for messaging.
   * 
   * @async
   * @throws Displays a toast notification in case of an error during the request.
   */
  getUsers: async () => {
    set({ isUsersLoading: true }); // Set loading state to true
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data }); // Update the user list with the response data
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false }); // Reset loading state
    }
  },

  /**
   * Fetches the chat messages for a specific user.
   * 
   * @async
   * @param {string} userId - ID of the user whose messages should be fetched.
   * @throws Displays a toast notification in case of an error during the request.
   */
  getMessages: async (userId) => {
    set({ isMessagesLoading: true }); // Set loading state to true
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data }); // Update messages with the response data
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false }); // Reset loading state
    }
  },

  /**
   * Sends a message to the currently selected user.
   * 
   * @async
   * @param {object} messageData - The data of the message to be sent.
   * @throws Displays a toast notification in case of an error during the request.
   */
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] }); // Append the new message to the existing messages
    } catch (error) {
      toast.error(error.response.data.message || "Failed to send message");
    }
  },

  /**
   * Subscribes to real-time updates for new messages via WebSocket.
   * 
   * @description Listens for the "newMessage" event on the WebSocket connection
   * and updates the messages state if the new message is from the selected user.
   */
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return; // Exit if no user is selected

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return; // Ignore messages from other users

      set({
        messages: [...get().messages, newMessage], // Add the new message to the chat
      });
    });
  },

  /**
   * Unsubscribes from the "newMessage" event on the WebSocket connection.
   * 
   * @description Ensures that the listener for real-time message updates is removed
   * to prevent memory leaks or redundant updates when switching users.
   */
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage"); // Remove the "newMessage" event listener
  },

  /**
   * Sets the selected user for messaging.
   * 
   * @param {object} selectedUser - The user object to set as the currently selected user.
   */
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

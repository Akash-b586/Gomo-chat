import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

// Define Zustand store for chat functionality
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Function to fetch users in the chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Function to fetch messages for a selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Function to send a new message
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const optimisticMessage = { ...messageData, _id: generateUniqueId() }; // Create an optimistic ID for the message

    // Add the optimistic message to the messages list
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      
      // Update the message with the actual server response
      set({
        messages: messages.map(msg =>
          msg._id === optimisticMessage._id ? res.data : msg
        ),
      });
    } catch (error) {
      // Handle failure and optionally rollback
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  // Function to subscribe to new incoming messages for the selected user
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    
    if (socket?.connected) {
      socket.on("newMessage", (newMessage) => {
        // Ensure the new message is from the selected user
        if (newMessage.senderId === selectedUser._id) {
          set({
            messages: [...get().messages, newMessage],
          });
        }
      });
    }
  },

  // Function to unsubscribe from receiving new messages for the selected user
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket?.connected) {
      socket.off("newMessage");
    }
  },

  // Function to set the selected user and manage subscription to messages
  setSelectedUser: (selectedUser) => {
    // Unsubscribe from the previous user's messages
    get().unsubscribeFromMessages();
    set({ selectedUser });

    // Subscribe to the new user's messages
    get().subscribeToMessages();
  },
}));

// Helper function to generate unique message IDs (optimistic UI)
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random()}`; // Generate a simple unique ID based on timestamp and random number
};

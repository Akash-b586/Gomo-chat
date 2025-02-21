import User from "../models/user.model.js";
import Message from "../models/message.model.js";


import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

/**
 * @description Retrieves all users except the logged-in user for the sidebar display.
 * @route GET /messages/users
 * @access Private
 */
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get all users except the logged-in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @description Retrieves all messages between the logged-in user and another user.
 * @route GET /messages/:id
 * @access Private
 */
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // Fetch messages exchanged between logged-in user and the selected user
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).populate('senderId receiverId', 'fullName profilePic'); // Optional: Populate sender/receiver details

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @description Handles sending a new message (text and/or image) between users.
 * @route POST /messages/send/:id
 * @access Private
 */
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to Cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    // Create new message instance
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Save the message to the database
    await newMessage.save();

    // Realtime functionality: Emit to receiver via socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // Send real-time notification to the receiver
      io.to(receiverSocketId).emit("newMessage", newMessage);
    } else {
      console.log(`Receiver with ID ${receiverId} is not online`);
      // Optionally handle case where receiver is offline (e.g., store notification in DB or queue)
    }

    // Respond with the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

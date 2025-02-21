import { config } from "dotenv";
import bcrypt from "bcryptjs";  // Import bcryptjs for password hashing
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

// Sample users for seeding the database
const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",  // This will be hashed
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",  // This will be hashed
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  // Add the remaining users...
];

const seedDatabase = async () => {
  try {
    await connectDB();  // Ensure your connectDB function is correctly set up

    // Hash passwords before inserting into database
    const usersWithHashedPasswords = await Promise.all(seedUsers.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);  // Hash the password with a salt rounds of 10
      return { ...user, password: hashedPassword };
    }));

    // Insert users with hashed passwords
    await User.insertMany(usersWithHashedPasswords);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();

import { config } from "dotenv";
import bcrypt from "bcryptjs";  // Import bcryptjs for password hashing
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();  // Load environment variables

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
  // Add more users as needed...
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Hash passwords before inserting into the database
    const usersWithHashedPasswords = await Promise.all(
      seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);  // Hash the password with 10 salt rounds
        return { ...user, password: hashedPassword };
      })
    );

    // Insert users with hashed passwords into the database
    const insertedUsers = await User.insertMany(usersWithHashedPasswords);

    // Log success message with inserted user count
    console.log(`Successfully seeded ${insertedUsers.length} users`);
  } catch (error) {
    console.error("Error seeding the database:", error.message || error);
  }
};

// Call the function to seed the database
seedDatabase();

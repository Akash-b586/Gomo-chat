import { config } from "dotenv";
import bcrypt from "bcryptjs";  // Import bcryptjs for password hashing
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();  

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456", 
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",  
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    const usersWithHashedPasswords = await Promise.all(
      seedUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);  
        return { ...user, password: hashedPassword };
      })
    );

    const insertedUsers = await User.insertMany(usersWithHashedPasswords);

    console.log(`Successfully seeded ${insertedUsers.length} users`);
  } catch (error) {
    console.error("Error seeding the database:", error.message || error);
  }
};

seedDatabase();

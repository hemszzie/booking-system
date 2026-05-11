import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Expert from "../models/Expert.js";

dotenv.config();

connectDB();

const experts = [
  {
    name: "John Smith",
    category: "Fitness",
    experience: 5,
    rating: 4.8,
    bio: "Certified fitness trainer",

    availableSlots: [
      {
        date: "2026-05-12",
        slots: ["10:00 AM", "11:00 AM", "2:00 PM"],
      },

      {
        date: "2026-05-13",
        slots: ["9:00 AM", "1:00 PM"],
      },
    ],
  },

  {
    name: "Sarah Johnson",
    category: "Career",
    experience: 8,
    rating: 4.9,
    bio: "Career guidance expert",

    availableSlots: [
      {
        date: "2026-05-12",
        slots: ["12:00 PM", "3:00 PM"],
      },
    ],
  },
];

const seedData = async () => {
  try {
    await Expert.deleteMany();

    await Expert.insertMany(experts);

    console.log("Experts Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedData();
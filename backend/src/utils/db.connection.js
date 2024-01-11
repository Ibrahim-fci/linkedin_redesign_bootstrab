import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnetion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("invalid connection: ", error.message);
  }
};

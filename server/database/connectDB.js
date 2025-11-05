import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;

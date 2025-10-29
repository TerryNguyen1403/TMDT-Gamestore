import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/game-store-2";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error: ", error.message);
    process.exit(1);
  }
};

export default connectDB;

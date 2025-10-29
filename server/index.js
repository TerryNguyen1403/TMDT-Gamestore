// Import modules
import express from "express";
import "dotenv/config";
import cors from "cors";

// Initialize Express
const app = express();

// Use middlewares
app.use(express.json());
app.use(cors());

// Import connection
import connectDB from "./database/connectDB.js";

// Connect to MongoDB
connectDB();

// Import routes
import gameRoute from "./routes/gameRoute.js";

// Routes
app.use("/api/game", gameRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

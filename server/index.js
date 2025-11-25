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
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import adminRoute from "./routes/adminRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Routes
app.use("/api/game", gameRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/admin", adminRoute);
app.use("/api/orders", orderRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

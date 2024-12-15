import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import blockRoutes from "./routes/getBlocks.js";
import timeroutes from "./routes/timeRoutes.js";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB server:", err));

// Routes
app.use("/api/blocks", blockRoutes); // Block-related routes
app.use("/api/time", timeroutes); // Time-related routes

// Default Route
app.get("/", (req, res) => res.send("API is running..."));

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

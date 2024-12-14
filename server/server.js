import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import timeRoutes from "./models/TimeD.js"; // Import the router

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

// Check if the Block model is already defined to prevent overwriting
const BlockSchema = new mongoose.Schema({
  blockId: String,
  blockName: String,
  classes: Array,
});

const Block = mongoose.models.Block || mongoose.model("Block", BlockSchema);

// Use the timeRoutes as middleware for /api/time
app.use("/api/time", timeRoutes); // This will use the router correctly

// Routes
app.get("/", (req, res) => res.send("API is running... correctly "));

// API Endpoint to Get Block Data
app.get("/api/blocks/:blockName", async (req, res) => {
  const { blockName } = req.params;

  try {
    // Fetch the block data from MongoDB
    const block = await Block.findOne({ blockName });

    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }

    res.status(200).json(block);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"; // To create an HTTP server
import { Server } from "socket.io"; // For WebSocket functionality

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

// Create HTTP server
const server = http.createServer(app);

// Integrate Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL if necessary
    methods: ["GET", "POST"],
  },
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Example: Emitting a message to the client
  socket.emit("serverMessage", "Welcome to the WebSocket server!");

  // Example: Listening to client messages (optional)
  socket.on("clientMessage", (message) => {
    console.log("Message from client:", message);
  });

  // Emit a test event every 5 seconds (for testing)
  setInterval(() => {
    socket.emit("classStatusUpdated", {
      classId: "test-class",
      status: "available",
    });
  }, 5000);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Helper function to emit class status updates
export const emitClassStatusUpdate = (classId, status) => {
  io.emit("classStatusUpdated", { classId, status });
  console.log(
    `Class status updated: { classId: ${classId}, status: ${status} }`
  );
};

// Start the server
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

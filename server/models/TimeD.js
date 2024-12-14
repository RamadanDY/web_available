import express from "express";

const router = express.Router();

// Define routes for time entries
router.post("/", (req, res) => {
  res.send("Time entry saved");
});

router.get("/", (req, res) => {
  res.send("Get all time entries");
});

export default router; // Export the router

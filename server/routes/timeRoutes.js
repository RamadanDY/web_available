import express from "express";
import TimeD from "../modules/TimeD.js"; // Make sure the import path is correct

const router = express.Router(); // Create an Express Router

// Route to save the time entry
router.post("/save-time", async (req, res) => {
  try {
    const { userId, blockId, startTime, endTime } = req.body;

    // Create a new time entry
    const newTimeEntry = new TimeD({
      userId,
      blockId,
      startTime,
      endTime,
    });

    // Save to the database
    await newTimeEntry.save();

    res.status(200).json({
      message: "Time entry saved successfully",
      newTimeEntry,
    });
  } catch (error) {
    console.error("Error saving time entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router; // Use ES module export

// routes/timeRoutes.js
const express = require("express");
const TimeEntry = require("../models/TimeD");

const router = express.Router(); // Create an Express Router

// Route to save the time entry
router.post("/save-time", async (req, res) => {
  try {
    const { duration } = req.body;

    // Create a new time entry
    const newTimeEntry = new TimeEntry({
      duration,
    });

    // Save to the database
    await newTimeEntry.save();

    res
      .status(200)
      .json({ message: "Time entry saved successfully", newTimeEntry });
  } catch (error) {
    console.error("Error saving time entry:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

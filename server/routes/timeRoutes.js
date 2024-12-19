import express from "express";
import TimeD from "../modules/TimeD.js"; // Make sure the path is correct

const router = express.Router(); // Create an Express Router

// Middleware to parse incoming JSON requests
router.use(express.json());

// Test Route: Simple GET
router.get("/hello", async (req, res) => {
  const { classId, startTime, endTime, duration, update } = req.body;
  console.log("Data received:", {
    classId,
    startTime,
    endTime,
    duration,
    update,
  });

  res.send("Data logged successfully");
});

// Update Route: PUT to update time-related fields
router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  // Check for required fields
  if (!blockId || !classId || !startTime || !endTime || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Database logic to update class timings
    const updatedBlock = await TimeD.findOneAndUpdate(
      { blockId, "classes.classId": classId }, // Match block and class
      {
        $set: {
          "classes.$.startTime": startTime,
          "classes.$.endTime": endTime,
          "classes.$.duration": duration,
          "classes.$.lastUpdated": new Date(),
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlock) {
      return res.status(404).json({ message: "Block or class not found" });
    }

    res
      .status(200)
      .json({ message: "Class time updated successfully", updatedBlock });
  } catch (error) {
    console.error("Error updating class time:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

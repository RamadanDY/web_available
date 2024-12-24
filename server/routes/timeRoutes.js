import express from "express";
import TimeD from "../modules/TimeD.js";

const router = express.Router();

// Update Route: PUT to update time-related fields
router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  console.log("Received payload:", req.body); // Log the received payload

  // Check for required fields
  if (!blockId || !classId || !startTime || !endTime || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Database logic to update class timings
    const query = { blockId, "classes.classId": classId };
    console.log("Query:", query); // Log the query

    const block = await TimeD.findOne(query);
    console.log("Block found:", block, error); // Log the found block

    if (!block) {
      return res.status(404).json({ message: "Block or class not found" });
    }

    const updatedBlock = await TimeD.findOneAndUpdate(
      query, // Match block and class
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

    console.log("Updated Block:", updatedBlock); // Log the updated block

    res.json(updatedBlock);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

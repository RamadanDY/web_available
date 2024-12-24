import express from "express";
import TimeD from "../modules/TimeD.js"; // Import your Mongoose model

const router = express.Router();

// Update Route: PUT to update time-related fields
router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  console.log("Received payload:", req.body); // Log the received payload for debugging

  // Check for required fields
  if (!blockId || !classId || !startTime || !endTime || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Construct query to find the specific block and class
    const query = { blockId, "classes.classId": classId };
    console.log("Query:", query); // Log the query for debugging

    // Check if the block exists
    const block = await TimeD.findOne(query);
    console.log("Block found:", block); // Log the found block

    if (!block) {
      return res.status(404).json({ message: "Block or class not found" });
    }

    // Update the class timings in the block
    const updatedBlock = await TimeD.findOneAndUpdate(
      query, // Match block and class
      {
        $set: {
          "classes.$.startTime": startTime,
          "classes.$.endTime": endTime,
          "classes.$.duration": duration,
          "classes.$.lastUpdated": new Date(), // Update the lastUpdated timestamp
        },
      },
      { new: true } // Return the updated document
    );

    console.log("Updated Block:", updatedBlock); // Log the updated block
    res.json(updatedBlock); // Respond with the updated block
  } catch (error) {
    console.error("Error updating block:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

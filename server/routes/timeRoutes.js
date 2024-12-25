import express from "express";
import TimeD from "../modules/TimeD.js"; // Ensure the correct path to the model

const router = express.Router();

// Update Route: PUT to update time-related fields
router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  console.log("Received payload at the server side:", req.body); // Log the received payload

  // Check for required fields
  if (!blockId || !classId || !startTime || !endTime || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Query to find the block with the given blockId and classId inside the classes array
    const query = { blockId, "classes.classId": classId };
    console.log("Query:", query); // Log the query

    // Find the block without using projection
    const block = await TimeD.findOne(query);

    // Check if block is null and specify potential reasons
    if (!block) {
      console.error(
        `Block not found. Possible reasons: 
        1. blockId '${blockId}' does not exist. 
        2. classId '${classId}' does not match any class in the block's 'classes' array.`
      );
      return res
        .status(404)
        .json({ message: "Block or class not found on the server" });
    }

    console.log("Block found:", block); // Log the block found

    // Update the block
    const updatedBlock = await TimeD.findOneAndUpdate(
      { blockId, "classes.classId": classId }, // Match block and classId
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

    res.json(updatedBlock); // Return the updated block to the client
  } catch (error) {
    console.error("Error updating block:", error.message); // Log the error with specific message
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

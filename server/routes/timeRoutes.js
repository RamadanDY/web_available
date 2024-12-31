import express from "express";
import Block from "../modules/Block.js"; // Adjust the import to use the merged Block model

const router = express.Router();
router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  // Check for missing required fields
  if (!blockId || !classId || !startTime || !endTime || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = { blockId, "classes.classId": classId };

    const block = await Block.findOne(query, { blockId: 1, "classes.$": 1 });

    if (!block) {
      return res
        .status(404)
        .json({ message: "Block or class not found on the server" });
    }

    // Determine the status based on the end time
    const currentTime = new Date();
    const endDate = new Date();
    const [endHour, endMinute] = endTime.split(":").map(Number);
    endDate.setHours(endHour, endMinute, 0, 0);

    const updatedStatus = currentTime >= endDate ? "available" : "unavailable";

    // Update the block with the new class data
    const updatedBlock = await Block.findOneAndUpdate(
      query,
      {
        $set: {
          "classes.$.startTime": startTime,
          "classes.$.endTime": endTime,
          "classes.$.duration": duration,
          "classes.$.lastUpdated": new Date(),
          "classes.$.status": updatedStatus, // Update the status
        },
      },
      { new: true }
    );

    if (updatedBlock) {
      console.log("Block has been updated successfully");
    }

    res.json(updatedBlock);
  } catch (error) {
    console.error("Error updating block:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

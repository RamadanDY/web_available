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

    // Parse the end time
    const convertToDate = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const endDate = convertToDate(endTime);
    const currentTime = new Date();

    // Determine the status
    const updatedStatus = currentTime >= endDate ? "available" : "unavailable";

    // Calculate remaining time in seconds
    const remainingTimeInSeconds = Math.max(
      0,
      Math.floor((endDate - currentTime) / 1000)
    );

    // Update the block with the new class data
    const updatedBlock = await Block.findOneAndUpdate(
      query,
      {
        $set: {
          "classes.$.startTime": startTime,
          "classes.$.endTime": endTime,
          "classes.$.duration": duration,
          "classes.$.lastUpdated": new Date(),
          "classes.$.status": updatedStatus,
        },
      },
      { new: true }
    );

    if (updatedBlock) {
      console.log("Block has been updated successfully");
    }

    res.json({
      updatedBlock,
      remainingTime: remainingTimeInSeconds, // Return the remaining time in seconds
    });
  } catch (error) {
    console.error("Error updating block:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

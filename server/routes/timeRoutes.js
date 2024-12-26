import express from "express";
import Block from "../modules/Block.js"; // Adjust the import to use the merged Block model

const router = express.Router();

router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  console.log("Received payload at the server side:", req.body);

  console.log("blockId:", blockId);
  console.log("classId:", classId);
  console.log("startTime:", startTime);
  console.log("duration:", duration);
  console.log("endTime:", endTime);

  if (!blockId || !classId || !startTime || !endTime || !duration) {
    console.error("Missing one or more required fields:");
    if (!blockId) console.error("blockId is missing or invalid.");
    if (!classId) console.error("classId is missing or invalid.");
    if (!startTime) console.error("startTime is missing or invalid.");
    if (!endTime) console.error("endTime is missing or invalid.");
    if (!duration) console.error("duration is missing or invalid.");

    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = { blockId, "classes.classId": classId };
    console.log("Query:", query);

    const block = await Block.findOne(query, { blockId: 1, "classes.$": 1 });

    if (!block) {
      console.error(
        `Block or class not found. Possible reasons: 
        1. blockId '${blockId}' does not exist. 
        2. classId '${classId}' does not match any class in the block's 'classes' array.`
      );
      return res
        .status(404)
        .json({ message: "Block or class not found on the server" });
    }

    console.log("Block found:", block);

    const updatedBlock = await Block.findOneAndUpdate(
      query,
      {
        $set: {
          "classes.$.startTime": startTime,
          "classes.$.endTime": endTime,
          "classes.$.duration": duration,
          "classes.$.lastUpdated": new Date(),
        },
      },
      { new: true }
    );

    console.log("Updated Block:", updatedBlock);

    res.json(updatedBlock);
  } catch (error) {
    console.error("Error updating block:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

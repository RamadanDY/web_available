import express from "express";
import Block from "../modules/Block.js"; // Adjust the import to use the merged Block model

const router = express.Router();

router.put("/update/time", async (req, res) => {
  const { blockId, classId, startTime, endTime, duration } = req.body;

  // console.log("Received payload at the server side:", req.body);

  if (!blockId || !classId || !startTime || !endTime || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = { blockId, "classes.classId": classId };
    // console.log("Query:", query);

    const block = await Block.findOne(query, { blockId: 1, "classes.$": 1 });

    if (!block) {
      return res
        .status(404)
        .json({ message: "Block or class not found on the server" });
    }

    // console.log("Block found:", block);

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

    if (updatedBlock) {
      console.log("block has been updated successsfully");
    }

    // console.log("Updated Block:", updatedBlock);

    res.json(updatedBlock);
  } catch (error) {
    console.error("Error updating block:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

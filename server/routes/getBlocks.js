import express from "express";
import Block from "../modules/Block.js";
const router = express.Router();

// Route to get block data by block name
router.get("/:blockName", async (req, res) => {
  const { blockName } = req.params;

  try {
    const block = await Block.findOne({ blockName });
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }
    res.json(block);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to get class data by blockId and classId
router.get("/time/:blockId/:classId", async (req, res) => {
  const { blockId, classId } = req.params;

  try {
    const block = await Block.findOne({ blockId });
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    const classItem = block.classes.find((cls) => cls.classId === classId);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    const now = new Date();
    const endDate = new Date(now);
    const [endHours, endMinutes] = classItem.endTime.split(":").map(Number);
    endDate.setHours(endHours, endMinutes, 0, 0);
    const remainingTimeInSeconds = Math.max(
      0,
      Math.floor((endDate - now) / 1000)
    );

    res.json({
      ...classItem.toObject(),
      remainingTime: remainingTimeInSeconds,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

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

// Route to update class status
router.put("/update/status", async (req, res) => {
  const { blockId, classId, status } = req.body;

  try {
    const block = await Block.findOne({ blockId });
    if (!block) {
      return res.status(404).json({ message: "Block not found" });
    }

    const classItem = block.classes.find((cls) => cls.classId === classId);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    classItem.status = status;
    classItem.lastUpdated = new Date();

    await block.save();

    res.json({ message: "Class status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

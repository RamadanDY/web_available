import express from "express";
import Block from "../modules/Block.js";
const router = express.Router();

// Route to get block data
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

export default router;

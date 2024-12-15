import express from "express";
import Block from "../modules/Block.js";
const router = express.Router();

// Route to get block data by blockName
router.get("/:blockName", async (req, res) => {
  const { blockName } = req.params;

  try {
    const block = await Block.findOne({ blockName }); // Fetch block by name
    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }
    res.status(200).json(block); // Return block data
  } catch (error) {
    console.error("Error fetching block:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

// import express from "express";
// import Block from "../modules/Block";
// const router = express.Router();

// // Route to get block data by blockName
// router.get("/:blockName", async (req, res) => {
//   const { blockName } = req.params;

//   try {
//     const block = await Block.findOne({ blockName }); // Find block by name

//     if (!block) {
//       return res.status(404).json({ error: "Block not found" });
//     }

//     res.status(200).json(block); // Return block data
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

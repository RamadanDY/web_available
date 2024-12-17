import express from "express";
import TimeD from "../modules/TimeD.js"; // Make sure the import path is correct
const app = express();

const router = express.Router(); // Create an Express Router
app.use(express.json);
router.get("/hello", async (req, res) => {
  res.send("nope");
});

router.put("/update/time", async (req, res) => {
  res.send("hello");
});

export default router;

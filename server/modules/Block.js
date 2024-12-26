import mongoose from "mongoose";

// Class Schema
const classSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  status: { type: String, default: "available" }, // Optional, with default value
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

// Block Schema
const blockSchema = new mongoose.Schema({
  blockId: { type: String, required: true, unique: true }, // Unique block ID
  blockName: { type: String, required: false }, // Optional block name
  classes: [classSchema], // Embedding classSchema
});

// Combined Model
const Block = mongoose.model("Block", blockSchema);

export default Block;

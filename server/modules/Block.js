import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  blockId: String,
  blockName: String,
  classes: [
    {
      classId: String,
      status: String,
      startTime: String,
      endTime: String,
      lastUpdated: Date,
    },
  ],
});

const Block = mongoose.model("Block", BlockSchema);

export default Block;

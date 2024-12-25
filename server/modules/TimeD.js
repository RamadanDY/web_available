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
      duration: String,
    },
  ],
});

const TimeD = mongoose.model("TimeD", BlockSchema);

export default TimeD;

import mongoose from "mongoose";

const TimeDSchema = new mongoose.Schema({
  blockId: String,
  blockName: String,
  classes: [
    {
      classId: String,
      status: String,
      startTime: String,
      endTime: String,
      duration: String,
      lastUpdated: Date,
    },
  ],
});

const TimeD = mongoose.models.TimeD || mongoose.model("TimeD", TimeDSchema);

export default TimeD;

import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const timeBlockSchema = new mongoose.Schema({
  blockId: { type: String, required: true, unique: true },
  classes: [classSchema], // Array of classes
});

const TimeD = mongoose.model("TimeD", timeBlockSchema);

export default TimeD;

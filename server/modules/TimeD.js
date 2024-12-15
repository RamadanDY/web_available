import mongoose from "mongoose";

const TimeDSchema = new mongoose.Schema({
  userId: String, // ID of the user updating availability
  blockId: String, // Block ID the time entry belongs to
  startTime: Date, // Start time of availability
  endTime: Date, // End time of availability
});

const TimeD = mongoose.models.TimeD || mongoose.model("TimeD", TimeDSchema);

export default TimeD;

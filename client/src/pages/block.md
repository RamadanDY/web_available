# block

lets get both the class id and the block id
wait oo is it because of the not available that is showing in the timeD compo that is making me not find the specific class in my db //THIS PROBLEM HAS BEEN SOLVED

# UPDATING OF THE DATA WE GET FROM THE USER UNSIDE THE DB

the yawa be say we for

#

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

####

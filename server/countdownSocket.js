// sockets/countdownSocket.js
import moment from "moment";
import Block from "./modules/Block.js";

// Helper function to calculate remaining time
const calculateRemainingTime = (startTime, endTime) => {
  const now = moment();
  const start = moment(startTime, "hh:mm A");
  const end = moment(endTime, "hh:mm A");

  if (now.isBefore(start)) {
    return { remainingTime: end.diff(start, "seconds"), isRunning: false };
  } else if (now.isAfter(end)) {
    return { remainingTime: 0, isRunning: false };
  } else {
    return { remainingTime: end.diff(now, "seconds"), isRunning: true };
  }
};

const countdownSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinClass", async ({ blockId, classId }) => {
      try {
        const block = await Block.findOne({ blockId });
        if (!block) {
          socket.emit("error", { message: "Block not found" });
          return;
        }

        const classData = block.classes.find((cls) => cls.classId === classId);
        if (!classData) {
          socket.emit("error", { message: "Class not found" });
          return;
        }

        const { startTime, endTime } = classData;
        const initialData = calculateRemainingTime(startTime, endTime);
        socket.emit("initialTime", initialData);

        if (initialData.remainingTime > 0) {
          const interval = setInterval(() => {
            const updatedData = calculateRemainingTime(startTime, endTime);
            socket.emit("updateTime", updatedData);

            if (updatedData.remainingTime <= 0) {
              clearInterval(interval);
              classData.status = "available"; // Update status when countdown completes
              block.save(); // Save updated block data
              socket.emit("classStatusUpdated", {
                classId,
                status: "available",
              });
            }
          }, 1000);

          socket.on("disconnect", () => {
            console.log("A user disconnected");
            clearInterval(interval);
          });
        }
      } catch (error) {
        console.error("Error handling joinClass:", error);
        socket.emit("error", { message: "Server error", error: error.message });
      }
    });
  });
};

export default countdownSocket;

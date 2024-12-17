import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const TimeD = () => {
  const [startTime, setStartTime] = useState("07:00 AM");
  const [endTime, setEndTime] = useState("07:00 AM");
  const [duration, setDuration] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { blockId, classId } = useParams(); // Retrieve classId from the URL

  // Function to calculate the duration
  const calculateDuration = (start, end) => {
    const convertToMinutes = (time) => {
      const [timeStr, modifier] = time.split(" ");
      const [hours, minutes] = timeStr.split(":").map(Number);
      let totalMinutes = hours * 60 + minutes;
      if (modifier === "PM" && hours !== 12) totalMinutes += 12 * 60;
      if (modifier === "AM" && hours === 12) totalMinutes -= 12 * 60;
      return totalMinutes;
    };

    const startMinutes = convertToMinutes(start);
    const endMinutes = convertToMinutes(end);
    let diffMinutes = endMinutes - startMinutes;

    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setDuration(`${hours} hours ${minutes} minutes`);
  };

  useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

  const generateTimeOptions = () => {
    const options = [];
    for (let h = 7; h < 19; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h > 12 ? h - 12 : h;
        const minute = String(m).padStart(2, "0");
        const period = h >= 12 ? "PM" : "AM";
        const formattedTime = `${String(hour).padStart(2, "0")}:${minute} ${period}`;
        options.push(formattedTime);
      }
    }
    return options;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await axios.post("http://localhost:5000/api/time/save-time", {
        startTime,
        endTime,
        duration,
        userId: classId, // Pass the classId directly
        blockId: blockId, // Replace with dynamic block ID if needed
      });
      console.log("Payload being sent to the server:", payload); // Debug the payload


      if (response.status === 200) {
        console.log("Duration saved successfully:", response.data);
        navigate("/success-page", { state: { duration } });
      }s
    } catch (error) {
      console.error("Error saving duration:", error.response?.data || error.message);
      alert("Failed to save duration. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="start-time" className="block mb-2 text-sm font-medium">
          Start time:
        </label>
        <select
          id="start-time"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        >
          {generateTimeOptions().map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="end-time" className="block mb-2 text-sm font-medium">
          End time:
        </label>
        <select
          id="end-time"
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        >
          {generateTimeOptions().map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-2 mt-4">
        {duration && <p className="text-lg font-medium">Duration: {duration}</p>}
      </div>
      <div className="col-span-2 flex justify-center mt-4">
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-lg"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Set"}
        </button>
      </div>
    </form>
  );
};

export default TimeD;

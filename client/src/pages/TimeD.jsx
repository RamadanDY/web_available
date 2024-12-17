import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TimeD = () => {
  const [startTime, setStartTime] = useState("07:00 AM");
  const [endTime, setEndTime] = useState("07:00 AM");
  const [duration, setDuration] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Loading state for save operation
  const navigate = useNavigate();

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
    setIsSaving(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/api/time/save-time", {
        startTime,
        endTime,
        duration,
        userId: "12345", // Replace with dynamic user ID if available
        blockId: "BlockA", // Replace with dynamic block ID
      });

      if (response.status === 200) {
        console.log("Duration saved successfully:", response.data);
        navigate("/success-page", { state: { duration } }); // Navigate to the success page
      }
    } catch (error) {
      console.error("Error saving duration:", error);
      alert("Failed to save duration. Please try again.");
    } finally {
      setIsSaving(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Start time:
        </label>
        <select
          id="start-time"
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          End time:
        </label>
        <select
          id="end-time"
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div className="col-span-2 mt-4 bg-red-500 text-white p-4 rounded-md">
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

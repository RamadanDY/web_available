import React, { useState, useEffect } from "react";

const TimeD = () => {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:00");
  const [duration, setDuration] = useState(null);

  // Function to calculate the duration
  const calculateDuration = (start, end) => {
    // Convert time (HH:mm) to minutes
    const startParts = start.split(":");
    const endParts = end.split(":");

    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);

    // Calculate difference
    let diffMinutes = endMinutes - startMinutes;

    // If end time is before start time, assume the end time is on the next day
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60; // Add 24 hours in minutes
    }

    // Convert difference back to hours and minutes
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setDuration(`${hours} hours ${minutes} minutes`);
  };

  // Automatically calculate duration whenever start or end time changes
  useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

  // Array of time options for dropdown (from 00:00 to 23:59)
  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = String(h).padStart(2, "0");
        const minute = String(m).padStart(2, "0");
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  return (
    <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Start time:
        </label>
        <div className="relative">
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
      </div>
      <div>
        <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          End time:
        </label>
        <div className="relative">
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
      </div>

      {/* Displaying the duration */}
      <div className="col-span-2 mt-4 bg-red-500 text-white p-4 rounded-md">
        {duration && (
          <div className="mt-4 text-lg font-medium">
            <p>Duration: {duration}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default TimeD;

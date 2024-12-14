import React, { useState, useEffect } from "react";

const TimeD = () => {
  const [startTime, setStartTime] = useState("07:00 AM");
  const [endTime, setEndTime] = useState("07:00 AM");
  const [duration, setDuration] = useState(null);

  // Function to calculate the duration
  const calculateDuration = (start, end) => {
    // Convert time (HH:mm AM/PM) to minutes
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

  // Array of time options from 7:00 AM to 6:00 PM (in 30-minute intervals)
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

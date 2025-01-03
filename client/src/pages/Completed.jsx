import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Completed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { endTime, duration, blockId } = location.state || {};

  const [countdown, setCountdown] = useState(null);

  // Helper function to convert time string to Date object
  const convertToDate = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours -= 12;
    const now = new Date();
    const date = new Date(now);
    date.setHours(hours, minutes, 0, 0); // Set hours, minutes, and reset seconds
    return date;
  };

  useEffect(() => {
    if (!endTime) return;

    // Calculate target time (endTime)
    const targetTime = convertToDate(endTime);

    const updateCountdown = () => {
      const now = new Date();
      const remainingTime = Math.max(0, Math.floor((targetTime - now) / 1000)); // Remaining time in seconds
      setCountdown(remainingTime);
    };

    updateCountdown(); // Initial calculation

    // Update countdown every second
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endTime]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleViewBlock = () => {
    navigate("/blocka", { state: { blockId, countdown, duration } });
  };

  // Format countdown as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="completed-container flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full mt-12">
        <h2 className="text-2xl font-bold text-center mb-4">Action Completed Successfully!</h2>
        <div className="mb-4">
          <p className="text-lg font-medium">Block ID: {blockId}</p>
          <p className="text-lg font-medium">End Time: {endTime || "N/A"}</p>
          <p className="text-lg font-medium">Duration: {duration || "N/A"}</p>
        </div>

        {/* Display Countdown */}
        {countdown !== null && (
          <div className="mb-4">
            <p className="text-lg font-medium">
              Countdown until the end: {formatTime(countdown)}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleGoBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back to Home
          </button>
          <button
            onClick={handleViewBlock}
            className="bg-green-600 text-white px-6 py-2 rounded-lg ml-4"
          >
            View Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completed;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Completed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startTime, endTime, duration, blockId } = location.state || {};

  const [countdown, setCountdown] = useState(null);

  // Helper function to convert time string to Date object
  const convertToDate = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours -= 12;
    const now = new Date();
    const date = new Date(now.setHours(hours, minutes, 0, 0)); // Set hours and minutes
    return date;
  };

  // Calculate the time difference and start the countdown
  const calculateCountdown = () => {
    const now = new Date();
    const startDate = convertToDate(startTime);
    const endDate = convertToDate(endTime);

    let targetTime = null;
    if (now < startDate) {
      targetTime = startDate;
    } else if (now >= startDate && now < endDate) {
      targetTime = endDate;
    }

    if (targetTime) {
      const remainingTime = Math.max(0, Math.floor((targetTime - now) / 1000)); // in seconds
      setCountdown(remainingTime);
    }
  };

  useEffect(() => {
    calculateCountdown();
  }, [startTime, endTime]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleViewBlock = () => {
    navigate('/blocka', { state: { blockId, countdown, duration } });
  };

  return (
    <div className="completed-container flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full mt-12">
        <h2 className="text-2xl font-bold text-center mb-4">Action Completed Successfully!</h2>
        <div className="mb-4">
          <p className="text-lg font-medium">Block ID: {blockId}</p>
          <p className="text-lg font-medium">Start Time: {startTime}</p>
          <p className="text-lg font-medium">End Time: {endTime}</p>
          <p className="text-lg font-medium">Duration: {duration}</p>
        </div>

        {/* Display Countdown */}
        {countdown !== null && (
          <div className="mb-4">
            <p className="text-lg font-medium">Countdown: {countdown} seconds</p>
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
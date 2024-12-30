import React, { useEffect } from 'react';

const CountdownTimer = ({ blockId, startTime, endTime, duration }) => {
  useEffect(() => {
    console.log("Received Props:", { blockId, startTime, endTime, duration });
  }, [blockId, startTime, endTime, duration]);

  return (
    <div className="countdown-timer-container bg-white border border-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full mt-12">
      <h2 className="text-2xl font-bold text-center mb-4">Countdown Timer</h2>
      <div className="mb-4">
        <p className="text-lg font-medium">Block ID: {blockId}</p>
        <p className="text-lg font-medium">Start Time: {startTime}</p>
        <p className="text-lg font-medium">End Time: {endTime}</p>
        <p className="text-lg font-medium">Duration: {duration}</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
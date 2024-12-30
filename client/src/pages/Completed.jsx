import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Completed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startTime, endTime, duration, blockId } = location.state || {};

  const handleGoBack = () => {
    navigate('/');
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
        <div className="flex justify-center mt-6">
          <button
            onClick={handleGoBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completed;
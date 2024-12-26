import React from 'react'
import { useState } from 'react';
    
const Completed = ({ message = "Action completed successfully!", onClose }) => {
    const [visible, setVisible] = useState(true);
  
    const handleClose = () => {
      setVisible(false);
      if (onClose) onClose(); // Trigger any additional close logic passed as props
    };
  
    if (!visible) return null;
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-lg max-w-sm w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2l4-4m6 2a9 9 0 11-9-9 9 9 0 019 9z"
                />
              </svg>
              <span className="font-medium text-green-700">{message}</span>
            </div>
            <button
              onClick={handleClose}
              className="text-green-500 hover:text-green-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };


 


  

export default Completed

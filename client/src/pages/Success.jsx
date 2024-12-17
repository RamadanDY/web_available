import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-500">Success!</h1>
      <p className="text-lg mt-4">Your duration was saved successfully.</p>
      {state?.duration && (
        <p className="text-lg mt-4">Saved Duration: {state.duration}</p>
      )}
    </div>
  );
};

export default SuccessPage;

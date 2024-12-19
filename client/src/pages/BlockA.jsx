import React, { useEffect, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineDoorSliding } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im"; // Add spinner icon
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const BlockA = ({ blockName }) => {
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = io("http://localhost:5000/api/time/update/time"); // Replace with your backend URL

    // Listen for 'classStatusUpdated' event from the backend
    socket.on("classStatusUpdated", (update) => {
      console.log("Real-time update received:", update);
      setBlockData((prevData) => {
        if (!prevData) return prevData; // Handle case where data hasn't loaded yet

        // Find the block that matches the update
        const updatedClasses = prevData.classes.map((classItem) => {
          if (classItem.classId === update.classId) {
            return { ...classItem, status: update.status }; // Update status
          }
          return classItem;
        });

        return { ...prevData, classes: updatedClasses };
      });
    });

    // Clean up the WebSocket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch block data from the backend
  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blocks/${blockName}`
        );
        setBlockData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching data");
      }
    };

    fetchBlockData();
  }, [blockName]);

  const handleClassClick = (classItem) => {
    navigate(`/confirm/${classItem.classId}`, { state: classItem });
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!blockData) {
    return (
      <div className="loading flex justify-center items-center h-screen">
        <ImSpinner8 className="animate-spin text-indigo-500" size={50} />
        <p className="pl-4 text-indigo-500 text-lg font-medium">Loading..</p>
      </div>
    );
  }

  return (
    <div className="pages-blocka pb-60 flex flex-col justify-center items-center">
      {/* Block Header */}
      <div className="blockA transition ease-in-out delay-150 mb-24 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-red-800 gap-4 rounded-2xl items-center flex flex-row border p-6 w-fit m-2 text-center">
        <FaRegBuilding size={25} />
        <p className="text">{blockData.blockName}</p>
      </div>

      {/* Classes */}
      <div className="classes-wrapper flex flex-wrap justify-center gap-6">
        {blockData.classes.map((classItem) => (
          <div
            key={classItem.classId}
            className="classes1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative"
            onClick={() => handleClassClick(classItem)}
          >
            <div className="name flex flex-row items-center h-2/3">
              <MdOutlineDoorSliding size={25} />
              <p className="pl-6">{classItem.classId}</p>
            </div>
            <div className="duration">
              <p className="dur bg-pink-500">{classItem.duration}</p>
            </div>

            <span
              className={`inline-flex items-center ${
                classItem.status === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              } text-xs font-medium px-2.5 py-0.5 rounded-full`}
            >
              <span
                className={`w-2 h-2 me-1 rounded-full ${
                  classItem.status === "available"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></span>
              {classItem.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockA;

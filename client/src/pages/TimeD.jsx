import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { MdOutlineDoorSliding } from "react-icons/md";

const TimeD = () => {
  const location = useLocation();
  const { blockId, classId } = useParams(); // Retrieve blockId and classId from the URL
  const classData = location.state; // Access the passed class data

  const [startTime, setStartTime] = useState("07:00 AM");
  const [endTime, setEndTime] = useState("07:00 AM");
  const [duration, setDuration] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditable, setIsEditable] = useState(true); // State to track if fields are editable
  const [status, setStatus] = useState("available"); // State to track the status
  const [remainingTime, setRemainingTime] = useState(0); // State to track remaining time
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

    setDuration(`${hours} hours ${minutes}`);
  };

  useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

  // Function to calculate remaining time
  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const convertToDate = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours -= 12;
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const endDate = convertToDate(endTime);
    const remainingTimeInSeconds = Math.max(0, Math.floor((endDate - now) / 1000));
    setRemainingTime(remainingTimeInSeconds);
  };

  // Function to check if the fields should be editable
  const checkEditable = () => {
    const now = new Date();
    const convertToDate = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours -= 12;
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const endDate = convertToDate(endTime);

    if (now >= endDate) {
      setIsEditable(true);
      setStatus("available");
    } else {
      setIsEditable(false);
      setStatus("unavailable");
      calculateRemainingTime(endTime); // Calculate remaining time if unavailable
    }
  };

  useEffect(() => {
    checkEditable();
    const interval = setInterval(() => {
      checkEditable();
      calculateRemainingTime(endTime);
    }, 1000); // Check every second
    return () => clearInterval(interval);
  }, [endTime]);

  // Fetch stored data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/time/${blockId}/${classId}`);
        const { startTime, endTime, status } = response.data;
        setStartTime(startTime);
        setEndTime(endTime);
        setStatus(status);
        calculateDuration(startTime, endTime);
        checkEditable();
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [blockId, classId]);

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
    if (isSaving) return; // Prevent multiple save attempts

    setIsSaving(true);

    const payload = {
      startTime,
      endTime,
      duration,
      blockId: blockId, // Pass the blockId directly
      classId: classId, // Pass the classId directly
    };

    console.log("Payload:", payload); // Log the payload to verify data

    try {
      const response = await axios.put("http://localhost:5000/api/time/update/time", payload);

      if (response.status === 200) {
        // Check if the fields should be editable after saving
        checkEditable();

        // Navigate to Completed page with startTime, endTime, duration, and blockId
        navigate("/Completed", { state: { startTime, endTime, duration, blockId } });
      }
    } catch (error) {
      console.error("Error saving duration:", error.response?.data || error.message);
      alert("Failed to save duration. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Function to format time as HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timed-container flex flex-col items-center">
      <div className="selected-block mb-8">
        <h2 className="text-2xl font-bold">Selected Block</h2>
        <div className={`block-details border p-4 rounded-lg mt-4 ${!isEditable ? 'border-black' : ''}`}>
          <div className="name flex flex-row items-center">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">{classData?.classId || "N/A"}</p>
          </div>
          <p className="mt-2 bg-red-500">Block Name: {classData?.blockId || "N/A"}</p>
          <p className="mt-2">Status: {status}</p>
          {!isEditable && (
            <div className="countdown-timer mt-4">
              <p className="text-lg font-medium">Time Remaining: {formatTime(remainingTime)}</p>
            </div>
          )}
        </div>
      </div>

      {!isEditable ? (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back Home
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-time" className="block mb-2 text-sm font-medium">
              Start time:
            </label>
            <select
              id="start-time"
              className={`bg-gray-50 border ${!isEditable ? 'border-black' : 'border-gray-300'} text-sm rounded-lg block w-full p-2.5`}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              disabled={!isEditable} // Disable if not editable
            >
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="end-time" className="block mb-2 text-sm font-medium">
              End time:
            </label>
            <select
              id="end-time"
              className={`bg-gray-50 border ${!isEditable ? 'border-black' : 'border-gray-300'} text-sm rounded-lg block w-full p-2.5`}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              disabled={!isEditable} // Disable if not editable
            >
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 mt-4">
            {duration && <p className="text-lg font-medium">Duration: {duration}</p>}
          </div>
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-lg"
              disabled={isSaving} // Only disable when saving to prevent multiple clicks
            >
              {isSaving ? "Saving..." : "Set"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TimeD;
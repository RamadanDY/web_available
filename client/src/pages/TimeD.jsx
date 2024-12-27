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
  const [remainingTime, setRemainingTime] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false);
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

    setDuration(`${hours} hours ${minutes} minutes`);
  };

  useEffect(() => {
    calculateDuration(startTime, endTime);
  }, [startTime, endTime]);

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

  const convertDurationToSeconds = (duration) => {
    const [hours, minutes] = duration.split(" ").map((part) => parseInt(part));
    return hours * 3600 + minutes * 60;
  };

  const calculateStartTime = (startTime) => {
    const [timeStr, modifier] = startTime.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(modifier === "PM" && hours !== 12 ? hours + 12 : hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      startTime,
      endTime,
      duration,
      blockId: blockId, // Pass the blockId directly
      classId: classId, // Pass the classId directly
    };

    try {
      const response = await axios.put("http://localhost:5000/api/time/update/time", payload);

      if (response.status === 200) {
        // Calculate total duration in seconds
        const totalSeconds = convertDurationToSeconds(duration);

        // Calculate start time and time until start
        const startTimeDate = calculateStartTime(startTime);
        const now = new Date();
        const timeUntilStart = startTimeDate - now;

        if (timeUntilStart > 0) {
          setTimeout(() => {
            setCountdownStarted(true);
            setRemainingTime(totalSeconds);
          }, timeUntilStart);
        } else {
          setCountdownStarted(true);
          setRemainingTime(totalSeconds);
        }

        // Navigate to BlockA with countdown data
        navigate("/blockA", { state: { totalSeconds, blockId, classId } });
      }
    } catch (error) {
      console.error("Error saving duration:", error.response?.data || error.message);
      alert("Failed to save duration. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (countdownStarted && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          console.log("Remaining Time:", prevTime - 1); // Log the countdown to the console
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdownStarted, remainingTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} hours ${mins} minutes ${secs} seconds`;
  };

  return (
    <div className="timed-container flex flex-col items-center">
      <div className="selected-block mb-8">
        <h2 className="text-2xl font-bold">Selected Block</h2>
        <div className="block-details border p-4 rounded-lg mt-4">
          <div className="name flex flex-row items-center">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">{classData?.classId || "N/A"}</p>
          </div>
          <p className="mt-2 bg-red-500">Block Name: {classData?.blockId || "N/A"}</p>
          <p className="mt-2">Status: {classData?.status || "Unavailable"}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-time" className="block mb-2 text-sm font-medium">
            Start time:
          </label>
          <select
            id="start-time"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
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
        <div>
          <label htmlFor="end-time" className="block mb-2 text-sm font-medium">
            End time:
          </label>
          <select
            id="end-time"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
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
        <div className="col-span-2 mt-4">
          {duration && <p className="text-lg font-medium">Duration: {duration}</p>}
        </div>
        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-2 rounded-lg"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Set"}
          </button>
        </div>
      </form>

      {/* Countdown Timer */}
      {countdownStarted && remainingTime > 0 && (
        <div className="countdown-timer mt-8">
          <p className="text-lg font-medium">Time Remaining: {formatTime(remainingTime)}</p>
        </div>
      )}
    </div>
  );
};

export default TimeD;
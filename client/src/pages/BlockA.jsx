import React, { useEffect, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineDoorSliding } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im"; // Add spinner icon
import "../App.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const BlockA = ({ blockName }) => {
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState(null);
  const  navigate = useNavigate()

  useEffect(() => {
    // Fetch block data
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

  const handleClassClick = ((classId) => {
    navigate(`/confirm/${classId}`)
  })

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!blockData) {
    return (
      <div className="loading flex justify-center items-center h-screen">
        <ImSpinner8 className="animate-spin text-indigo-500" size={50} />
        <p className="pl-4 text-indigo-500 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pages-blocka pb-96 flex flex-col justify-center items-center">
      {/* this is to display the Block Header */}
      <div className="blockA transition ease-in-out delay-150 mb-24 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-red-800 gap-4 rounded-2xl items-center flex flex-row border p-6 w-fit m-2 text-center">
        <FaRegBuilding size={25} />
        <p className="text">{blockData.blockName}</p>
      </div>

      {/*this is to display the  Classes Section */}
      <div onClick={ () => {  "/confirm" }} className="classes-wrapper flex flex-row">
        {blockData.classes.map((classItem) => (
          <div
            key={classItem.classId}
            className="classes1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative"
            // i pass the classi
            onClick={() => {
              handleClassClick(classItem.classId)
            }}
          >
             <div className="name flex flex-row items-center h-2/3">
              <MdOutlineDoorSliding size={25} />
              <p className="pl-6">{classItem.classId}</p>
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
                  classItem.status === "available" ? "bg-green-500" : "bg-red-500"
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

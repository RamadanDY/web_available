import React from 'react';
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineDoorSliding } from "react-icons/md";
import { useEffect,useState } from 'react';
import { ImSpinner8 } from "react-icons/im"; // Add spinner icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css";

const BlockB = ({blockName}) => {
  const [blockdata ,setBlockdata] = useState(null)
  const [error ,setError] = useState(null)
  const navigate = useNavigate()



  // lets now fetch the data from the backend
  useEffect(() => {
    const fetchBlockData = async () => {
      try{
       const response = await  axios.get(`ttp://localhost:5000/api/blocks/${blockName}`)
       setBlockdata(response.data)

      }catch (err) {
        setError(err.response?.data?.error || "Error fetching data");

      }

    }
    fetchBlockData()
  
  }, [blockName])

  if(error) {
    return (
      <div className="error bg-red-100">
        <p>Error: ${error}</p>
      </div>
    )
  }

  if(!blockdata) {
    return(
    <div className="loading">
      <div className="loading-wrapper">
        <ImSpinner8 />
        <p className="text">Loading......</p>
      </div>
    </div>
    )
  }


  return (
    <div className="pages-blocka pb-96 flex flex-col justify-center items-center">
      <div className="blockA transition ease-in-out delay-150 mb-24 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-red-800 gap-4 rounded-2xl items-center flex flex-row border p-6 w-fit m-2 text-center">
        <FaRegBuilding size={25} />
        <p className="text">Block-B</p>
      </div>


      <div className="classes-wrapper flex  flex-row">
        <div className="classes1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">B 102</p>
          </div>
          {/* Bottom Section: Red Background */}

          <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Unavailable
          </span>           
        </div>
        <div className="classes1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">B 102</p>
          </div>
          {/* Bottom Section: Red Background */}

          <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Unavailable
          </span>           
        </div>
        <div className="classes1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">B 201</p>
          </div>
          {/* Bottom Section: Red Background */}

          <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Unavailable
          </span>           
        </div>
        <div className="classes1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">B 202</p>
          </div>
          {/* Bottom Section: Red Background */}

          <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Unavailable
          </span>           
        </div>
      </div>
    </div>
  );
};

export default BlockB;

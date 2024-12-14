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
       const response = await  axios.get(`http://localhost:5000/api/blocks/${blockName}`)
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
        <p className="text">{blockdata.blockName}</p>
      </div>

      {/* now lets display the class sections by dynamically rendering it*/}

         <div onClick={() => navigate('/confirm')} className="classes-wrapper flex flex-wrap justify-center gap-6">
          {blockdata.classes.map((classItem) => (
            <div  
            key={classItem.classId} 
            className="classes1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative"
            >
              <div className="name">
                {classItem.classId}
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

export default BlockB;

import React from "react";
import "../App.css";
import { MdOutlineDoorSliding } from "react-icons/md";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Confirm = () => {
  const location = useLocation(); // Retrieve data passed via state
  const { classId } = useParams(); // Retrieve classId from the URL
  const classData = location.state; // Access the full class data
  const navigate = useNavigate(); // Hook to navigate to a different page

  const handleYesClick = () => {
    // Redirect to the 'timeD' page with block data
    navigate(`/timeduration/${classData.blockId}/${classData.classId}`, { state: classData });
  };

  return (
    <>
      <div className="confirm flex flex-col justify-center items-center pb-28">
        <div className="text-wrapper pb-36 text-5xl">
          <p>
            Would you like to select{" "}
            <span className="font-extrabold">Block {classData?.blockName}</span>{" "}
            <span className="flex justify-center">
              <div className="num flex justify-center font-semibold pr-5">
                <br />
                {classData?.classId || classId}
              </div>{" "}
              for Your lecture?
            </span>
          </p>
        </div>
        <div className="classes1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">{classData?.classId || "N/A"}</p>
          </div>
          {/* Bottom Section: Availability Status */}
          <span
            className={`inline-flex items-center ${
              classData?.status === "available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } text-xs font-medium px-2.5 py-0.5 rounded-full`}
          >
            <span
              className={`w-2 h-2 me-1 rounded-full ${
                classData?.status === "available" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {classData?.status || "Unavailable"}
          </span>
        </div>

        {/* Confirm and Cancel Buttons */}
        <div className="btn-confirm flex flex-row gap-5">
          <div className="btn1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
            <button type="button" onClick={handleYesClick}>Yes</button>
          </div>
          <div className="btn2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
            <button type="button">No</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
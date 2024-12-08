import React from 'react';
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineDoorSliding } from "react-icons/md";
import "../App.css";

const BlockE = () => {
  return (
    <div className="pages-blocka pb-96 flex flex-col justify-center items-center">
      <div className="blockA transition ease-in-out delay-150 mb-24 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-red-800 gap-4 rounded-2xl items-center flex flex-row border p-6 w-fit m-2 text-center">
        <FaRegBuilding size={25} />
        <p className="text">Block-E</p>
      </div>


      <div className="classes-wrapper flex  flex-row">
        <div className="classes1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">E 102</p>
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
            <p className="pl-6">E 102</p>
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
            <p className="pl-6">E 102</p>
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
            <p className="pl-6">E 102</p>
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

export default BlockE;

import React from 'react'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"; 
import "../App.css"
import { Link } from 'react-router-dom';
// import BlockA from './BlockA';



const Body = () => {
  return (
    <div className='flex flex-col text-center pt-28 justify-center align-center'>
    <div className="header-wrapper text-3xl font-bold pb-12">
        <div className='text-wrapper'>PLEASE SELECT A BLOCK FOR YOUR LECTURE</div>
    </div>
    <div className="blocks-wrapper grid grid-cols-3 justify-center mx-auto gap-x-48 gap-y-10">
        <div className="blockA transition ease-in-out delay-150   hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border-red-800 gap-4 rounded-2xl items-center flex flex-row border p-6 w-fit m-2 text-center ">
            <HiOutlineBuildingOffice2 />   
            <Link to="/BlockA" className="text">Block-A</Link>
        </div>
        <div className="blockB border-red-800 border transition ease-in-out delay-150  cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-6 rounded-2xl  w-fit m-2 text-center flex flex-row items-center gap-4">
            <HiOutlineBuildingOffice2 />
            <p className="text">Block-B</p>
        </div>
        <div className="blockC border-red-800 border transition ease-in-out delay-150  cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-6 rounded-2xl w-fit m-2 text-center flex flex-row items-center gap-4">
            <HiOutlineBuildingOffice2 />
            <p className="text">Block-C</p>
        </div>
        <div className="blockD blocks border-red-800 transition ease-in-out delay-150  cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border rounded-2xl p-6 w-fit m-2 text-center    flex flex-row items-center gap-4">
            <HiOutlineBuildingOffice2 />
            <p className="text">Block-D</p>
        </div>
        <div className="blockE blocks border-red-800 transition ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border  rounded-2xl p-6 w-fit m-2 text-center   flex flex-row items-center gap-4">
            <HiOutlineBuildingOffice2 />
            <p className="text">Block-E</p>
        </div>
        <div className="blockF blocks border-red-800 transition ease-in-out delay-150  cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 border rounded-2xl  p-6 w-fit m-2 text-center   flex flex-row items-center gap-4">
            <HiOutlineBuildingOffice2 />
            <p className="text">Block-F</p>
        </div>
    </div>
</div>
   )
}

export default Body
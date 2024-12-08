import React from 'react'
import "../App.css"
 import { MdOutlineDoorSliding } from "react-icons/md";

const Confirm = () => {
  return (
    <>
    <div className="confirm flex flex-col justify-center items-center pb-28 ">
        <div className="text-wrapper pb-36 text-5xl  ">
            <p>would u like to select <span className='font-extrabold'> Block F  </span>     <span className=' flex justify-center ' >  <div className="num flex justify-center font-semibold pr-5 "><br /> 201 </div> for Your lecture?</span> </p>
        </div>
        <div className="classes1  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">
          {/* Top Section: Icon and Text */}
          <div className="name flex flex-row items-center h-2/3">
            <MdOutlineDoorSliding size={25} />
            <p className="pl-6">F 102</p>
          </div>
          {/* Bottom Section: Red Background */}

          <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                Unavailable
          </span>           
        </div>

        <div className="btn-confirm flex flex-row  gap-5 ">
            <div className="btn1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">           
                 <button type="button border px-14 py-4 w-fit m-2 ">Yes</button>
            </div>
            <div className="btn2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300 border-red-800 gap-4 rounded-2xl flex flex-col justify-between border px-14 py-4 w-fit m-2 text-center relative">             
                <button type="button ">No</button>
            </div>
         </div>
    </div>
    </>
   )
}

export default Confirm
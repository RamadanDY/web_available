import React from 'react'
// import { Button } from '../components/ui/button'
import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
 import '../App.css'
import logo from '../assets/culogo.png'
import { Link } from 'react-router-dom';






const Navbar = () => {
  return (
    <div className='navbar flex  items-center justify-between    ' >
      <div className="img-wrapper pl-20 items-center flex-row flex gap-4 cursor-pointer  ">
        <img src={logo} alt="hello" srcset="" />
        <h3 className="texts text-3xl font-extrabold">
          CLHAS
        </h3>
      </div>
      <div className="btn-wrapper flex p-14 flex-row gap-3 ">
        <div className="p-4  cursor-pointer ">
          <HiOutlineHome size={25}/>
          <p>Dashboard</p>
        </div> 
        <div className="p-4  cursor-pointer ">
          <CgProfile size={25}/>
          <p>My Profile</p>
        </div> 
        <div className="p-4  cursor-pointer ">  
          <FaRegMessage size={25}/>
          <p>Suggestions</p>
        </div> 
        <div className="p-4  cursor-pointer ">
          <IoIosLogOut size={25}/>
          <p>Logout</p>
        </div> 
      </div>
    </div>
 )   
}

export default Navbar
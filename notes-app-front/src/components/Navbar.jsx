import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../contextComponents/userContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const {UserInfo} = useContext(UserContext);
 

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
    
  };
  
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">
        <Link to="/">AlwaysNote</Link>
      </h2>
      {/* <ul className="flex-grow text-center"> */}

      {UserInfo ? (
        <ul className="flex gap-5">
          <li className="flex   ">
            <p>Welcome, </p>
            <p className="text-blue-600 font-semibold">{UserInfo.userName}</p>
          </li>
          
             
          
          
          <li>
            <button
              // className="hover:bg-black hover:rounded-full hover:p-2 hover:text-white duration-300 font-semibold"
              className="hover:bg-black hover:rounded-full hover:px-2 hover:text-white duration-300 font-semibold text-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-5">
          <li>
            <Link
              className="hover:bg-black hover:rounded-full hover:p-2 hover:text-white duration-300 font-semibold "
              to="/signup"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-black  hover:rounded-full hover:p-2 hover:text-white duration-300 font-semibold "
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;

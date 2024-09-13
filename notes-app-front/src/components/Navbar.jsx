import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      {/* <ul className="flex-grow text-center"> */}
      <ul className="flex gap-5">
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ul>
      <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ul>
    </div>
  );
};

export default Navbar;

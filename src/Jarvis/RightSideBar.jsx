// src/components/Myjarvis2/RightSidebar.js
import React from "react";
import {
  FaBars,
  FaChalkboardTeacher,
  FaUsers,
  FaBullseye,
  FaClock,
  FaSyncAlt,
  FaCog,
} from "react-icons/fa";

const RightSidebar = () => {
  return (
    <div className=" bg-black flex flex-col items-center space-y-6 py-6 px-2 text-white border-l border-gray-800">
      <FaBars className="cursor-pointer text-xl" />
      <FaChalkboardTeacher className="cursor-pointer text-xl" />
      <FaUsers className="cursor-pointer text-xl" />
      <FaBullseye className="cursor-pointer text-xl" />
      <FaClock className="cursor-pointer text-xl" />
      <FaSyncAlt className="cursor-pointer text-xl" />
      <FaCog className="cursor-pointer text-xl" />
    </div>
  );
};

export default RightSidebar;

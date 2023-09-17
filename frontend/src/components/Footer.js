import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-gray-800 text-white">
      <div className="">
        <p className="font-bold">Copyright &copy; Questpaper 2021</p>
      </div>
      <div className="flex p-2 space-x-3 text-lg">
        <FaInstagram className="text-white" />
        <FaLinkedin className="text-white" />
        <FaFacebook className="text-white" />
      </div>
    </div>
  );
};

export default Footer;

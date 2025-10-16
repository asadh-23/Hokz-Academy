import React from "react";
import { FaInstagram, FaTwitter, FaPinterest, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full bg-black shadow-2xl py-5 px-8 flex items-center justify-between rounded-none">
      {/* Brand */}
      <div className="text-teal-400 font-bold text-xl tracking-tight">{import.meta.env.VITE_APP_NAME}</div>

      {/* Navigation */}
      <nav className="flex gap-6 text-gray-100 font-medium text-base">
        <a href="#" className="hover:text-teal-500 transition">Home</a>
        <a href="#" className="hover:text-teal-500 transition">Features</a>
        <a href="#" className="hover:text-teal-500 transition">Benefits</a>
        <a href="#" className="hover:text-teal-500 transition">Courses</a>
        <a href="#" className="hover:text-teal-500 transition">Blogs</a>
        <a href="#" className="hover:text-teal-500 transition">Login</a>
      </nav>

      {/* Social Icons */}
      <div className="flex gap-4">
        <a href="#" className="p-2 rounded-full flex items-center" style={{color: "#E1306C"}}>
          <FaInstagram size={18} />
        </a>
        <a href="#" className="p-2 rounded-full flex items-center" style={{color: "#1DA1F2"}}>
          <FaTwitter size={18} />
        </a>
        <a href="#" className="p-2 rounded-full flex items-center" style={{color: "#BD081C"}}>
          <FaPinterest size={18} />
        </a>
        <a href="#" className="p-2 rounded-full flex items-center" style={{color: "#1877F2"}}>
          <FaFacebookF size={18} />
        </a>
      </div>
    </div>
  );
}

import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-16 gap-10 bg-gradient-to-b from-white to-gray-50">
      {/* Left Image */}
      <div className="w-full md:w-1/2 relative group">
        <img
          src="https://images.pexels.com/photos/2916821/pexels-photo-2916821.jpeg?cs=srgb&dl=pexels-andre-furtado-43594-2916821.jpg&fm=jpg" 
          alt="Travel"
          className="w-full h-[400px] object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-blue-600 font-cursive text-2xl md:text-3xl tracking-wide animate-fadeIn">
          About Us
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight animate-slideIn">
          Plan Your Trip with Tours
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg animate-fadeIn">
          Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, ultrices in
          ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>

        <ul className="space-y-4 text-gray-800 text-base md:text-lg animate-slideIn">
          <li className="flex items-center group">
            <FaCheckCircle className="text-blue-500 mr-3 transform group-hover:scale-125 transition-transform duration-300" />
            <span className="group-hover:text-blue-600 transition-colors duration-300">
              2000+ Our Worldwide Guide
            </span>
          </li>
          <li className="flex items-center group">
            <FaCheckCircle className="text-blue-500 mr-3 transform group-hover:scale-125 transition-transform duration-300" />
            <span className="group-hover:text-blue-600 transition-colors duration-300">
              100% Trusted Tour Agency
            </span>
          </li>
          <li className="flex items-center group">
            <FaCheckCircle className="text-blue-500 mr-3 transform group-hover:scale-125 transition-transform duration-300" />
            <span className="group-hover:text-blue-600 transition-colors duration-300">
              24+ Years of Experience
            </span>
          </li>
          <li className="flex items-center group">
            <FaCheckCircle className="text-blue-500 mr-3 transform group-hover:scale-125 transition-transform duration-300" />
            <span className="group-hover:text-blue-600 transition-colors duration-300">
              100% Travelers are Happy
            </span>
          </li>
        </ul>

        <button className="relative bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold overflow-hidden group transition-all duration-300 hover:bg-blue-700">
          <span className="relative z-10">Booking Now</span>
          <div className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
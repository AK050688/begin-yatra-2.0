import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url(/Images/leadsimg.jpeg)] bg-no-repeat bg-cover  text-white pt-4 w-full h-[55vh] py-16 px-4 md:px-12 relative overflow-hidden">
      <div className=" absolute blur-2xl h-[70vh] w-full  bg-black/50"></div>
      <div className="flex justify-between items-center mb-6">
        <img src="/Logo/Logo.png" alt="logo" className="w-30 h-auto z-100" />
        <div className="navbar-end">
          <button
            onClick={() => navigate("/agent/login-agent")}
            className="btn btn-outline bg-white absolute z-2 border-[#3b82f6] text-[#3b82f6] hover:text-white hover:bg-[#3b82f6]"
          >
            Agent Login
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-full z-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full ">
              100% Mobile Verified Leads
            </span>
            <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              ISO Certified
            </span>
            <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              TAAI Member
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Travel Leads Marketplace
          </h1>
          <p className="text-lg font-medium mb-6 leading-relaxed">
            Buy High-Quality, Verified Travel Leads & Boost your Travel Agency
            Business
          </p>

          <p className="text-sm text-gray-200 mb-6">
            Free Registration | Pay per Travel Lead | No Hidden Costs
          </p>

          {/* CTA */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 flex gap-2 items-center hover:bg-red-600 transition px-6 py-3 rounded-md text-white font-semibold shadow"
            >
              <FaArrowLeft /> back
            </button>
            <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-md text-white font-semibold shadow">
              Get Travel Leads
            </button>
          </div>
        </div>

        {/* Right Image */}
        {/* <div className="md:w-1/2 z-10">
          <img
            src="/Images/leadsimg1.jpg"
            alt="Dashboard Screenshot"
            className="rounded-2xl shadow-2xl w-full h-80 max-w-md mx-auto"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Banner;

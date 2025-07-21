import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const leadsData = [
  {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    name: "Giridhar Das",
  },
  {
    review:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit...",
    name: "Mohan",
  },
  {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    name: "Satyam",
  },
  {
    review:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit...",
    name: "lorem",
  },
  {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    name: "Name",
  },
  {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    name: "Giridhar Das",
  },
  {
    review:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit...",
    name: "Giridhar Das",
  },
];

const WhatOurUsersSay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(leadsData.length / itemsPerPage);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getVisibleLeads = () => {
    const start = currentIndex * itemsPerPage;
    return leadsData.slice(start, start + itemsPerPage);
  };

  return (
    <div className="py-10 px-4 bg-gray-50 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        What our users say about us
      </h2>

      <div className="max-w-7xl mx-auto relative ">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
          aria-label="Previous"
        >
          <FaChevronLeft size={10} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
          aria-label="Next"
        >
          <FaChevronRight size={10} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
          {getVisibleLeads().map((lead, index) => (
            <div
              key={index}
              className="border rounded-lg hover:border-blue-500 hover:scale-101 shadow-sm p-5 bg-gray-300 hover:shadow-md transition-opacity "
            >
              <div className="flex px-4 py-1 font-semibold rounded-t">
                <div className="flex items-center gap-0">
                  <img src="/Images/comma.png" alt="quote" className="w-10" />
                  <img src="/Images/comma.png" alt="quote" className="w-10" />
                </div>
              </div>
              <div className="px-5 mt-4 space-y-2 text-sm text-gray-700">
                <p>{lead.review}</p>
              </div>
              <p className="font-bold mt-4">{lead.name}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        {/* <div className="mt-8 flex justify-center space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-400"
              } transition-all`}
            ></button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default WhatOurUsersSay;

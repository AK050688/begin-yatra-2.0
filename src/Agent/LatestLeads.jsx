import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const leadsData = [
  {
    destination: "Dubai",
    from: "Bhopal",
    to: "Dubai",
    people: "1 Adult 0 Children",
    date: "01 Jan 1970",
    duration: "4 Days, 3 Nights",
  },
  {
    destination: "Bhutan",
    from: "Guwahati",
    to: "Bhutan",
    people: "2 Adults 0 Children",
    date: "01 Jan 1970",
    duration: "5 Days, 4 Nights",
  },
  {
    destination: "Meghalaya",
    from: "Guwahati",
    to: "Meghalaya",
    people: "2 Adults 0 Children",
    date: "01 Jan 1970",
    duration: "3 Days, 2 Nights",
  },
  {
    destination: "Kerala",
    from: "Mumbai",
    to: "Kerala",
    people: "4 Adults 1 Child",
    date: "01 Jan 1970",
    duration: "6 Days, 5 Nights",
  },
  {
    destination: "Goa",
    from: "Delhi",
    to: "Goa",
    people: "2 Adults",
    date: "01 Jan 1970",
    duration: "3 Days, 2 Nights",
  },
  {
    destination: "Kashmir",
    from: "Delhi",
    to: "Goa",
    people: "2 Adults",
    date: "01 Jan 1970",
    duration: "3 Days, 2 Nights",
  },
  {
    destination: "Nepal",
    from: "Delhi",
    to: "Goa",
    people: "2 Adults",
    date: "01 Jan 1970",
    duration: "3 Days, 2 Nights",
  },
  {
    destination: "Mathura",
    from: "Delhi",
    to: "Goa",
    people: "2 Adults",
    date: "01 Jan 1970",
    duration: "3 Days, 2 Nights",
  },
  {
    destination: "Mathura",
    from: "Delhi",
    to: "Goa",
    people: "2 Adults",
    date: "01 Jan 1970",
    duration: "3 Days, 2 Nights",
  },
];

const TravelLeadsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(leadsData.length / itemsPerPage);

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
    <div className="py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100 min-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        Latest Travel Leads for Agents on{" "}
        <span className="text-blue-600 font-bold">Begin Yatra</span>
      </h2>

      <div className="max-w-7xl mx-auto relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg z-10 transition-all"
          aria-label="Previous"
        >
          <FaChevronLeft size={10} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full  cursor-pointer shadow-lg z-10 transition-all"
          aria-label="Next"
        >
          <FaChevronRight size={10} />
        </button>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {getVisibleLeads().map((lead, index) => (
            <div
              key={index}
              className="relative bg-white duration-750 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all  ease-in-out border border-gray-200"
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 font-semibold text-lg rounded-t-xl">
                {lead.destination} Travel Leads
              </div>

              <div className="px-10 pt-5 pb-5 space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Route:</span>
                  <span className="text-gray-600">
                    {lead.from} → {lead.to}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    Travelers:
                  </span>
                  <span className="text-gray-600">{lead.people}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Date:</span>
                  <span className="text-gray-600">{lead.date}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Duration:</span>
                  <span className="text-gray-600">{lead.duration}</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 p-4 bg-gray-50">
                <FaPhoneAlt className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer transition-colors" />
                <FaEnvelope className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer transition-colors" />
                <FaWhatsapp className="text-green-600 hover:text-green-800 text-xl cursor-pointer transition-colors" />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-b-xl cursor-pointer transition-colors duration-300 focus:ring-4 ring-blue-300 focus:outline-none">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelLeadsSlider;

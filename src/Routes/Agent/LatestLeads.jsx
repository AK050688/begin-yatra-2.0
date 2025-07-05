import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

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
];

const TravelLeadsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(leadsData.length / itemsPerPage);

  const handleDotClick = (page) => {
    setCurrentIndex(page);
  };

  const getVisibleLeads = () => {
    const start = currentIndex * itemsPerPage;
    return leadsData.slice(start, start + itemsPerPage);
  };

  return (
    <div className="py-10 px-4 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Latest Travel Leads for Travel Agents on{" "}
        <span className="text-blue-600">TripClap</span>
      </h2>

      <div className="max-w-7xl mx-auto transition-all duration-300 ease-in-out">
        {/* Card Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {getVisibleLeads().map((lead, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition"
            >
              <div className="bg-pink-200 text-pink-800 px-4 py-1 font-semibold rounded-t">
                {lead.destination} Travel Leads
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Traveling from:</span> {lead.from} to {lead.to}
                </p>
                <p>
                  <span className="font-semibold">People:</span> {lead.people}
                </p>
                <p>
                  <span className="font-semibold">Received date:</span> {lead.date}
                </p>
                <p>
                  <span className="font-semibold">Duration:</span> {lead.duration}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4 text-blue-600 text-lg">
                <FaPhoneAlt className="hover:text-blue-800 cursor-pointer" />
                <FaEnvelope className="hover:text-blue-800 cursor-pointer" />
                <FaWhatsapp className="hover:text-green-600 cursor-pointer" />
              </div>

              <button className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
              } transition-all`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelLeadsSlider;
import React from "react";
import { Link } from "react-router-dom";

const destinations = [
  { name: "Goa" },
  { name: "Manali" },
  { name: "Kashmir" },
  { name: "Kerala" },
  { name: "Shimla" },
  { name: "Jaipur" },
  { name: "Andaman" },
  { name: "Agra" },
  { name: "Varanasi" },
  { name: "Darjeeling" },
  { name: "Amritsar" },
  { name: "Ladakh" },
  { name: "Ooty" },
];

const TopDestinations = () => {
  return (
    <div className="bg-white py-14 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
        Top Destinations for Travel Leads
      </h2>

      <div className="flex gap-2 flex-wrap max-w-5xl mx-auto">
        {destinations.map((dest, index) => (
          <Link to="/get-qurey" key={index}>
            <div className="flex items-center justify-center">
              <p className="px-6 py-3 text-center bg-white border border-blue-500 text-blue-500 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                {dest.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopDestinations;

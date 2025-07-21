import React from "react";
import { FaSuitcase, FaHotel } from "react-icons/fa";

const Teravelleads = ({ title }) => {
  const leads = [
    {
      title: "Tour Package",
      icon: <FaSuitcase className="text-white text-3xl" />,
      description:
        "Tour Package Lead – is a travel lead where a traveler wants a full tour package including hotels, sightseeing, transport, and more.",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
    {
      title: "Hotel Only",
      icon: <FaHotel className="text-white text-3xl" />,
      description:
        "Hotel Only Lead – is a travel lead where a traveler wants to book only accommodation like a hotel, hostel, or lodge.",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
    {
      title: "Hotel Only",
      icon: <FaHotel className="text-white text-3xl" />,
      description:
        "Hotel Only Lead – is a travel lead where a traveler wants to book only accommodation like a hotel, hostel, or lodge.",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
    {
      title: "Hotel Only",
      icon: <FaHotel className="text-white text-3xl" />,
      description:
        "Hotel Only Lead – is a travel lead where a traveler wants to book only accommodation like a hotel, hostel, or lodge.",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
  ];

  return (
    <div className=" px-4 bg-gradient-to-t from-gray-50 to-white min-h-auto mb-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16   tracking-tight">
        {title}
      </h2>

      {/* Lead Types */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {leads.map((lead, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-100 group"
          >
            <div
              className={`w-full h-2 ${lead.bgColor} transition-all duration-300 group-hover:h-3`}
            />
            <div className="p-6 flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${lead.bgColor} transform group-hover:scale-110 transition-transform duration-300`}
              >
                {lead.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-wide">
                {lead.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {lead.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teravelleads;

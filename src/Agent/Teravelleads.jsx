import React from 'react'
import { FaSuitcase, FaHotel } from "react-icons/fa";
const Teravelleads = ({title}) => {
    
  const leads = [
    {
      title: "Tour Package",
      icon: <FaSuitcase className="text-white text-2xl" />,
      description:
        "Tour Package Lead – is a travel lead where a traveler wants a full tour package including hotels, sightseeing, transport, and more.",
      bgColor: "bg-teal-500",
    },
    {
      title: "Hotel Only",
      icon: <FaHotel className="text-white text-2xl" />,
      description:
        "Hotel Only Lead – is a travel lead where a traveler wants to book only accommodation like a hotel, hostel, or lodge.",
      bgColor: "bg-pink-500",
    },
  ];

  return (
    <div>
             <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
       
       {title}
      </h2>

      {/* Lead Types */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {leads.map((lead, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${lead.bgColor}`}
            >
              {lead.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {lead.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{lead.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teravelleads
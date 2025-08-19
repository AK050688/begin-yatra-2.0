import React from "react";
import {
  FaSuitcase,
  FaHotel,
  FaCarSide,
  FaTicketAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdOutbound } from "react-icons/md";
import { TbWorldPin } from "react-icons/tb";

// Reusable Lead Card component
const LeadCard = ({ icon, title, description, bgColor }) => (
  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-100 group">
    <div className={`w-full h-2 ${bgColor} transition-all duration-300 group-hover:h-3`} />
    <div className="p-6 flex flex-col items-center text-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${bgColor} transform group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-wide">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>
    </div>
  </div>
);

// Main Component
const Teravelleads = ({ title }) => {
  const primaryLeads = [
    {
      title: "Domestic",
      icon: <FaSuitcase className="text-white text-3xl" />,
      description:
        "Domestic travel leads are potential customers interested in traveling within their own country.",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
    {
      title: "Outbound",
      icon: <MdOutbound className="text-white text-3xl" />,
      description:
        "Outbound travel leads are potential customers planning international trips outside their home country.",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
    {
      title: "International",
      icon: <TbWorldPin className="text-white text-3xl" />,
      description:
        "International travel leads involve potential customers planning trips across national borders.",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
  ];

  const secondaryLeads = [
    {
      title: "Tour Package Leads",
      icon: <FaMoneyCheckAlt className="text-white text-3xl" />,
      description:
        "Tour package leads are potential customers seeking complete trip solutions including accommodation, travel, and activities.",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
    {
      title: "Hotel Leads",
      icon: <FaHotel className="text-white text-3xl" />,
      description:
        "Hotel leads are potential guests looking to book accommodations such as hotels, hostels, or lodges.",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
    {
      title: "Cab Leads",
      icon: <FaCarSide className="text-white text-3xl" />,
      description:
        "Cab leads are potential customers looking for taxi or ride-hailing services for their travel needs.",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    },
    {
      title: "Ticket Booking",
      icon: <FaTicketAlt className="text-white text-3xl" />,
      description:
        "Ticket booking leads are potential travelers looking to book transportation like flights, trains, or buses.",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
    },
  ];

  return (
    <div className="px-4 bg-gradient-to-t from-gray-50 to-white min-h-auto mb-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
        {title}
      </h2>

      {/* Primary Lead Types */}
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {primaryLeads.map((lead, index) => (
          <LeadCard key={index} {...lead} />
        ))}
      </div>

      {/* Secondary Lead Types */}
       <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
        Types of Travel Leads
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {secondaryLeads.map((lead, index) => (
          <LeadCard key={index} {...lead} />
        ))}
      </div>
    </div>
  );
};

export default Teravelleads;

import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TravelLeadsSlider = ({ leads, pagination, onNext, onPrev }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(leads.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getVisibleLeads = () => {
    const start = currentIndex * itemsPerPage;
    return leads.slice(start, start + itemsPerPage).map((lead) => ({
      destination: lead.destination || "Unknown",
      from: lead.city || "Unknown",
      to: lead.destination || "Unknown",
      // totalMembers:
      //   [
      //     lead.adult !== "0" &&
      //       `${lead.adult} Adult${Number(lead.adult) !== 1 ? "s" : ""}`,
      //     lead.children !== "0" &&
      //       `${lead.children} Child${Number(lead.children) !== 1 ? "ren" : ""}`,
      //     lead.infant !== "0" &&
      //       `${lead.infant} Infant${Number(lead.infant) !== 1 ? "s" : ""}`,
      //   ]
      //     .filter(Boolean)
      //     .join(" ") || "No Travelers",
      totalMembers: (Number(lead?.totalMembers?.adult) || 0) + (Number(lead?.totalMembers?.children) || 0) + (Number(lead?.totalMembers?.infant) || 0),
      date: lead.travelDate
        ? new Date(lead.travelDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
      duration: lead.travelTime || "N/A",
    }));
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
        Latest Travel Leads for Agents on{" "}
        <span className="text-blue-600 font-bold">Begin Yatra</span>
      </h2>

      <div className="max-w-7xl mx-auto relative">
        {/* Client-side slider navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg z-10 transition-all"
          aria-label="Previous"
          disabled={totalPages <= 1}
        >
          <FaChevronLeft size={10} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg z-10 transition-all"
          aria-label="Next"
          disabled={totalPages <= 1}
        >
          <FaChevronRight size={10} />
        </button>

        {/* Card Grid */}
        {leads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No travel leads available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {getVisibleLeads().map((lead, index) => (
              <div
                key={index}
                className="relative bg-white duration-750 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all ease-in-out border border-gray-200"
              >
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 font-semibold text-lg rounded-t-xl">
                  {lead.destination} Travel Leads
                </div>
                <div className="px-10 pt-5 pb-5 space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      Destination:
                    </span>
                    <span className="text-gray-600">
                      {lead.from} → {lead.to}
                    </span>
                  </p>
                  {/* <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Total Members:</span>
                    <span className="text-gray-600">{lead.people}</span>
                  </p> */}

                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      Total Members:
                    </span>
                    <span className="text-gray-600">{lead.totalMembers}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Date:</span>
                    <span className="text-gray-600">{lead.date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      Duration:
                    </span>
                    <span className="text-gray-600">{lead.duration}</span>
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6 p-4 bg-gray-50">
                  <FaPhoneAlt className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer transition-colors" />
                  <FaEnvelope className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer transition-colors" />
                  <FaWhatsapp className="text-green-600 hover:text-green-800 text-xl cursor-pointer transition-colors" />
                </div>
                <button
                  onClick={() => navigate("/get-qurey")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-b-xl cursor-pointer transition-colors duration-300 focus:ring-4 ring-blue-300 focus:outline-none"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Server-side pagination controls */}
        {leads.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={onPrev}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
            >
              <FaArrowLeft className="inline mr-2" /> Previous
            </button>
            <span className="text-gray-700 font-medium">
              Page {pagination.page} of{" "}
              {Math.ceil(pagination.totalDocs / pagination.limit)}
            </span>
            <button
              onClick={onNext}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Next <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelLeadsSlider;

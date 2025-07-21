import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpendTime = () => {
  const tags = [
    "Must-see Attractions",
    "Great Food",
    "Hidden Gems",
    "Adventure",
    "History",
    "Culture",
    "Relaxing",
  ];

  const [selectedTags, setSelectedTags] = useState([]);
  const [otherInput, setOtherInput] = useState("");

  const navigate=useNavigate()

  const handleToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white px-6 py-10 text-gray-800">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2 text-center">
          How do you want to spend your time?
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Choose as many as you’d like.
        </p>

        {/* Selectable Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleToggle(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200
              ${
                selectedTags.includes(tag)
                  ? "bg-blue-100 text-blue-600 border-blue-300 shadow-inner"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Other Input */}
        <div className="mb-20 px-2 sm:px-0">
          <label className="block font-semibold mb-2 text-gray-700">
            Other (optional)
          </label>
          <input
            type="text"
            maxLength={50}
            value={otherInput}
            onChange={(e) => setOtherInput(e.target.value)}
            placeholder="Nightlife, Spa, Shopping"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
          />
          <p className="text-sm text-gray-400 mt-1">
            Separate each entry with a comma · {otherInput.length}/50 characters
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="fixed bottom-6 right-6 sm:static sm:mt-4 text-center">
        <button
          onClick={() => navigate('/*trip-itinerary')}
          className="btn btn-primary text-white px-8 py-3 rounded-full shadow-md  transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpendTime;

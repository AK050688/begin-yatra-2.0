import React from "react";
import { MdSunnySnowing } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TripItinerary = () => {

  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white px-6 py-10 text-gray-800">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-blue-600 flex items-center mb-2">
          <span className="text-lg mr-2">📍</span>
          This trip is powered by Generative AI
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
          Your solo trip to <span className="text-blue-600">Noida</span> for{" "}
          <span className="text-black">5 days</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Itinerary Section */}
          <div className="md:col-span-2 space-y-10">
            {/* Day 1 */}
            <div className="bg-white border border-pink-100 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-blue-600 flex items-center mb-4">
                📅 Day 1
              </h2>

              {/* Morning */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center text-gray-700 mb-2">
                   Morning <span className="ml-2"><MdSunnySnowing /></span>
                </h3>
                <div className="ml-4 space-y-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-800"> Botanical Garden</p>
                    <p>
                      i-trip-builder Explore the lush greenery and diverse plant species at the
                      Botanical Garden, a perfect spot for a peaceful morning walk.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800"> ISKCON Temple</p>
                    <p>
                      i-trip-builder Visit the beautiful ISKCON Temple, known for its spiritual
                      ambiance and intricate architecture.
                    </p>
                  </div>
                </div>
              </div>

              {/* Afternoon */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center text-gray-700 mb-2">
                   Afternoon
                </h3>
                <div className="ml-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800"> Great India Place Mall</p>
                  <p>
                    i-trip-builder Indulge in shopping and entertainment at the Great India Place
                    Mall, offering a wide range of stores and dining options.
                  </p>
                </div>
              </div>

              {/* Evening */}
              <div>
                <h3 className="text-lg font-semibold flex items-center text-gray-700 mb-2">
                   Evening
                </h3>
                <div className="ml-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800"> Dinner at Barbeque Nation</p>
                  <p>
                    i-trip-builder Enjoy a buffet dinner at Barbeque Nation with unlimited grilled
                    starters and desserts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-xl shadow-lg overflow-hidden h-[400px] border border-gray-200">
            <iframe
              title="Noida Map"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112079.01417924899!2d77.2423042!3d28.5673549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce56eecbf20a1%3A0x4350e2f27f267489!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1654972055786!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition">
            ← Itinerary
          </button>
          <button onClick={()=>navigate('/*get-quote')} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition shadow-md">
            Get Quote →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripItinerary;

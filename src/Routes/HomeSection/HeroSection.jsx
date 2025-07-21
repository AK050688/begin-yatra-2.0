import React from 'react';

import { useNavigate } from 'react-router-dom';


const cardData = [
  {
    img: '/Images/goa.jpeg',
    place: 'Goa',
    price: 57758,
  },
  {
    img: '/Images/goa.jpeg',
    place: 'Goa',
    price: 57758,
  },
  {
    img: '/Images/goa.jpeg',
    place: 'Goa',
    price: 57758,
  },
  {
    img: '/Images/goa.jpeg',
    place: 'Goa',
    price: 57758,
  },
  {
    img: '/Images/goa.jpeg',
    place: 'Goa',
    price: 57758,
  },
  {
    img: '/Images/goa.jpeg',
    place: 'Goa',
    price: 57758,
  },
];

const HeroSection = () => {
  const navigate = useNavigate()

  const navigateHandler =()=>{
    navigate("/*location")
  }
  return (
    <div className="px-4 sm:px-6 md:px-12 py-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-[url('/Images/bgImg.avif')] bg-no-repeat bg-cover bg-center text-white h-[70vh] w-full rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            Plan Your <span className="text-[#3b82f6]">Holiday Packages</span>
          </h1>
          <p className="text-base md:text-xl font-medium drop-shadow-sm">
            Customize & Book Amazing Tours
          </p>

          {/* Search Box */}
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-full max-w-md shadow-md">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search destinations..."
              className="flex-1 px-2 py-1 outline-none text-gray-700"
            />
            <button className="bg-blue-600 cursor-pointer text-white px-4 py-1 rounded-full hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          {/* Top Destinations */}
          <div className="text-sm md:text-base mt-2">
            <span className="font-bold text-[#3b82f6]">Top Destinations: </span>
            Shimla, Manali, Goa, Kashmir, Kerala, Jaipur, Singapore, Thailand, Malaysia
          </div>
        </div>
      </div>

      {/* Promo Banner Section */}
      {/* <div onClick={navigateHandler} className="flex cursor-pointer flex-col-reverse lg:flex-row justify-center items-center gap-6 mt-16 bg-blue-100 rounded-2xl px-6 py-12">
        <div className="lg:w-1/2">
          <p className="text-sm text-gray-600">Powered by Generative AI</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#3b82f6] mt-2">
            Craft your trip in minutes
          </h2>
          <p className="mt-4 text-gray-700">
            We provide a seamless experience for planning your next travel adventure.
            Personalize your itinerary with confidence and ease, powered by smart AI insights.
          </p>
          <button className="mt-6 px-6 py-3 btn bg-[#3b82f6] text-white rounded-md hover:bg-white hover:text-[#3b82f6] hover:border hover:border-[#3b82f6] transition-all">
            Start a Trip Now
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img src="/Images/phone.png" alt="Phone" className="w-[200px] md:w-[250px] lg:w-[300px]" />
        </div>
      </div> */}

      {/* Tour Package Heading */}
      {/* <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mt-20 mb-12">
        Explore Best Popular Tour Packages
      </h3> */}

      

    

    </div>
  );
};

export default HeroSection;

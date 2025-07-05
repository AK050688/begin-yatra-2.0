import React from 'react';
import Card from '../../components/card';


const cardData = [
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
];


const BestPakages = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 py-16 bg-gradient-to-b from-blue-50 to-white">
           <div className="bg-[url('/Images/bg.png')] bg-contain bg-no-repeat text-white bg-center h-[70vh] w-full">
        <div className="absolute inset-0 h-[70vh] top-20 bg-black/50"></div>{" "}
        {/* Overlay for better text contrast */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            Plan Your <span className="text-[#3b82f6]"> Holiday Packages</span>
          </h1>

          <p className="text-lg md:text-xl font-medium drop-shadow-sm">
            Customize & Book Amazing Tours
          </p>

          {/* Search input */}
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
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search destinations..."
              className="flex-1 px-2 py-1 outline-none text-gray-700"
            />
            <button className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          {/* Destinations */}
          <div className="text-sm md:text-base mt-2">
            <span className="font-bold text-[#3b82f6]">Top Destinations: </span>
            <span>
              Shimla, Manali, Goa, Kashmir, Kerala, Jaipur, Singapore, Thailand,
              Malaysia
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center px-12">
        <div className="h-[70vh] w-full  flex gap-8  bg-blue-200  bg-center bg-cover  my-12 rounded-2xl px-12 ">
          <div className="px-24 py-12">
            <p className="text-sm mt-6">Powered by Generative Ai</p>
            <span className="md:text-4xl text-2xl  font-bold mt-6 text-[#3b82f6]">
              {" "}
              Crift your trif in minutes
            </span>
            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              necessitatibus eius, doloribus, quidem rem provident optio esse
              quod suscipit numquam omnis? Nam temporibus quae porro! Laboriosam
              labore unde eaque tempore repellat, odio voluptate. Consequuntur
              accusamus rem repudiandae eius ad sit.
            </p>
            <button className="w-60 mt-6 btn text-lg bg-[#3b82f6] hover:bg-white hover:text-[#3b82f6] hover:border-[#3b82f6] text-white">
              Start a Trip Now
            </button>
          </div>
          <img src="/Images/phone.png" alt="img" />
        </div>
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
         Explore Best Popular Tour Packages
      </h3>

<Card/>

     
      <div className="bg-[url(/Images/flightImg.jpg)] bg-cover bg-center text-white h-[60vh] sm:h-[70vh] w-full mt-20 rounded-3xl flex items-center justify-center shadow-xl relative overflow-hidden">
        <div className="bg-black/50 backdrop-blur-sm p-6 md:p-10 rounded-xl text-center max-w-xl z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"> Fly Anywhere with Confidence</h2>
          <p className="text-lg">Book flights, hotels, and experiences at exclusive prices. Your dream journey starts today!</p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md hover:from-orange-500 hover:to-pink-500 transition-all">
            Discover Offers
          </button>
        </div>

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-20 rounded-3xl" />
      </div>
      <div className=" mt-8">
   <div className="overflow-x-auto px-4">
  <div className="flex space-x-6 min-w-max">
    {cardData.map((card, index) => (
      <div
        key={index}
        className="min-w-[250px] bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all transform hover:-translate-y-1 hover:scale-[1.02]"
      >
        <div className="relative">
          <img
            src={card.img}
            alt={card.place}
            className="w-full h-48 object-cover"
          />
          {/* <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-md">
            Featured
          </span> */}
        </div>

        <div className="p-5 space-y-2">
          <h4 className="text-xl font-bold text-gray-800">{card.place}</h4>
        </div>
      </div>
    ))}
  </div>
</div>
</div>


    </div>
  );
};

export default BestPakages;
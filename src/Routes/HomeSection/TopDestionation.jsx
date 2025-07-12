import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const destinations = [
  {
    name: "Goa",
    image: "/Images/kashmir.jpg",
  },
  {
    name: "Kerala",
    image: "/Images/Andaman.jpg",
  },
  {
    name: "Manali",
    image: "/Images/rajastan.png",
  },
  {
    name: "Rajasthan",
    image: "/Images/kashmir.jpg",
  },
  {
    name: "Kashmir",
    image: "/Images/Andaman.jpg",
  },
  {
    name: "Andaman",
    image: "/Images/rajastan.png",
  },
];

// Custom arrows for slider
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-500 hover:text-white transition"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-500 hover:text-white transition"
  >
    <FaArrowLeft />
  </button>
);

const TopDestinations = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Top Destinations
      </h2>
      <div className="relative">
        <Slider {...settings}>
          {destinations.map((dest, index) => (
            <div key={index} className="px-3">
              <div className="overflow-hidden rounded-xl shadow-lg group">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="bg-white p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{dest.name}</h3>
                  {/* <button className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    View Packages
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopDestinations;
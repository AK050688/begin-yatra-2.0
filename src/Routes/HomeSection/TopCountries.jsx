import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-500 hover:text-white transition"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-500 hover:text-white transition"
  >
    <FaArrowLeft />
  </button>
);

const countries = [
  {
    name: "India",
    image: "/Images/rajastan.png",
    description:
      "Explore the cultural richness of Rajasthan, and the Himalayas.",
  },
  {
    name: "France",
    image: "/Images/goa.jpeg",
    description:
      "From the Eiffel Tower to the Riviera – discover romantic France.",
  },
  {
    name: "Italy",
    image: "/Images/Andaman.jpg",
    description:
      "Dive into history, art, and food in beautiful Italian cities.",
  },
  {
    name: "Thailand",
    image: "/Images/rajastan.png",
    description: "Tropical islands, street food, and rich heritage await you.",
  },
  {
    name: "Australia",
    image: "/Images/goa.jpeg",
    description:
      "Visit the land of kangaroos, beaches, and the Great Barrier Reef.",
  },
  {
    name: "Switzerland",
    image: "/Images/Andaman.jpg",
    description: "Snowy mountains, scenic lakes, and world-class chocolate.",
  },
];

const TopCountries = () => {
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
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12 relative">
      <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 ">
        Top Countries You Can <span className="text-[#3b82f6]"> Explore</span>
      </h4>

      <Slider {...settings}>
        {countries.map((country, index) => (
          <div key={index} className="px-3">
            <div
              className="h-64 rounded-xl overflow-hidden bg-cover bg-center relative group transition-all duration-300 shadow-lg"
              style={{ backgroundImage: `url(${country.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>
              <div className="absolute bottom-0 p-5 text-white w-full">
                <h3 className="text-xl font-bold">{country.name}</h3>
                <p className="text-sm text-gray-200 mt-1">
                  {country.description}
                </p>
                <button className="mt-3 text-sm px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 transition">
                  Explore →
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopCountries;

import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const destinations = [
  { name: "Goa", image: "/Images/banner.jpg" },
  { name: "Kerala", image: "/Images/bannerke.jpg" },
  { name: "Manali", image: "/Images/bannerImg.jpg" },
];

// Custom arrow components with enhanced styling
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
    aria-label="Next slide"
  >
    <FaArrowRight className="w-6 h-6" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
    aria-label="Previous slide"
  >
    <FaArrowLeft className="w-6 h-6" />
  </button>
);

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 rounded-full mx-1 transition-all duration-300 hover:bg-white/80" />
    ),
    dotsClass: "slick-dots absolute bottom-8",
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {destinations.map((dest, index) => (
          <div key={index} className="relative h-screen w-full">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 w-full h-full transform scale-100 transition-transform duration-1000">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover brightness-[0.65] transition-all duration-1000"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute w-full inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/30" />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-8 drop-shadow-2xl animate-fadeIn tracking-tight">
                Discover {dest.name}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 drop-shadow-md animate-fadeIn animation-delay-200">
                Plan your dream holiday with our exclusive packages
              </p>

              {/* Search Box */}
              <div className="flex items-center bg-white/95 rounded-full px-5 py-3 w-full max-w-lg shadow-2xl animate-slideUp transition-all duration-300 hover:shadow-xl">
                <svg
                  className="h-6 w-6 text-gray-600 mr-3"
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
                  placeholder="Search destinations..."
                  className="flex-1 px-3 py-2 outline-none text-gray-800 bg-transparent text-lg font-medium placeholder-gray-500"
                />
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg">
                  Explore
                </button>
              </div>

              {/* Destination Text */}
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom CSS for animations and dots */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .slick-dots li.slick-active div {
          background-color: #ffffff !important;
          transform: scale(1.3);
        }

        .slick-dots li {
          margin: 0 4px;
        }
      `}</style>
    </div>
  );
};

export default Banner;

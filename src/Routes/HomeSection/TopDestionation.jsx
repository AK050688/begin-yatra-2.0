import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const destinations = [
  {
    id: "1",
    name: "Goa",
    image: "/Images/kashmir.jpg",
  },
  {
    id: "2",
    name: "Kerala",
    image: "/Images/Andaman.jpg",
  },
  {
    id: "3",
    name: "Manali",
    image: "/Images/rajastan.png",
  },
  {
    id: "4",
    name: "Rajasthan",
    image: "/Images/kashmir.jpg",
  },
  {
    id: "5",
    name: "Kashmir",
    image: "/Images/Andaman.jpg",
  },
  {
    id: "6",
    name: "Andaman",
    image: "/Images/rajastan.png",
  },
];

// Custom arrows for carousel
const CustomArrow = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className={`absolute ${
      direction === "left" ? "left-0" : "right-0"
    } top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-500 hover:text-white transition`}
  >
    {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
);

const TopDestinations = ({ trendingDestinations = [] }) => {
  console.log("trendingDestinations", trendingDestinations);

  const navigate = useNavigate();

  // Helper function to get image URL
  const getImageUrl = (image) => {
    console.log("Image", image);

    if (!image) {
      return; // Default image
    }
    return `https://begin-yatra-nq40.onrender.com/public/temp/${image}`;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1439, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  const send = (id) => {
    navigate(`/destination/${id}`);
  };

  return (
    <div
      id="top-destinations"
      className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Trending <span className="text-[#3b82f6]">Destinations</span>
      </h2>
      <div className="relative">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all 0.5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          customLeftArrow={<CustomArrow direction="left" />}
          customRightArrow={<CustomArrow direction="right" />}
        >
          {trendingDestinations.length > 0 &&
            trendingDestinations.map((destination) => (
              <div key={destination._id} className="px-3">
                <div
                  onClick={() => send(destination._id)}
                  className="overflow-hidden cursor-pointer rounded-xl shadow-lg group"
                >
                  <img
                    src={getImageUrl(destination.destinationImage)}
                    alt={destination.destinationName}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    // onError={(e) => {
                    //   e.target.src = '/Images/kashmir.jpg';
                    // }}
                  />
                  <div className="bg-white p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {destination.destinationName}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default TopDestinations;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Custom Arrow for Carousel
const CustomArrow = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-500 hover:text-white transition`}
  >
    {direction === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
);

const TopCountries = ({
  domesticDestinations = [],
  internationalDestinations = [],
  loading = false,
}) => {
  const navigate = useNavigate();

  const truncateText = (text, maxWords = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };
  // Helper function to get image URL
  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return "/Images/rajastan.png"; // Default image
    }

    // If the image path is already a full URL, return it as is
    if (images[0].startsWith("http://") || images[0].startsWith("https://")) {
      return images[0];
    }

    // If it's a relative path, combine with base URL
    if (images[0].startsWith("/")) {
      return `https://begin-yatra-nq40.onrender.com/public/temp${images[0]}`;
    }

    // If it's just a filename, combine with base URL
    return `https://begin-yatra-nq40.onrender.com/public/temp/${images[0]}`;
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1
    }
  };

  const send = (name) => {
    navigate(`/countries/${name}`);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12 relative">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Top Countries You Can <span className="text-[#3b82f6]">Explore</span>
        </h4>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading destinations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-12 relative">
      {/* Domestic Destinations Section */}
      {domesticDestinations.length > 0 && (
        <div className="mb-12">
          <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Top Countries <span className="text-[#3b82f6]">Destinations</span>
          </h4>
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
            {domesticDestinations.map((destination) => (
              <div key={destination._id} className="px-3">
                <div
                  className="h-64 rounded-xl overflow-hidden bg-cover bg-center relative group transition-all duration-300 shadow-lg"
                  style={{
                    backgroundImage: `url(${getImageUrl(
                      destination.destinationImage
                    )})`,
                  }}>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>
                  <div className="absolute bottom-0 p-5 text-white w-full">
                    <h3 className="text-xl font-bold">
                      {destination.destinationName}
                    </h3>
                    <p className="text-sm text-gray-200 mt-1">
                      {truncateText(
                        destination.famousFor || destination.topAttraction
                      )}
                    </p>
                    <button
                      onClick={() => navigate(`/get-qurey`)}
                      className="mt-3 text-sm px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 transition">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* International Destinations Section */}
      {internationalDestinations.length > 0 && (
        <div className="mb-12">
          <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            International <span className="text-[#3b82f6]">Destinations</span>
          </h4>
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
            {internationalDestinations.map((destination) => (
              <div key={destination._id} className="px-3">
                <div
                  className="h-64 rounded-xl overflow-hidden bg-cover bg-center relative group transition-all duration-300 shadow-lg"
                  style={{
                    backgroundImage: `url(${getImageUrl(
                      destination.destinationImage
                    )})`,
                  }}>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>
                  <div className="absolute bottom-0 p-5 text-white w-full">
                    <h3 className="text-xl font-bold">
                      {destination.destinationName}
                    </h3>
                    <p className="text-sm text-gray-200 mt-1">
                      {destination.famousFor ||
                        destination.topAttraction ||
                        "Amazing destination"}
                    </p>
                    <button
                      onClick={() => send(destination.destinationName)}
                      className="mt-3 text-sm px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 transition">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default TopCountries;

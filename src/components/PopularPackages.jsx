import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../Api/ApiService";

const PopularPackages = ({ popularDestinations = [] }) => {
  const navigate = useNavigate();
  const truncateText = (text, maxWords = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1439, min: 1024 },
      items: 5,
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

  return (
    <div className="py-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-full mx-8 px-4">
        <div className="flex justify-start align-middle">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 ">
            Popular <span className="text-[#3b82f6]">Packages</span>
          </h2>
        </div>
        <div className="relative">
          {popularDestinations.length > 0 ? (
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2500}
              keyBoardControl={true}
              customTransition="all 0.5s"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {popularDestinations.map((destination, index) => (
                <div
                  key={destination._id || index}
                  onClick={() => navigate(`/destination/${destination._id}`)}
                  className="px-1"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-white max-w-[220px] w-full mx-auto hover:shadow-xl transition-all duration-300">
                    <img
                      src={getImageUrl(destination.destinationImage)}
                      alt={destination.destinationName}
                      className="w-full h-48 object-cover"
                      // onError={(e) => {
                      //   e.target.src = '/Images/rajastan.png';
                      // }}
                    />
                    {/* Text overlay at bottom */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3">
                      <h4 className="text-lg font-bold text-white">
                        {destination.destinationName}
                      </h4>
                      <p className="text-xs text-gray-200">
                        {truncateText(
                          destination.famousFor ||
                            destination.topAttraction ||
                            "Amazing destination"
                        )}
                      </p>
                      <p className="text-xs text-gray-300">Starting from</p>
                      <p className="text-sm font-semibold text-green-300">
                        ₹
                        {(destination.packagePrice || 50000).toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex justify-center items-center h-52 text-gray-500 text-lg">
              No packages found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularPackages;

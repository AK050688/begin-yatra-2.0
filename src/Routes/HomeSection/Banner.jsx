import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dummy destination data
const dummyDestinations = [
  { id: 1, name: "Goa", description: "Beach paradise with Portuguese heritage", image: "/BannerImages/Goa.png" },
  { id: 2, name: "Kerala", description: "God's own country with backwaters", image: "/BannerImages/kerala.png" },
  { id: 3, name: "Manali", description: "Himalayan hill station", image: "/BannerImages/Manali.png" },
  { id: 4, name: "Kashmir", description: "Paradise on earth", image: "/BannerImages/Kashmir.png" },
  { id: 5, name: "Darjeeling", description: "Queen of hills", image: "/BannerImages/Darjeeling.png" },
  { id: 6, name: "Sikkim", description: "Land of monasteries", image: "/BannerImages/Sikkim.png" },
  { id: 7, name: "Dubai", description: "City of gold", image: "/BannerImages/Dubai.png" },
  { id: 8, name: "Thailand", description: "Land of smiles", image: "/BannerImages/Thailand.png" },
];

const destinations = [
  { name: "Goa", image: "/BannerImages/Goa.png" },
  { name: "Kerala", image: "/BannerImages/Darjeeling.png" },
  { name: "Manali", image: "/BannerImages/Dubai.png" },
  { name: "Manali", image: "/BannerImages/Kashmir.png" },
  { name: "Manali", image: "/BannerImages/kerala.png" },
  { name: "Manali", image: "/BannerImages/Manali.png" },
  { name: "Manali", image: "/BannerImages/Sikkim.png" },
  { name: "Manali", image: "/BannerImages/Thailand.png" },
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 rounded-full mx-1 transition-all duration-300 hover:bg-white/80" />
    ),
    dotsClass: "slick-dots absolute bottom-8",
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = dummyDestinations.filter(dest =>
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setShowResults(true);
  };

  // Handle explore button click
  const handleExplore = () => {
    if (searchQuery.trim() === "") {
      // If no search query, navigate to all destinations
      navigate("/top-destinations");
      return;
    }

    if (searchResults.length > 0) {
      // Navigate to destinations page with search query
      navigate("/top-destinations", { 
        state: { 
          searchQuery: searchQuery,
          searchResults: searchResults 
        } 
      });
    } else {
      // Show no results found message
      alert("No destinations found for your search. Please try a different search term.");
    }
    setShowResults(false);
  };

  // Handle search result click
  const handleResultClick = (destination) => {
    navigate("/top-destinations", { 
      state: { 
        searchQuery: destination.name,
        searchResults: [destination] 
      } 
    });
    setShowResults(false);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleExplore();
    }
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
            <div className="absolute w-full inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />

            {/* Search Bar - Positioned at 70% from top */}
            <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
              <div className="relative">
                <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-2xl transition-all duration-300 hover:shadow-xl">
                  <FaSearch className="h-6 w-6 text-gray-600 mr-3" />
                  <input
                    type="search"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setShowResults(true)}
                    className="flex-1 px-3 py-2 outline-none text-gray-800 bg-transparent text-lg font-medium placeholder-gray-500"
                  />
                  <button 
                    onClick={handleExplore}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg"
                  >
                    Explore
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-100">
                    {searchResults.map((dest) => (
                      <div
                        key={dest.id}
                        onClick={() => handleResultClick(dest)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                          <p className="text-sm text-gray-600">{dest.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results Message */}
                {showResults && searchQuery.trim() !== "" && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                    <p className="text-gray-600 text-center">No destinations found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 text-white">
             
            </div>
          </div>
        ))}
      </Slider>

      {/* Click outside to close search results */}
      {showResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowResults(false)}
        />
      )}

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

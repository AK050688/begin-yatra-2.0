import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaSearch, FaSpinner } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../store/userSlice";

const Banner = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectAccessToken);

  const destinations = [
    { name: "Discover Goa", image: "/BannerImages/Goa.png" },
    { name: "Discover Darjeeling", image: "/BannerImages/Darjeeling.png" },
    { name: " Discover Dubai", image: "/BannerImages/Dubai.png" },
    { name: " Discover Kashmir", image: "/BannerImages/Kashmir.png" },
    { name: " Discover Kerala", image: "/BannerImages/kerala.png" },
    { name: " Discover Manali", image: "/BannerImages/Manali.png" },
    { name: " Discover Sikkim", image: "/BannerImages/Sikkim.png" },
    { name: " Discover Thailand", image: "/BannerImages/Thailand.png" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 rounded-full mx-1 transition-all duration-300 hover:bg-white/80" />
    ),
    dotsClass: "slick-dots absolute bottom-8",
  };

  // API call to fetch destinations with filtering
  const getAllDestinations = async (search = "") => {
    if (!search.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setLoading(false);
      return;
    }
    setIsSearching(true);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append("search", search);
      }

      const res = await api.get(
        `/api/destination/getAllDestination?${params.toString()}`,
        {
          headers: { Authorization: token },
        }
      );

      console.log("Search", res.data.data?.destinations);

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        // Filter destinations by destinationName
        const destinations = res.data.data?.destinations || [];
        const filteredDestinations = destinations.filter(dest =>
          dest.destinationName.toLowerCase().includes(search.toLowerCase())
        );
        
        // Map unique destination names
        const uniqueDestinations = Array.from(
          new Map(
            filteredDestinations.map((dest) => [dest.destinationName, dest])
          ).values()
        ).map((dest) => ({
          id: dest._id,
          name: dest.destinationName,
        }));
        
        setSearchResults(uniqueDestinations);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    getAllDestinations(query);
  };

  // Handle explore button click
  const handleExplore = () => {
    if (searchQuery.trim() === "") {
      navigate("#top-destinations");
      return;
    }

    if (searchResults.length === 1) {
      navigate(`/destination/${searchResults[0].id}`);
    } else if (searchResults.length > 1) {
      alert("Multiple destinations found. Please select one from the list.");
    } else {
      alert(
        "No destinations found for your search. Please try a different search term."
      );
    }
    setShowResults(false);
  };

  // Handle search result click
  const handleResultClick = (id) => {
    navigate(`/destination/${id}`);
    setShowResults(false);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleExplore();
    }
  };

  return (
    <div className="relative w-full bg-white overflow-hidden lg:h-screen md:h-[80vh] h-[55vh]">
      {/* Carousel */}
      <Slider {...settings}>
        {destinations.map((dest, index) => (
          <div key={index} className="relative h-screen w-full">
            <div className="absolute inset-0 w-full lg:h-screen md:h-[80vh] h-[55vh] transform scale-100 transition-transform duration-1000">
              <div className="absolute flex justify-center mx-auto w-full top-[40%] ">
                <h1 className="absolute font-extrabold lg:text-7xl md:text-4xl text-3xl z-50 text-white ">{dest.name}</h1>
              </div>
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full lg:h-screen md:h-[80vh] h-[55vh] object-cover brightness-[0.65] transition-all duration-1000"
              />
            </div>
            <div className="absolute w-full inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
          </div>
        ))}
      </Slider>

      {/* Fixed Search Bar */}
      <div className="absolute top-[60%] lg:top-[65%] md:top-[60%] left-1/2 transform -translate-x-1/2 z-0 w-full max-w-lg px-4">
        <div className="relative z-50">
          <div className="flex lg:flex-row md:flex-row flex-col gap-3 items-stretch sm:items-center">
            <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-full px-4 py-1 shadow-2xl transition-all duration-300 hover:shadow-xl gap-2 sm:gap-0">
              {isSearching ? (
                <FaSpinner
                  className="lg:h-5 lg:w-5 h-6 sm:w-6 text-gray-600 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <FaSearch
                  className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
                  aria-hidden="true"
                />
              )}
              <input
                type="search"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
                className="flex-1 px-3 lg:py-2 md:py-2 py-1 outline-none text-gray-800 bg-transparent text-base sm:text-lg font-medium placeholder-gray-500 w-full"
                aria-label="Search destinations"
              />
            </div>
            <button
              onClick={handleExplore}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 lg:py-2 md:py-2 py-1 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-base sm:text-lg w-full sm:w-auto"
              aria-label="Explore destinations"
            >
              Explore
            </button>
          </div>

          {/* Dropdown results */}
          {showResults && searchResults.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              role="listbox"
            >
              {searchResults.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleResultClick(dest.id)}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  role="option"
                  aria-selected="false"
                >
                  <div className="flex-1" onClick={() => handleResultClick(dest.id)}>
                    <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {showResults && searchQuery.trim() !== "" && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-[9999]">
              <p className="text-gray-600 text-center">
                No destinations found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close search results */}
      {showResults && (
        <div
          className="fixed z-100"
          onClick={() => setShowResults(false)}
          aria-hidden="true"
        />
      )}

      {/* Custom CSS */}
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
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const dummyDestinations = [
  { 
    id: 1, 
    name: "Goa", 
    description: "Famous for its beaches and vibrant nightlife.", 
    image: "/BannerImages/Goa.png",
    rating: 4.5,
    price: "₹15,000",
    duration: "5 Days / 4 Nights"
  },
  { 
    id: 2, 
    name: "Manali", 
    description: "A beautiful hill station in Himachal Pradesh.", 
    image: "/BannerImages/Manali.png",
    rating: 4.3,
    price: "₹12,000",
    duration: "4 Days / 3 Nights"
  },
  { 
    id: 3, 
    name: "Jaipur", 
    description: "The Pink City, known for its rich history and culture.", 
    image: "/BannerImages/rajastan.png",
    rating: 4.4,
    price: "₹10,000",
    duration: "3 Days / 2 Nights"
  },
  { 
    id: 4, 
    name: "Kerala", 
    description: "God's own country with backwaters and beaches.", 
    image: "/BannerImages/kerala.png",
    rating: 4.6,
    price: "₹18,000",
    duration: "6 Days / 5 Nights"
  },
  { 
    id: 5, 
    name: "Kashmir", 
    description: "Paradise on earth with stunning landscapes.", 
    image: "/BannerImages/Kashmir.png",
    rating: 4.7,
    price: "₹20,000",
    duration: "7 Days / 6 Nights"
  },
  { 
    id: 6, 
    name: "Darjeeling", 
    description: "Queen of hills with tea gardens.", 
    image: "/BannerImages/Darjeeling.png",
    rating: 4.2,
    price: "₹14,000",
    duration: "5 Days / 4 Nights"
  },
  { 
    id: 7, 
    name: "Sikkim", 
    description: "Land of monasteries and mountains.", 
    image: "/BannerImages/Sikkim.png",
    rating: 4.4,
    price: "₹16,000",
    duration: "6 Days / 5 Nights"
  },
  { 
    id: 8, 
    name: "Dubai", 
    description: "City of gold with modern architecture.", 
    image: "/BannerImages/Dubai.png",
    rating: 4.8,
    price: "₹35,000",
    duration: "5 Days / 4 Nights"
  },
  { 
    id: 9, 
    name: "Thailand", 
    description: "Land of smiles with beautiful beaches.", 
    image: "/BannerImages/Thailand.png",
    rating: 4.5,
    price: "₹25,000",
    duration: "6 Days / 5 Nights"
  },
];

const TopDestinations = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(dummyDestinations);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    // Check if search data was passed from Banner component
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      setIsSearchMode(true);
      
      if (location.state.searchResults) {
        setFilteredDestinations(location.state.searchResults);
      } else {
        // Filter based on search query
        const filtered = dummyDestinations.filter(dest =>
          dest.name.toLowerCase().includes(location.state.searchQuery.toLowerCase()) ||
          dest.description.toLowerCase().includes(location.state.searchQuery.toLowerCase())
        );
        setFilteredDestinations(filtered);
      }
    }
  }, [location.state]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredDestinations(dummyDestinations);
      setIsSearchMode(false);
      return;
    }

    const filtered = dummyDestinations.filter(dest =>
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDestinations(filtered);
    setIsSearchMode(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredDestinations(dummyDestinations);
    setIsSearchMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isSearchMode ? "Search Results" : "Top Destinations"}
              </h1>
              <p className="text-gray-600 mt-1">
                {isSearchMode 
                  ? `Found ${filteredDestinations.length} destination${filteredDestinations.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  : "Discover amazing places to visit"
                }
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
                <FaSearch className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 px-3 py-2 outline-none text-gray-900 placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="px-3 py-2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12">
            <FaMapMarkerAlt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No destinations found
            </h2>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `No destinations found for "${searchQuery}". Try a different search term.`
                : "No destinations available at the moment."
              }
            </p>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover"
                    // onError={(e) => {
                    //   e.target.src = "/public/Images/banner.jpg";
                    // }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <FaStar className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {dest.rating}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {dest.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="h-4 w-4" />
                      <span>{dest.duration}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {dest.price}
                      </div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  </div>
);
};

export default TopDestinations; 
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/ApiService";

const priceRanges = [
  { label: "₹ 0 - ₹ 10,000 per person", min: 0, max: 10000 },
  { label: "₹ 10,001 - ₹ 20,000 per person", min: 10001, max: 20000 },
  { label: "₹ 20,001 - ₹ 50,000 per person", min: 20001, max: 50000 },
  { label: "₹ 50,000+ per person", min: 50001, max: Infinity },
];

const durationRanges = [
  { label: "0 – 4 Days", min: 0, max: 4 },
  { label: "5 – 9 Days", min: 5, max: 9 },
  { label: "10 – 15 Days", min: 10, max: 15 },
  { label: "16 – 25 Days", min: 16, max: 25 },
  { label: "25+ Days", min: 26, max: Infinity },
];

// const getUniqueDestinations = (pkgs) => {
//   const set = new Set(pkgs.map((p) => p.location));
//   return Array.from(set);
// };

const AllPackages = () => {
  // API states
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);

  // Filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDurationRanges, setSelectedDurationRanges] = useState([]);
  const [appliedPriceRanges, setAppliedPriceRanges] = useState([]);
  const [appliedDurationRanges, setAppliedDurationRanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Responsive sidebar state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const navigate = useNavigate();

  // API call to fetch packages
  const getAllPackages = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/package/getAllPackages?page=${pageNum}`);
      console.log("Response from getAllPackages:", res);
      
      if (res.data.statusCode === 200) {
        setPackages(res.data.data.Package);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalPackages(res.data.data.total || 0);
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPackages(page);
  }, [page]);

  // Helper function to truncate text to one line
  const truncateToOneLine = (text, maxLength = 70) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Helper function to get duration from totalDaysNight string
  const getDurationFromTotalDaysNight = (totalDaysNight) => {
    if (!totalDaysNight) return null;
    
    // Extract the number of days from "5 Days / 4 Nights" format
    const match = totalDaysNight.match(/(\d+)\s+Days/);
    return match ? parseInt(match[1]) : null;
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price) return "Contact for price";
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Filtering logic
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Search filter
      const search = searchTerm.trim().toLowerCase();
      let searchMatch = true;
      if (search.length > 0) {
        searchMatch =
          pkg.packageName?.toLowerCase().includes(search) ||
          pkg.theme?.toLowerCase().includes(search) ||
          pkg.AboutPackage?.toLowerCase().includes(search) ||
          pkg.description?.toLowerCase().includes(search);
      }
      
      // Price filter
      let priceMatch = true;
      if (appliedPriceRanges.length > 0) {
        priceMatch = appliedPriceRanges.some((rangeIdx) => {
          const range = priceRanges[rangeIdx];
          const price = parseFloat(pkg.packagePrice) || 0;
          return price >= range.min && price <= range.max;
        });
      }
      
      // Duration filter - using totalDaysNight if available
      let durationMatch = true;
      if (appliedDurationRanges.length > 0) {
        durationMatch = appliedDurationRanges.some((rangeIdx) => {
          const range = durationRanges[rangeIdx];
          const duration = getDurationFromTotalDaysNight(pkg.totalDaysNight) || 0;
          return duration >= range.min && duration <= range.max;
        });
      }
      
      return searchMatch && priceMatch && durationMatch;
    });
  }, [packages, searchTerm, appliedPriceRanges, appliedDurationRanges]);

  // Handlers
  const handlePriceChange = (idx) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  
  const handleDurationChange = (idx) => {
    setSelectedDurationRanges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  
  const handleApplyFilter = () => {
    setAppliedPriceRanges(selectedPriceRanges);
    setAppliedDurationRanges(selectedDurationRanges);
  };
  
  const handleReset = () => {
    setSelectedPriceRanges([]);
    setSelectedDurationRanges([]);
    setAppliedPriceRanges([]);
    setAppliedDurationRanges([]);
    setSearchTerm("");
  };

  // Navigation handler
  const handleViewDetails = (pkg) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate('/get-qurey');
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  // Helper function to get package image with fallback
  const getImageUrl = (pkg) => {
    // 1. Use packageImage if available and not empty
    if (pkg.packageImage && pkg.packageImage.length > 0) {
      const imagePath = Array.isArray(pkg.packageImage) ? pkg.packageImage[0] : pkg.packageImage;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      return `https://begin-yatra-nq40.onrender.com/public/temp/${imagePath}`;
    }

    // 2. Use destination image if available
    if (
      pkg.destinationId &&
      pkg.destinationId.destinationImage &&
      pkg.destinationId.destinationImage.length > 0
    ) {
      const imagePath = pkg.destinationId.destinationImage[0];
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      return `https://begin-yatra-nq40.onrender.com/public/temp/${imagePath}`;
    }

    // 3. Fallback image
    return '/Images/banner.jpg';
  };
  // const getPackageImage = (pkg) => {
  //   if (pkg.packageImage) {
  //     return pkg.packageImage;
  //   }
    
  //   const theme = pkg.theme?.toLowerCase();
    
  // };

  // Get unique themes for filter display
  const uniqueThemes = useMemo(() => {
    const themes = packages.map(pkg => pkg.theme).filter(Boolean);
    return [...new Set(themes)];
  }, [packages]);

  // Get price and duration statistics for filter display
  const filterStats = useMemo(() => {
    const prices = packages.map(pkg => parseFloat(pkg.packagePrice)).filter(price => !isNaN(price));
    const durations = packages.map(pkg => getDurationFromTotalDaysNight(pkg.totalDaysNight)).filter(duration => duration !== null);
    
    return {
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
      minDuration: durations.length > 0 ? Math.min(...durations) : 0,
      maxDuration: durations.length > 0 ? Math.max(...durations) : 0,
      totalPackages: totalPackages,
      filteredPackages: filteredPackages.length
    };
  }, [packages, filteredPackages, totalPackages]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <>
      <div className="relative h-[20rem] sm:h-[28rem] w-full bg-[url('/Images/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12 py-12">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-6 text-center animate-fade-in-down">
            All Packages
          </h1>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-6 sm:py-10 px-2 md:px-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4 flex justify-between items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={() => setShowMobileFilters((prev) => !prev)}
            >
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="text-sm text-gray-600">
              {filterStats.filteredPackages} of {filterStats.totalPackages} packages
            </div>
          </div>
          
          {/* Sidebar Filters */}
          <div className={`w-full md:w-auto ${showMobileFilters ? '' : 'hidden'} md:block`}>
            <aside className="w-full md:w-80 bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-6 mb-4 md:mb-0">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Filter by</h2>
                <button 
                  className="text-blue-600 font-semibold cursor-pointer hover:underline text-sm" 
                  onClick={handleReset}
                >
                  Reset all
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {/* Price Range Filter */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                    Price Range <span className="text-gray-500 text-xs">(per person)</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {priceRanges.map((range, idx) => (
                      <label key={range.label} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base cursor-pointer">
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          checked={selectedPriceRanges.includes(idx)}
                          onChange={() => handlePriceChange(idx)}
                        />
                        <span>{range.label}</span>
                        {appliedPriceRanges.includes(idx) && (
                          <span className="ml-auto text-blue-600 text-xs">✓</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1 mt-4 text-sm sm:text-base">Duration</div>
                  <div className="flex flex-col gap-2 mt-2">
                    {durationRanges.map((range, idx) => (
                      <label key={range.label} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base cursor-pointer">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          checked={selectedDurationRanges.includes(idx)}
                          onChange={() => handleDurationChange(idx)}
                        />
                        <span>{range.label}</span>
                        {appliedDurationRanges.includes(idx) && (
                          <span className="ml-auto text-blue-600 text-xs">✓</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Theme Filter */}
                {uniqueThemes.length > 0 && (
                  <div>
                    <div className="font-semibold text-gray-800 mb-1 mt-4 text-sm sm:text-base">Theme</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {uniqueThemes.map((theme) => (
                        <span
                          key={theme}
                          className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply Filter Button */}
                <button
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 cursor-pointer transition mt-4 text-sm sm:text-base"
                  onClick={handleApplyFilter}
                >
                  Apply Filter
                </button>

                {/* Clear Filters Button */}
                {(selectedPriceRanges.length > 0 || selectedDurationRanges.length > 0 || searchTerm) && (
                  <button
                    className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 cursor-pointer transition text-sm sm:text-base"
                    onClick={handleReset}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>
          </div>
          
          {/* Package Cards */}
          <main className="flex-1">
            {/* Search and Filter Summary */}
            <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing {filterStats.filteredPackages} of {filterStats.totalPackages} packages</span>
                {(appliedPriceRanges.length > 0 || appliedDurationRanges.length > 0 || searchTerm) && (
                  <span className="text-blue-600">(filtered)</span>
                )}
              </div>
              <input
                type="text"
                placeholder="Search by name, theme, or description..."
                className="w-full sm:w-96 px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Loading State */}
            {loading && (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading packages...</p>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="text-center py-10">
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => getAllPackages(page)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            )}
            
            {/* Packages Grid */}
            {!loading && !error && (
              <div className="grid gap-4 sm:gap-8 grid-cols-1">
                {filteredPackages.length === 0 && (
                  <div className="text-center text-gray-500 text-base sm:text-xl py-10 sm:py-20">
                    <div className="mb-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p>No packages found for selected filters.</p>
                    <button 
                      onClick={handleReset}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100"
                  >
                    <div className="relative w-full md:w-72 h-48 sm:h-60">
                      <img
                        src={getImageUrl(pkg)}
                        alt={pkg.packageName}
                        className="w-full h-48 sm:h-60 object-cover object-center rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
                        }}
                        loading="lazy"
                      />
                      {/* Optional: Loading placeholder */}
                      <div className="absolute inset-0 bg-gray-200 animate-pulse hidden" />
                    </div>
                    <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg sm:text-2xl font-bold text-blue-700 mb-2">
                          {pkg.packageName}
                        </h2>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                          {truncateToOneLine(pkg.AboutPackage)}
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
                          {pkg.theme && (
                            <span className="inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                              {pkg.theme}
                            </span>
                          )}
                          {pkg.totalDaysNight && (
                            <span className="inline-block bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                              {pkg.totalDaysNight}
                            </span>
                          )}
                          {pkg.packageSummery && pkg.packageSummery.length > 0 && (
                            <span className="inline-block bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                              {pkg.packageSummery.length} Day{pkg.packageSummery.length > 1 ? 's' : ''} Plan
                            </span>
                          )}
                        </div>
                        {/* Package Summary Preview */}
                        {/* {pkg.packageSummery && pkg.packageSummery.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Itinerary Preview:</h4>
                            <div className="space-y-1">
                              {pkg.packageSummery.slice(0, 2).map((day, index) => (
                                <div key={day._id || index} className="flex items-start gap-2 text-xs text-gray-600">
                                  <span className="font-medium text-blue-600 min-w-[40px]">{day.day}</span>
                                  <span>{day.about}</span>
                                </div>
                              ))}
                              {pkg.packageSummery.length > 2 && (
                                <div className="text-xs text-blue-600 font-medium">
                                  +{pkg.packageSummery.length - 2} more days
                                </div>
                              )}
                            </div>
                          </div>
                        )} */}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-2 sm:gap-0">
                        <div className="flex flex-col">
                          <span className="text-lg sm:text-2xl font-bold text-green-600">
                            {formatPrice(pkg.packagePrice)}
                          </span>
                          <span className="text-xs text-gray-500">per person</span>
                        </div>
                        <button
                          className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base"
                          onClick={() => handleViewDetails(pkg)}
                        >
                          Get Inquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Enhanced Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="text-sm text-gray-600">
                    Showing page {page} of {totalPages} ({totalPackages} total packages)
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="px-3 py-2 bg-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition text-sm"
                    >
                      ← Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded text-sm transition ${
                            pageNum === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className="px-3 py-2 bg-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition text-sm"
                    >
                      Next →
                    </button>
                  </div>
                </div>
                
                {/* Quick Navigation */}
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={page === 1}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50"
                  >
                    First
                  </button>
                  <span className="text-gray-400">|</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={page === totalPages}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AllPackages;
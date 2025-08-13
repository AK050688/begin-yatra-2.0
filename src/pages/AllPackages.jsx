import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api, { getImageUrl } from "../Api/ApiService";
import debounce from "lodash/debounce"; // Add lodash for debouncing

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

const AllPackages = () => {
  // API states
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);

  // Filter states
  const [priceRangesFilter, setPriceRangesFilter] = useState([]);
  const [durationRangesFilter, setDurationRangesFilter] = useState([]);
  const [themeFilter, setThemeFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Responsive sidebar state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const navigate = useNavigate();

  // Debounce search input
  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setDebouncedSearchTerm(value);
      setPage(1); // Reset page to 1 on search change
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
  };

  // API call to fetch packages
  const getAllPackages = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/package/getAllPackages?page=${pageNum}`);
      console.log("Response from getAllPackages:", res);

      if (res.data.statusCode === 200) {
        setPackages(res.data.data.Package || []);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalPackages(res.data.data.total || 0);
      } else {
        setError("Failed to fetch packages: Invalid response");
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError(err.response?.data?.message || "Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllPackages(page);
  }, [page, getAllPackages]);

  // Helper function to truncate text
  const truncateToOneLine = (text, maxLength = 70) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Helper function to get duration from totalDaysNight
  const getDurationFromTotalDaysNight = (totalDaysNight) => {
    if (!totalDaysNight) return null;
    const match = totalDaysNight.match(/(\d+)\s+Days/);
    return match ? parseInt(match[1]) : null;
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price) return "Contact for price";
    return `₹${price.toLocaleString("en-IN")}`;
  };

  // Filtering logic
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Search filter
      const search = debouncedSearchTerm.trim().toLowerCase();
      let searchMatch = true;
      if (search.length > 0) {
        searchMatch =
          pkg.packageName?.toLowerCase().includes(search) ||
          pkg.theme?.toLowerCase().includes(search) ||
          pkg.AboutPackage?.toLowerCase().includes(search) ||
          pkg.destinationId?.destinationName?.toLowerCase().includes(search);
      }

      // Price filter
      let priceMatch = true;
      if (priceRangesFilter.length > 0) {
        priceMatch = priceRangesFilter.some((rangeIdx) => {
          const range = priceRanges[rangeIdx];
          const price = parseFloat(pkg.packagePrice) || 0;
          return price >= range.min && price <= range.max;
        });
      }

      // Duration filter
      let durationMatch = true;
      if (durationRangesFilter.length > 0) {
        durationMatch = durationRangesFilter.some((rangeIdx) => {
          const range = durationRanges[rangeIdx];
          const duration = getDurationFromTotalDaysNight(pkg.totalDaysNight) || 0;
          return duration >= range.min && duration <= range.max;
        });
      }

      // Theme filter
      let themeMatch = true;
      if (themeFilter.length > 0) {
        themeMatch = themeFilter.includes(pkg.theme);
      }

      return searchMatch && priceMatch && durationMatch && themeMatch;
    });
  }, [packages, debouncedSearchTerm, priceRangesFilter, durationRangesFilter, themeFilter]);

  // Filter handlers
  const handlePriceChange = useCallback((idx) => {
    setPriceRangesFilter((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
    setPage(1); // Reset page to 1 on filter change
  }, []);

  const handleDurationChange = useCallback((idx) => {
    setDurationRangesFilter((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
    setPage(1); // Reset page to 1 on filter change
  }, []);

  const handleThemeChange = useCallback((theme) => {
    setThemeFilter((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
    setPage(1); // Reset page to 1 on filter change
  }, []);

  const handleReset = useCallback(() => {
    setPriceRangesFilter([]);
    setDurationRangesFilter([]);
    setThemeFilter([]);
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setPage(1); // Reset page to 1 on reset
  }, []);

  // Navigation handler
  const handleViewDetails = useCallback((pkg) => {
    localStorage.setItem("selectedPackage", JSON.stringify(pkg));
    navigate("/get-qurey");
  }, [navigate]);

  // Pagination handlers
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  }, [page, totalPages, handlePageChange]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  }, [page, handlePageChange]);

  // Get unique themes for filter display
  const uniqueThemes = useMemo(() => {
    const themes = packages.map((pkg) => pkg.theme).filter(Boolean);
    return [...new Set(themes)];
  }, [packages]);

  // Get price and duration statistics
  const filterStats = useMemo(() => {
    const prices = packages.map((pkg) => parseFloat(pkg.packagePrice)).filter((price) => !isNaN(price));
    const durations = packages
      .map((pkg) => getDurationFromTotalDaysNight(pkg.totalDaysNight))
      .filter((duration) => duration !== null);

    return {
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
      minDuration: durations.length > 0 ? Math.min(...durations) : 0,
      maxDuration: durations.length > 0 ? Math.max(...durations) : 0,
      totalPackages: totalPackages,
      filteredPackages: filteredPackages.length,
    };
  }, [packages, filteredPackages, totalPackages]);

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
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
  }, [page, totalPages]);

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
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <div className="text-sm text-gray-600">
              {filterStats.filteredPackages} of {filterStats.totalPackages} packages
            </div>
          </div>

          {/* Sidebar Filters */}
          <div className={`w-full md:w-auto ${showMobileFilters ? "block" : "hidden"} md:block transition-all duration-300`}>
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
                      <label
                        key={range.label}
                        className="flex items-center gap-2 text-gray-700 text-sm sm:text-base cursor-pointer"
                      >
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          checked={priceRangesFilter.includes(idx)}
                          onChange={() => handlePriceChange(idx)}
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <div className="font-semibold text-gray-800 mb-1 mt-4 text-sm sm:text-base">Duration</div>
                  <div className="flex flex-col gap-2 mt-2">
                    {durationRanges.map((range, idx) => (
                      <label
                        key={range.label}
                        className="flex items-center gap-2 text-gray-700 text-sm sm:text-base cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          checked={durationRangesFilter.includes(idx)}
                          onChange={() => handleDurationChange(idx)}
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Theme Filter */}
                {uniqueThemes.length > 0 && (
                  <div>
                    <div className="font-semibold text-gray-800 mb-1 mt-4 text-sm sm:text-base">Theme</div>
                    <div className="flex flex-col gap-2 mt-2">
                      {uniqueThemes.map((theme) => (
                        <label
                          key={theme}
                          className="flex items-center gap-2 text-gray-700 text-sm sm:text-base cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={themeFilter.includes(theme)}
                            onChange={() => handleThemeChange(theme)}
                          />
                          <span>{theme}</span>
                        </label>
                      ))}
                    </div>
                  </div>
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
                {(priceRangesFilter.length > 0 || durationRangesFilter.length > 0 || themeFilter.length > 0 || debouncedSearchTerm) && (
                  <span className="text-blue-600">(filtered)</span>
                )}
              </div>
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search by name, theme, or destination..."
                  className="w-full text-black px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
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
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
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
                        src={getImageUrl(pkg?.destinationId?.destinationImage)}
                        alt={pkg.packageName}
                        className="w-full h-48 sm:h-60 object-cover object-center rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                        // onError={(e) => {
                        //   e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
                        // }}
                        loading="lazy"
                      />
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
                              {pkg.packageSummery.length} Day{pkg.packageSummery.length > 1 ? "s" : ""} Plan
                            </span>
                          )}
                        </div>
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

                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded text-sm transition ${
                            pageNum === page
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
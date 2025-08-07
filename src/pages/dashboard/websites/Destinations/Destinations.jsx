import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import CreateDestinationModal from "./CreateDestinationModal";
import UpdateDestinationModal from "./UpdateDestinationModal";
import AddPlaceModal from "./AddPlaceModal";
import CreatePackageModal from "./CreatePackageModal";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../../store/userSlice";
import api from "../../../../Api/ApiService";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaEye,
  FaPlus,
  FaMapMarkerAlt,
  FaSuitcase,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

const Destinations = () => {
  const token = useSelector(selectAccessToken);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreatePackageModal, setShowCreatePackageModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  console.log("selectedDestination", selectedDestination);

  const [places, setPlaces] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [destinations, setDestinations] = useState([]);
  console.log("destinations", destinations);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    destinationName: "",
    isPopularDestination: "",
    isTrandingDestination: "",
  });
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDestinations, setTotalDestinations] = useState(0);
  const PAGE_SIZE = 10;

  // Helper function to truncate text
  const truncateText = (text, maxWords = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Helper function to check if text needs truncation
  const needsTruncation = (text, maxWords = 5) => {
    if (!text) return false;
    const words = text.split(" ");
    return words.length > maxWords;
  };

  // Handle view details
  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
    setShowDetailsModal(true);
  };

  // Handle create package
  const handleCreatePackage = (destination) => {
    setSelectedDestination(destination);
    setShowCreatePackageModal(true);
  };

  // Handle delete destination
  const handleDeleteDestination = async (destinationId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this destination? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const res = await api.delete(
        `/api/destination/deleteDestination/${destinationId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Destination deleted successfully!");
        getAllDestinations(page); // Refresh the list
      } else {
        alert("Failed to delete destination");
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete destination");
    }
  };

  // Get image URL helper
  const getImageUrl = (image) => {
    if (!image) {
      return; // Default image
    }
    return `https://begin-yatra-nq40.onrender.com/public/temp/${image}`;
  };

  // Fetch all places
  const getAllPlaces = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/place/getAllPlace", {
        headers: {
          Authorization: token,
        },
      });
      console.log("res places", res);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        setPlaces(res.data.data.places || []);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      setMessage("Failed to fetch places");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all packages
  const getAllPackages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/package/getAllPackages`);
      console.log("Response from getAllPackages:", res);
      
      if (res.data.statusCode === 200) {
        setPackages(res.data.data.Package);
      
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate match score for sorting
  const calculateMatchScore = (destination, searchTerm) => {
    if (!searchTerm) return 0;
    const name = destination.destinationName?.toLowerCase() || "";
    searchTerm = searchTerm.toLowerCase().trim();

    // Exact match or starts with search term gets highest score
    if (name === searchTerm) return 3;
    if (name.startsWith(searchTerm)) return 2;
    if (name.includes(searchTerm)) return 1;
    return 0;
  };

  // Debounced fetch function to prevent excessive API calls
  const debouncedFetchDestinations = useCallback(
    debounce((pageNum, filterValues) => {
      getAllDestinations(pageNum, filterValues);
    }, 500),
    []
  );

  // Fetch destinations with sorting
  const getAllDestinations = async (pageNum = 1, filterValues = filters) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filterValues).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          params.append(key, value);
        }
      });
      params.append("page", pageNum);
      params.append("limit", PAGE_SIZE);

      const res = await api.get(
        `/api/destination/getAllDestination?${params.toString()}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(">>>>>>>>>>>>>>>>>>>>", res.data.data.destinations);

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        let fetchedDestinations = res.data.data.destinations || [];

        // Sort destinations based on search term (combine search and destinationName)
        const searchTerm = (
          filterValues.search ||
          filterValues.destinationName ||
          ""
        ).trim();
        if (searchTerm) {
          fetchedDestinations = fetchedDestinations.sort((a, b) => {
            const scoreA = calculateMatchScore(a, searchTerm);
            const scoreB = calculateMatchScore(b, searchTerm);
            return scoreB - scoreA; // Higher score comes first
          });
        }

        setDestinations(fetchedDestinations);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalDestinations(res.data.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setError("Failed to fetch destinations");
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        [name]: checked ? "true" : "",
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when filtering
    getAllDestinations(1);
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "") : value,
    }));
    setPage(1); // Reset to first page on filter change
  };

  // Reset filters
  const handleReset = () => {
    setFilters({
      search: "",
      status: "",
      destinationName: "",
      isPopularDestination: "",
      isTrandingDestination: "",
    });
    setPage(1);
  };

  // Effect to fetch data when page or filters change
  useEffect(() => {
    getAllPlaces();
    getAllPackages();
    debouncedFetchDestinations(page, filters);
    return () => debouncedFetchDestinations.cancel(); // Cleanup debounce on unmount
  }, [page, filters, debouncedFetchDestinations]);

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="p-2 sm:p-4 md:p-6 w-full">
      {/* Header with stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Destinations Management
        </h1>
        <div className="text-sm text-gray-600">
          Showing {destinations.length} of {totalDestinations} destinations
          (Page {page} of {totalPages})
        </div>
      </div>

      {/* Filter Form */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search destinations..."
                value={filters.search}
                onChange={handleFilterChange}
                className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full"
              />
              {loading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <div className="flex items-center gap-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="isPopularDestination"
                  checked={filters.isPopularDestination === "true"}
                  onChange={handleFilterChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                />
                Popular
              </label>
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="isTrandingDestination"
                  checked={filters.isTrandingDestination === "true"}
                  onChange={handleFilterChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                />
                Trending
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800 text-sm">
              Clear Filters
            </button>
            <button
              type="button"
              onClick={() => setShowDestinationModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
              <FaPlus className="text-sm" />
              Create Destination
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading destinations...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => getAllDestinations(page)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      )}

      {/* Destinations Content */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-scroll">
              <table className="min-w-full overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination Name
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Top Attraction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Famous For
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour Guide
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Popular
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trending
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {destinations.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-4 text-center text-gray-500">
                        No destinations found.
                      </td>
                    </tr>
                  ) : (
                    destinations.map((dest) => (
                      <tr key={dest._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={getImageUrl(dest.destinationImage)}
                              alt={dest.destinationName}
                              // onError={(e) => {
                              //   e.target.src = "/public/Images/banner.jpg";
                              // }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span
                              title={dest.destinationName}
                              className="font-medium">
                              {dest.destinationName}
                            </span>
                          </div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span title={dest.topAttraction}>
                              {truncateText(dest.topAttraction)}
                            </span>
                            {needsTruncation(dest.topAttraction) && (
                              <button
                                onClick={() => handleViewDetails(dest)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span title={dest.famousFor}>
                              {truncateText(dest.famousFor)}
                            </span>
                            {needsTruncation(dest.famousFor) && (
                              <button
                                onClick={() => handleViewDetails(dest)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span title={dest.tourGuide}>
                              {truncateText(dest.tourGuide)}
                            </span>
                            {needsTruncation(dest.tourGuide) && (
                              <button
                                onClick={() => handleViewDetails(dest)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              dest.destinationStatus === "active"
                                ? "bg-green-100 text-green-800"
                                : dest.destinationStatus === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {dest.destinationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              dest.isPopularDestination
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {dest.isPopularDestination ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              dest.isTrandingDestination
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {dest.isTrandingDestination ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              title="View Details"
                              onClick={() => handleViewDetails(dest)}
                              className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              title="Create Package"
                              onClick={() => handleCreatePackage(dest)}
                              className="p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition">
                              <FaSuitcase className="text-sm" />
                            </button>
                            <button
                              title="Edit"
                              onClick={() => {
                                setSelectedDestination(dest);
                                setShowUpdateModal(true);
                              }}
                              className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                              <FaEdit className="text-sm" />
                            </button>
                            <button
                              title="Delete"
                              onClick={() => handleDeleteDestination(dest._id)}
                              className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden">
            {destinations.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No destinations found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {destinations.map((dest) => (
                  <div key={dest._id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={getImageUrl(dest.destinationImage)}
                          alt={dest.destinationName}
                          // onError={(e) => {
                          //   e.target.src = "/public/Images/banner.jpg";
                          // }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-sm font-medium text-gray-900"
                            title={dest.destinationName}>
                            {dest.destinationName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className="text-sm text-gray-500"
                            title={dest.topAttraction}>
                            {truncateText(dest.topAttraction)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            dest.destinationStatus === "active"
                              ? "bg-green-100 text-green-800"
                              : dest.destinationStatus === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {dest.destinationStatus}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">Famous For:</span>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900" title={dest.famousFor}>
                            {truncateText(dest.famousFor)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Tour Guide:</span>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900" title={dest.tourGuide}>
                            {truncateText(dest.tourGuide)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Popular:</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              dest.isPopularDestination
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {dest.isPopularDestination ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Trending:</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              dest.isTrandingDestination
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {dest.isTrandingDestination ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        title="View Details"
                        onClick={() => handleViewDetails(dest)}
                        className="flex-1 p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs">
                        <FaEye className="inline mr-1" />
                        View Details
                      </button>
                      <button
                        title="Create Package"
                        onClick={() => handleCreatePackage(dest)}
                        className="flex-1 p-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition text-xs">
                        <FaSuitcase className="inline mr-1" />
                        Package
                      </button>
                      <button
                        title="Edit"
                        onClick={() => {
                          setSelectedDestination(dest);
                          setShowUpdateModal(true);
                        }}
                        className="flex-1 p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition text-xs">
                        <FaEdit className="inline mr-1" />
                        Edit
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDeleteDestination(dest._id)}
                        className="flex-1 p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs">
                        <FaTrash className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 0 && (
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-sm text-gray-600">
              Showing page {page} of {totalPages} ({totalDestinations} total
              destinations)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-3 py-2 bg-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition text-sm">
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
                    }`}>
                    {pageNum}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-3 py-2 bg-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition text-sm">
                Next →
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50">
              First
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50">
              Last
            </button>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedDestination && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Destination Details
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Section */}
              {selectedDestination.destinationImage &&
                selectedDestination.destinationImage.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                      Destination Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {selectedDestination.destinationImage.map(
                        (image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`${selectedDestination.destinationName} ${
                                index + 1
                              }`}
                              className="w-full h-24 object-cover rounded-lg"
                              // onError={(e) => {
                              //   e.target.src = "/public/Images/banner.jpg";
                              // }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Destination Name
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {selectedDestination.destinationName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Status
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedDestination.destinationStatus === "active"
                        ? "bg-green-100 text-green-800"
                        : selectedDestination.destinationStatus === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {selectedDestination.destinationStatus}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Popular Destination
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedDestination.isPopularDestination
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {selectedDestination.isPopularDestination ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Trending Destination
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedDestination.isTrandingDestination
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {selectedDestination.isTrandingDestination ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Top Attraction
                </h3>
                <p className="text-gray-900">
                  {selectedDestination.topAttraction}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Famous For
                </h3>
                <p className="text-gray-900">{selectedDestination.famousFor}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  What's Great
                </h3>
                <p className="text-gray-900">
                  {selectedDestination.whatsGreat}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Tour Guide
                </h3>
                <p className="text-gray-900">{selectedDestination.tourGuide}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Cultural Experiences
                </h3>
                <p className="text-gray-900">
                  {selectedDestination.culturalExperiences}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Tips
                </h3>
                <p className="text-gray-900">{selectedDestination.Tips}</p>
              </div>

              {selectedDestination.importantInformation &&
                selectedDestination.importantInformation.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Important Information
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedDestination.importantInformation.map(
                        (info, index) => (
                          <li key={index} className="text-gray-900">
                            {info}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {selectedDestination.topPlaces &&
                selectedDestination.topPlaces.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Top Places
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedDestination.topPlaces.map((place, index) => (
                        <li key={index} className="text-gray-900">
                          {place}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition">
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedDestination(selectedDestination);
                  setShowUpdateModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Edit Destination
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateDestinationModal
        show={showDestinationModal}
        onClose={() => setShowDestinationModal(false)}
        places={places}
        packages={packages}
        onOpenAddPlace={() => setShowAddPlaceModal(true)}
        onDestinationCreated={() => getAllDestinations(page)}
      />
      <UpdateDestinationModal
        show={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedDestination(null);
        }}
        editDestination={selectedDestination}
        places={places}
        packages={packages}
        onDestinationUpdated={() => getAllDestinations(page)}
        onOpenAddPlace={() => setShowAddPlaceModal(true)}
      />
      <AddPlaceModal
        show={showAddPlaceModal}
        onClose={() => setShowAddPlaceModal(false)}
        onPlaceCreated={getAllPlaces}
      />
      <CreatePackageModal
        show={showCreatePackageModal}
        onClose={() => setShowCreatePackageModal(false)}
        onPackageCreated={() => {
          getAllPackages();
          setShowCreatePackageModal(false);
        }}
        destinations={destinations}
        selectedDestination={selectedDestination}
      />
    </div>
  );
};

export default Destinations;

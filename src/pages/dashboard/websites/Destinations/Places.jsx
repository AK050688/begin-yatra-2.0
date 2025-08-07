import React, { useEffect, useState } from "react";
import api from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../../store/userSlice";
import {
  FaEdit,
  FaEye,
  FaPlus,
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaTrash,
} from "react-icons/fa";
import UpdatePlaceModal from "./UpdatePlaceModal";
import { toast } from "react-toastify";

const Places = () => {
  const token = useSelector(selectAccessToken);
  const [places, setPlaces] = useState([]);
  console.log("Places??????????", places);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editPlace, setEditPlace] = useState(null);

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
  const handleViewDetails = (place) => {
    setSelectedPlace(place);
    setShowDetailsModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get image URL helper
  const getImageUrl = (image) => {
    console.log("Image", image);
    
    if (!image ) {
      return ; // Default image
    }
    return `https://begin-yatra-nq40.onrender.com/public/temp/${image}`;
  };
  const getAllPlaces = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append("page", pageNum);

      const res = await api.get(`/api/place/getAllPlace?${params.toString()}`, {
        headers: { Authorization: token },
      });

      if (res.data && res.data.statusCode === 200) {
        setPlaces(res.data.data.places || []);
        setTotalPlaces(res.data.data.total || 0);
        setTotalPages(res.data.data.totalPages || 1);
      } else {
        setError("Failed to fetch places");
      }
    } catch (err) {
      setError("Failed to fetch places");
      console.error("Error fetching places:", err);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlaces(page);
  }, [page]);

  // Filter handlers
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when filtering
    getAllPlaces(1);
  };

  const handleReset = () => {
    setFilters({ search: "", status: "" });
    setPage(1);
    getAllPlaces(1);
  };

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

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/place/deletePlace/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log("res delete place", res);
      
      if (res.status === 200) {
        toast.success("Place deleted successfully");
        await getAllPlaces();
      }
    } catch (error) {
      toast.error("Failed to delete place");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-2 sm:p-4 md:p-6 w-full">
      {/* Header with stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Places Management
        </h1>
        <div className="text-sm text-gray-600">
          Showing {places.length} of {totalPlaces} places (Page {page} of{" "}
          {totalPages})
        </div>
      </div>

      {/* Filter Form */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <form onSubmit={handleFilterSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                name="search"
                placeholder="Search places..."
                value={filters.search}
                onChange={handleFilterChange}
                className="border text-black border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full"
              />
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
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              Apply Filters
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800 text-sm">
              Clear Filters
            </button>
            {/* <button
              type="button"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
            >
              <FaPlus className="text-sm" />
              Create New Place
            </button> */}
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading places...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => getAllPlaces(page)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      )}

      {/* Places Content */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Place Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {places.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500">
                        No places found.
                      </td>
                    </tr>
                  ) : (
                    places.map((place) => (
                      <tr key={place._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={getImageUrl(place.placeImage)}
                              alt={place.placeName}
                              // onError={(e) => {
                              //   e.target.src = "/public/Images/banner.jpg";
                              // }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span title={place.placeName}>
                              {truncateText(place.placeName)}
                            </span>
                            {needsTruncation(place.placeName) && (
                              <button
                                onClick={() => handleViewDetails(place)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                                View Details
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span title={place.placeDescription}>
                              {truncateText(place.placeDescription)}
                            </span>
                            {needsTruncation(place.placeDescription) && (
                              <button
                                onClick={() => handleViewDetails(place)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                                View Details
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              place.status === "active"
                                ? "bg-green-100 text-green-800"
                                : place.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {place.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(place.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              title="View Details"
                              onClick={() => handleViewDetails(place)}
                              className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              title="Edit Place"
                              onClick={() => {
                                setEditPlace(place);
                                setShowUpdateModal(true);
                              }}
                              className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">
                              <FaEdit className="text-sm" />
                            </button>

                            <button className="" onClick={() => handleDelete(place._id)}>
                              <FaTrash className="text-sm text-red-600" />
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
            {places.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No places found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {places.map((place) => (
                  <div key={place._id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={getImageUrl(place.placeImage)}
                          alt={place.placeName}
                          // onError={(e) => {
                          //   e.target.src = "/public/Images/banner.jpg";
                          // }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-sm font-medium text-gray-900"
                            title={place.placeName}>
                            {truncateText(place.placeName)}
                          </h3>
                          {needsTruncation(place.placeName) && (
                            <button
                              onClick={() => handleViewDetails(place)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                              View Details
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              place.status === "active"
                                ? "bg-green-100 text-green-800"
                                : place.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {place.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(place.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">Description:</span>
                        <div className="flex items-center gap-2">
                          <p
                            className="text-gray-900"
                            title={place.placeDescription}>
                            {truncateText(place.placeDescription)}
                          </p>
                          {needsTruncation(place.placeDescription) && (
                            <button
                              onClick={() => handleViewDetails(place)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        title="View Details"
                        onClick={() => handleViewDetails(place)}
                        className="flex-1 p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs">
                        <FaEye className="inline mr-1" />
                        View Details
                      </button>
                      <button
                        title="Edit Place"
                        onClick={() => {
                          setEditPlace(place);
                          setShowUpdateModal(true);
                        }}
                        className="flex-1 p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition text-xs">
                        <FaEdit className="inline mr-1" />
                        Edit
                      </button>
                      <button className="" onClick={() => handleDelete(place._id)}>
                              <FaTrash className="text-sm text-red-600" />
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
              Showing page {page} of {totalPages} ({totalPlaces} total places)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-3 py-2 bg-gray-500 rounded disabled:opacity-50 hover:bg-gray-300 transition text-sm">
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

          {/* Quick Navigation */}
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
      {showDetailsModal && selectedPlace && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Place Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Place Image */}
              {selectedPlace.placeImage && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Place Image
                  </h3>
                  <img
                    src={getImageUrl(selectedPlace.placeImage)}
                    alt={selectedPlace.placeName}
                    className="w-full h-48 object-cover rounded-lg"
                    // onError={(e) => {
                    //   e.target.src = "/public/Images/banner.jpg";
                    // }}
                  />
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Place Name
                </h3>
                <p className="text-gray-900">{selectedPlace.placeName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-900">
                  {selectedPlace.placeDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Status
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedPlace.status === "active"
                        ? "bg-green-100 text-green-800"
                        : selectedPlace.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {selectedPlace.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Created At
                  </h3>
                  <p className="text-gray-900">
                    {formatDate(selectedPlace.createdAt)}
                  </p>
                </div>
              </div>
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
                  setEditPlace(selectedPlace);
                  setShowUpdateModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Edit Place
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Place Modal */}
      <UpdatePlaceModal
        show={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setEditPlace(null);
        }}
        editPlace={editPlace}
        onPlaceUpdated={() => {
          getAllPlaces(page);
          setShowUpdateModal(false);
          setEditPlace(null);
        }}
      />
    </div>
  );
};

export default Places;

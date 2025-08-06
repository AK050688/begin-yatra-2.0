import React, { useEffect, useState } from "react";
import api from "../../../../Api/ApiService";
import { FaEdit, FaEye, FaPlus, FaTimes, FaSearch, FaTrash } from 'react-icons/fa';
import CreatePackageModal from './CreatePackageModal';
import UpdatePackageModal from './UpdatePackageModal';
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import { toast } from "react-toastify";

const AdminPackages = () => {
  const token = useSelector(selectAccessToken);
  console.log(">>>>>>>>>>>>>",token);
  
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    theme: '',
    priceRange: ''
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCreatePackageModal, setShowCreatePackageModal] = useState(false);
  const [showUpdatePackageModal, setShowUpdatePackageModal] = useState(false);
  const [destinations, setDestinations] = useState([]);

  // Helper function to truncate text
  const truncateText = (text, maxWords = 5) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Helper function to check if text needs truncation
  const needsTruncation = (text, maxWords = 5) => {
    if (!text) return false;
    const words = text.split(' ');
    return words.length > maxWords;
  };

  // Handle view details
  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowDetailsModal(true);
  };

  // Handle edit package
  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowUpdatePackageModal(true);
  };

  // Handle delete package
  const handleDeletePackage = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;

    setLoading(true);
    setError("");
    try {
      const res = await api.delete(`/api/package/deletePackage/${packageId}`,
        {
          headers: {
            'Authorization': token,
          }
        }
      );
      if (res.data.statusCode === 200) {
        toast.success("Package deleted successfully");
        // Refresh package list
        await getAllPackages(page);
        // Adjust page if necessary
        if (packages.length === 1 && page > 1) {
          setPage(page - 1);
        }
      } else {
        setError("Failed to delete package: " + (res.data.message || "Unknown error"));
      }
    } catch (err) {
      setError("Failed to delete package: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Format price to Indian currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to get destination name from nested structure
  const getDestinationName = (packageData) => {
    if (packageData.destinationId && typeof packageData.destinationId === 'object') {
      return packageData.destinationId.destinationName || 'Unknown Destination';
    }
    if (packageData.destinationId && typeof packageData.destinationId === 'string') {
      return 'Destination ID: ' + packageData.destinationId;
    }
    return 'No Destination';
  };

  // Helper function to check if destination is popular
  // const isDestinationPopular = (packageData) => {
  //   if (packageData.destinationId && typeof packageData.destinationId === 'object') {
  //     return packageData.destinationId.isPopularDestination || false;
  //   }
  //   return false;
  // };

  // Helper function to check if destination is trending
  // const isDestinationTrending = (packageData) => {
  //   if (packageData.destinationId && typeof packageData.destinationId === 'object') {
  //     return packageData.destinationId.isTrandingDestination || false;
  //   }
  //   return false;
  // };

  // Fetch destinations for the modal
  const getDestinations = async () => {
    try {
      const res = await api.get('/api/destination/getAllDestination');
      console.log("Response from getAllDestinations:", res);
      
      if (res.data.statusCode === 200) {
        setDestinations(res.data.data.destinations || []);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  const getAllPackages = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append('page', pageNum);
      
      const res = await api.get(`/api/package/getAllPackages?${params.toString()}`);
      console.log("Response from getAllPackages:", res);
      
      if (res.data.statusCode === 200) {
        setPackages(res.data.data.Package || []);
        setTotalPages(res.data.data.totalPages || 1);
        setTotalPackages(res.data.data.total || 0);
      }
    } catch (err) {
      setError("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPackages(page);
    getDestinations();
  }, [page]);

  // Filter handlers
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when filtering
    getAllPackages(1);
  };

  const handleReset = () => {
    setFilters({ search: '', theme: '', priceRange: '' });
    setPage(1);
    getAllPackages(1);
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Packages Management</h1>
        <div className="text-sm text-gray-600">
          Showing {packages.length} of {totalPackages} packages (Page {page} of {totalPages})
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
                placeholder="Search packages..."
                value={filters.search}
                onChange={handleFilterChange}
                className="border text-black border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-full"
              />
            </div>
            <select
              name="theme"
              value={filters.theme}
              onChange={handleFilterChange}
              className="border text-black border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
              <option value="">All Themes</option>
              <option value="Adventure">Adventure</option>
              <option value="Romantic">Romantic</option>
              <option value="Family">Family</option>
              <option value="Cultural">Cultural</option>
              <option value="Relaxation">Relaxation</option>
            </select>
           
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Apply Filters
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={() => setShowCreatePackageModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
            >
              <FaPlus className="text-sm" />
              Create New Package
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading packages...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => getAllPackages(page)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Packages Content */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full whitespace-nowrap">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                      Package Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Theme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
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
                  {packages.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                        No packages found.
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg) => (
                      <tr key={pkg._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 sticky left-0 bg-white z-10">
                          <div className="flex items-center gap-2">
                            <span title={pkg.packageName}>
                              {truncateText(pkg.packageName)}
                            </span>
                            {needsTruncation(pkg.packageName) && (
                              <button
                                onClick={() => handleViewDetails(pkg)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getDestinationName(pkg)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {pkg.theme}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pkg.totalDaysNight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-green-600">
                              {formatPrice(pkg.packagePrice)}
                            </span>
                            <span className="text-xs text-gray-500">per person</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <span title={pkg.AboutPackage || pkg.description}>
                              {truncateText(pkg.AboutPackage || pkg.description)}
                            </span>
                            {needsTruncation(pkg.AboutPackage || pkg.description) && (
                              <button
                                onClick={() => handleViewDetails(pkg)}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            pkg.isFeaturedForTop
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {pkg.isFeaturedForTop ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            pkg.isTrandingPackage
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {pkg.isTrandingPackage ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              title="View Details"
                              onClick={() => handleViewDetails(pkg)}
                              className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                            >
                              <FaEye className="text-sm" />
                            </button>
                            <button
                              title="Edit Package"
                              onClick={() => handleEditPackage(pkg)}
                              className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                            <button
                              title="Delete Package"
                              onClick={() => handleDeletePackage(pkg._id)}
                              className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                            >
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
            {packages.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No packages found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <div key={pkg._id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900" title={pkg.packageName}>
                            {truncateText(pkg.packageName)}
                          </h3>
                          {needsTruncation(pkg.packageName) && (
                            <button
                              onClick={() => handleViewDetails(pkg)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                            >
                              View Details
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {pkg.theme}
                          </span>
                          <span className="text-sm text-gray-500">{pkg.totalDaysNight}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Destination: {getDestinationName(pkg)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            pkg.isFeaturedForTop
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            Popular: {pkg.isFeaturedForTop ? 'Yes' : 'No'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            pkg.isTrandingPackage
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            Trending: {pkg.isTrandingPackage ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {formatPrice(pkg.packagePrice)}
                        </div>
                        <div className="text-xs text-gray-500">per person</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">Description:</span>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900" title={pkg.AboutPackage || pkg.description}>
                            {truncateText(pkg.AboutPackage || pkg.description)}
                          </p>
                          {needsTruncation(pkg.AboutPackage || pkg.description) && (
                            <button
                              onClick={() => handleViewDetails(pkg)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                            >
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        title="View Details"
                        onClick={() => handleViewDetails(pkg)}
                        className="flex-1 p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs"
                      >
                        <FaEye className="inline mr-1" />
                        View Details
                      </button>
                      <button
                        title="Edit Package"
                        onClick={() => handleEditPackage(pkg)}
                        className="flex-1 p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition text-xs"
                      >
                        <FaEdit className="inline mr-1" />
                        Edit
                      </button>
                      <button
                        title="Delete Package"
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="flex-1 p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs"
                      >
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

      {/* View Details Modal */}
      {showDetailsModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Package Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Package Name
                </h3>
                <p className="text-gray-900">{selectedPackage.packageName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Destination
                </h3>
                <p className="text-gray-900">{getDestinationName(selectedPackage)}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Theme
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {selectedPackage.theme}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Duration
                  </h3>
                  <p className="text-gray-900">{selectedPackage.totalDaysNight}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Popular Destination
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedPackage.isFeaturedForTop
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedPackage.isFeaturedForTop ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Trending Destination
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedPackage.isTrandingPackage
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedPackage.isTrandingPackage ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Price
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(selectedPackage.packagePrice)}
                  </span>
                  <span className="text-sm text-gray-500">per person</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-900">{selectedPackage.AboutPackage || selectedPackage.description}</p>
              </div>
              
              {selectedPackage.packageSummery && selectedPackage.packageSummery.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Package Summary
                  </h3>
                  <div className="space-y-2">
                    {selectedPackage.packageSummery.map((summary, index) => (
                      <div key={summary._id || index} className="bg-gray-50 p-3 rounded">
                        <h4 className="font-medium text-gray-900">{summary.day}</h4>
                        <p className="text-gray-600 text-sm">{summary.about}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleEditPackage(selectedPackage);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit Package
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleDeletePackage(selectedPackage._id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Package Modal */}
      <CreatePackageModal
        show={showCreatePackageModal}
        onClose={() => setShowCreatePackageModal(false)}
        onPackageCreated={() => {
          getAllPackages(page);
          setShowCreatePackageModal(false);
        }}
        destinations={destinations}
      />

      {/* Update Package Modal */}
      <UpdatePackageModal
        show={showUpdatePackageModal}
        onClose={() => {
          setShowUpdatePackageModal(false);
          setSelectedPackage(null);
        }}
        onPackageUpdated={() => {
          getAllPackages(page);
          setShowUpdatePackageModal(false);
          setSelectedPackage(null);
        }}
        editPackage={selectedPackage}
        destinations={destinations}
      />
    </div>
  );
};

export default AdminPackages;
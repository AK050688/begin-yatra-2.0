import React, { useState, useEffect } from 'react';
import CreateDestinationModal from './CreateDestinationModal';
import AddPlaceModal from './AddPlaceModal';
import UpdateDestinationModal from './UpdateDestinationModal';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import api from '../../../../Api/ApiService';
import { FaEdit, FaEye, FaPlus, FaMapMarkerAlt, FaSuitcase } from 'react-icons/fa';

const Destinations = () => {
  const token = useSelector(selectAccessToken)
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({ search: '' });
    const [message, setMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;
  // all places
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


  // Get All packages
  const getAllPackages = async () => {
    setLoading(true);
  try {
      const res = await api.get(`/api/package`, {
      headers: { 'Authorization': token }
    });
    if (res.ok) {
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : data.packages || []);
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
  }finally {
      setLoading(false);
    }
  };

  // Fetch destinations
  const getAllDestinations = async (pageNum = 1) => {
    setLoading(true);
    try {
      // If your API supports pagination, use ?page=pageNum&limit=PAGE_SIZE
      const res = await api.get(`/api/destination/getAllDestination?page=${pageNum}&limit=${PAGE_SIZE}`, {
        headers: { 'Authorization': token }
      });
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        setDestinations(res.data.data.destinations || []);
        setTotalPages(res.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlaces();
    getAllPackages();
    getAllDestinations(page);
  }, [page]);

  // Filtered destinations
  const filteredDestinations = destinations.filter(dest =>
    dest.topAttraction?.toLowerCase().includes(filters.search.toLowerCase()) ||
    dest.famousFor?.toLowerCase().includes(filters.search.toLowerCase())
  );

  // If filtering, paginate client-side
  const paginatedDestinations = filteredDestinations.slice(0, PAGE_SIZE);

  return (
    <div className="p-2 sm:p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-6 w-full">
        <div className="flex-1 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500 text-lg hidden sm:block" />
          <input
            type="text"
            placeholder="Search by attraction or famous for..."
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            className="border border-blue-200 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-lg w-full sm:w-80 shadow-sm text-sm sm:text-base"
          />
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto justify-center mt-2 sm:mt-0"
          onClick={() => setShowDestinationModal(true)}
        >
          <FaPlus /> <span className="hidden sm:inline">Create Destination</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      {/* Destinations Table */}
      <div className="w-full">
        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-100 rounded-2xl shadow-lg text-sm md:text-base">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border-b font-semibold text-blue-700 text-left rounded-tl-2xl">Top Attraction</th>
                <th className="px-4 py-3 border-b font-semibold text-blue-700 text-left">Famous For</th>
                <th className="px-4 py-3 border-b font-semibold text-blue-700 text-left">Tour Guide</th>
                <th className="px-4 py-3 border-b font-semibold text-blue-700 text-left">Type</th>
                <th className="px-4 py-3 border-b font-semibold text-blue-700 text-center rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3 border-b bg-blue-50/50" colSpan={5}>
                      <div className="h-4 bg-blue-100 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-blue-100 rounded w-1/2"></div>
                    </td>
                  </tr>
                ))
              ) : filteredDestinations.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-6 text-gray-400">No destinations found.</td></tr>
              ) : (
                paginatedDestinations.map((dest, idx) => (
                  <tr key={dest._id} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50/50"}>
                    <td className="border-b px-4 py-3 max-w-xs truncate" title={dest.topAttraction}>{dest.topAttraction}</td>
                    <td className="border-b px-4 py-3 max-w-xs truncate" title={dest.famousFor}>{dest.famousFor}</td>
                    <td className="border-b px-4 py-3 max-w-xs truncate" title={dest.tourGuide}>{dest.tourGuide}</td>
                    <td className="border-b px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${dest.DestinationType === 'domestic' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{dest.DestinationType}</span>
                    </td>
                    <td className="border-b px-4 py-3 text-center">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button title="View" className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded shadow-sm"><FaEye /></button>
                        <button title="Add Place" className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded shadow-sm"><FaMapMarkerAlt /></button>
                        <button title="Create Package" className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded shadow-sm"><FaSuitcase /></button>
                        <button
                          title="Edit"
                          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded shadow-sm"
                          onClick={() => {
                            setSelectedDestination(dest);
                            setShowUpdateModal(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Card layout for small screens */}
        <div className="block md:hidden">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow border p-4 flex flex-col gap-2 animate-pulse">
                  <div className="h-4 bg-blue-100 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-blue-100 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-blue-100 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-6 bg-white rounded-xl shadow border text-gray-400">No destinations found.</div>
          ) : (
            <div className="space-y-4">
              {paginatedDestinations.map(dest => (
                <div key={dest._id} className="bg-white rounded-xl shadow border p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-700">{dest.topAttraction}</span>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${dest.DestinationType === 'domestic' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{dest.DestinationType}</span>
                  </div>
                  <div className="text-gray-600 text-sm"><span className="font-semibold">Famous For:</span> {dest.famousFor}</div>
                  <div className="text-gray-600 text-sm"><span className="font-semibold">Tour Guide:</span> {dest.tourGuide}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button title="View" className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded shadow-sm"><FaEye /></button>
                    <button title="Add Place" className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded shadow-sm"><FaMapMarkerAlt /></button>
                    <button title="Create Package" className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded shadow-sm"><FaSuitcase /></button>
                    <button
                      title="Edit"
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded shadow-sm"
                      onClick={() => {
                        setSelectedDestination(dest);
                        setShowUpdateModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-8">
        <button
          className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 disabled:opacity-50 font-semibold"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="font-semibold text-gray-700">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 disabled:opacity-50 font-semibold"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
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
      />
      <AddPlaceModal
        show={showAddPlaceModal}
        onClose={() => setShowAddPlaceModal(false)}
        onPlaceCreated={getAllPlaces}
      />
    </div>
  );
};

export default Destinations;
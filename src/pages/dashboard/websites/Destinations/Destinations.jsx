import React, { useState, useEffect } from 'react';
import CreateDestinationModal from './CreateDestinationModal';
import AddPlaceModal from './AddPlaceModal';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import api from '../../../../Api/ApiService';
import axios from 'axios';
const Destinations = () => {
  const token = useSelector(selectAccessToken)
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({ search: '' });

  // all places
  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/place`, {
        headers: { 'Authorization': token }
      });
      console.log("res places", res);
      
      if (res.ok) {
        const data = await res.json();
        setPlaces(Array.isArray(data) ? data : data.places || []);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch packages
  const fetchPackages = async () => {
    // TODO: Replace <your_token> with actual token
    const res = await fetch(`${api}/package`, {
      headers: { 'Authorization': token }
    });
    if (res.ok) {
      const data = await res.json();
      setPackages(Array.isArray(data) ? data : data.packages || []);
    }
  };

  // Fetch destinations
  const fetchDestinations = async () => {
    const res = await fetch(`${api}/destination`, {
      headers: { 'Authorization': token }
    });
    console.log("res destinations", res);
    
    if (res.ok) {
      const data = await res.json();
      setDestinations(Array.isArray(data) ? data : data.destinations || []);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchPackages();
    fetchDestinations();
  }, []);

  // Filtered destinations
  const filteredDestinations = destinations.filter(dest =>
    dest.topAttraction?.toLowerCase().includes(filters.search.toLowerCase()) ||
    dest.famousFor?.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-6xl mx-auto w-full overflow-x-auto">
      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 w-full">
        <input
          type="text"
          placeholder="Search by attraction or famous for..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          className="border px-3 py-2 rounded w-full sm:w-64"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => setShowDestinationModal(true)}
        >
          + Create Destination
        </button>
      </div>
      {/* Destinations Table */}
      <div className="w-full">
        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border rounded text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Top Attraction</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Famous For</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Tour Guide</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Type</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4">No destinations found.</td></tr>
              ) : (
                filteredDestinations.map(dest => (
                  <tr key={dest._id} className="hover:bg-gray-50">
                    <td className="border px-2 sm:px-4 py-2 break-words max-w-[120px] md:max-w-xs">{dest.topAttraction}</td>
                    <td className="border px-2 sm:px-4 py-2 break-words max-w-[120px] md:max-w-xs">{dest.famousFor}</td>
                    <td className="border px-2 sm:px-4 py-2 break-words max-w-[100px] md:max-w-xs">{dest.tourGuide}</td>
                    <td className="border px-2 sm:px-4 py-2 break-words max-w-[80px] md:max-w-xs">{dest.DestinationType}</td>
                    <td className="border px-2 sm:px-4 py-2 flex flex-col sm:flex-row gap-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded w-full sm:w-auto text-xs md:text-sm">View</button>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded w-full sm:w-auto text-xs md:text-sm">Add Place</button>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded w-full sm:w-auto text-xs md:text-sm">Create Package</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Card layout for small screens */}
        <div className="block md:hidden">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-4 bg-white rounded shadow border">No destinations found.</div>
          ) : (
            <div className="space-y-4">
              {filteredDestinations.map(dest => (
                <div key={dest._id} className="bg-white rounded shadow border p-4 flex flex-col gap-2">
                  <div><span className="font-semibold">Top Attraction:</span> {dest.topAttraction}</div>
                  <div><span className="font-semibold">Famous For:</span> {dest.famousFor}</div>
                  <div><span className="font-semibold">Tour Guide:</span> {dest.tourGuide}</div>
                  <div><span className="font-semibold">Type:</span> {dest.DestinationType}</div>
                  <div className="flex flex-col gap-2 mt-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">View</button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Add Place</button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Create Package</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <CreateDestinationModal
        show={showDestinationModal}
        onClose={() => setShowDestinationModal(false)}
        places={places}
        packages={packages}
        onOpenAddPlace={() => setShowAddPlaceModal(true)}
        onDestinationCreated={fetchDestinations}
      />
      <AddPlaceModal
        show={showAddPlaceModal}
        onClose={() => setShowAddPlaceModal(false)}
        onPlaceCreated={fetchPlaces}
      />
    </div>
  );
};

export default Destinations;
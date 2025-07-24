import React, { useState, useEffect } from 'react';
import CreateDestinationModal from './CreateDestinationModal';
import AddPlaceModal from './AddPlaceModal';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import { api } from './AddPlaceModal';
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
    <div className="p-6 max-w-6xl mx-auto">
    
      {/* Filters */}
      <div className="mb-4 flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by attraction or famous for..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          className="border px-3 py-2 rounded w-64"
        />
        {/* Add more filters as needed */}
        {/* Create the destination buttons */}
          <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowDestinationModal(true)}
        >
          + Create Destination
        </button>
      </div>
      {/* Destinations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Top Attraction</th>
              <th className="px-4 py-2 border">Famous For</th>
              <th className="px-4 py-2 border">Tour Guide</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDestinations.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4">No destinations found.</td></tr>
            ) : (
              filteredDestinations.map(dest => (
                <tr key={dest._id}>
                  <td className="border px-4 py-2">{dest.topAttraction}</td>
                  <td className="border px-4 py-2">{dest.famousFor}</td>
                  <td className="border px-4 py-2">{dest.tourGuide}</td>
                  <td className="border px-4 py-2">{dest.DestinationType}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">Add Place</button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">Create Package</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
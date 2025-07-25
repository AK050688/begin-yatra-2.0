import React, { useEffect, useState } from 'react';
import api from '../../../../Api/ApiService';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';

const PAGE_SIZE = 5;

const Places = () => {
  const token = useSelector(selectAccessToken);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const getAllPlaces = async (pageNum = 1, searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      // If your API supports search and pagination, add params here
      const res = await api.get(`/api/place/getAllPlace?page=${pageNum}&search=${encodeURIComponent(searchTerm)}`, {
        headers: { Authorization: token },
      });
      if (res.data && res.data.statusCode === 200) {
        setPlaces(res.data.data.places || []);
        setTotal(res.data.data.total || 0);
        setTotalPages(res.data.data.totalPages || 1);
      } else {
        setError('Failed to fetch places');
      }
    } catch (err) {
     setError('Failed to fetch places');
      console.error('Error fetching places:', err);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlaces(page, search);
    // eslint-disable-next-line
  }, [page]);

  // Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    getAllPlaces(1, e.target.value);
  };

  // Pagination controls
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto w-full overflow-x-auto">
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 w-full">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={handleSearch}
          className="border px-3 py-2 rounded w-full sm:w-64"
        />
      </div>
      <div className="w-full">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border rounded text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Name</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Description</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Status</th>
                <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={4} className="text-center text-red-500 py-4">{error}</td></tr>
              ) : places.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4">No places found.</td></tr>
              ) : (
                places.map(place => (
                  <tr key={place._id} className="hover:bg-gray-50">
                    <td className="border px-2 sm:px-4 py-2 break-words max-w-[120px] md:max-w-xs">{place.placeName}</td>
                    <td className="border px-2 sm:px-4 py-2 break-words max-w-[220px] md:max-w-md">{place.placeDescription}</td>
                    <td className="border px-2 sm:px-4 py-2">{place.status}</td>
                    <td className="border px-2 sm:px-4 py-2">{new Date(place.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Card layout for small screens */}
        <div className="block md:hidden">
          {loading ? (
            <div className="text-center py-4 bg-white rounded shadow border">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 bg-white rounded shadow border text-red-500">{error}</div>
          ) : places.length === 0 ? (
            <div className="text-center py-4 bg-white rounded shadow border">No places found.</div>
          ) : (
            <div className="space-y-4">
              {places.map(place => (
                <div key={place._id} className="bg-white rounded shadow border p-4 flex flex-col gap-2">
                  <div><span className="font-semibold">Name:</span> {place.placeName}</div>
                  <div><span className="font-semibold">Description:</span> {place.placeDescription}</div>
                  <div><span className="font-semibold">Status:</span> {place.status}</div>
                  <div><span className="font-semibold">Created At:</span> {new Date(place.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="font-semibold">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Places;
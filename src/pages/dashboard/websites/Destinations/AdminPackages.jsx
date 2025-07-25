import React, { useEffect, useState } from "react";
import api from "../../../../Api/ApiService";

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPackages = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/package/getAllPackages?page=${pageNum}`);
      if (res.statusCode === 200) {
        setPackages(res.data.Package);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      setError("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(page);
  }, [page]);

  return (
    <div className="p-6">
      <button onClick={() => {}} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded" disabled>
        Create New Package
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Package Name</th>
                  <th className="px-4 py-2 border">Theme</th>
                  <th className="px-4 py-2 border">Total Day/Night</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Summary </th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4">No packages found.</td></tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg._id}>
                      <td className="px-4 py-2 border">{pkg.packageName}</td>
                      <td className="px-4 py-2 border">{pkg.theme }</td>
                      <td className="px-4 py-2 border">{pkg.packagePrice}</td>
                      <td className="px-4 py-2 border">{pkg.AboutPackage || pkg.description}</td>
                      <td className="px-4 py-2 border"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPackages; 
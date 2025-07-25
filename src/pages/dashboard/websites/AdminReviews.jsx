import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../store/userSlice";
import { toast } from "react-toastify";
import api from "../../../Api/ApiService";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    location: "",
    rating: "",
  });

  const accessToken = useSelector(selectAccessToken);

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const res = await api.get(`/api/review/getAllReviews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });
      console.log("RES REVIEW", res);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        setReviews(res?.data?.data?.reviews || []);
      }
    } catch (err) {
      toast.error("Failed to fetch reviews");
      setError("Failed to fetch reviews");
      console.log("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchReviews();
  };

  const handleStatusUpdate = async (reviewId) => {
    setLoading(true);
    try {
      const res = await api.put(
        `/api/review/changeReviewStatus/${reviewId}`,
        {
          reviewStatus: "approved",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );
      console.log("RES STATUS UPDATE", res);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Review status updated successfully");
      } else {
        toast.error("Failed to update review status");
      }
      // Refresh the reviews after updating status
      fetchReviews();
    } catch (err) {
      toast.error("Failed to update review status");
      setError("Failed to update review status");
      console.log("Error updating review status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 w-full overflow-x-auto">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        onSubmit={handleFilterSubmit}
      >
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded w-full mb-2 md:mb-0"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded w-full mb-2 md:mb-0"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded w-full mb-2 md:mb-0"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            min="1"
            max="5"
            value={filters.rating}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded w-full md:w-24"
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Filter
          </button>
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="w-full">
          {/* Table for md+ screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Name</th>
                  <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Email</th>
                  <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Location</th>
                  <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Rating</th>
                  <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Status</th>
                  <th className="px-2 sm:px-4 py-2 border sticky top-0 z-10">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-2 border break-words max-w-[120px] md:max-w-xs">{review.name}</td>
                      <td className="px-2 sm:px-4 py-2 border break-words max-w-[140px] md:max-w-xs">{review.email}</td>
                      <td className="px-2 sm:px-4 py-2 border break-words max-w-[100px] md:max-w-xs">{review.location}</td>
                      <td className="px-2 sm:px-4 py-2 border">{review.rating}</td>
                      <td className="px-2 sm:px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            review.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {review.reviewStatus}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 border">
                        <button
                          onClick={() => handleStatusUpdate(review._id)}
                          className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 w-full md:w-auto text-xs md:text-sm"
                        >
                          {review.status === "approved" ? "Unapprove" : "Approve"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Card layout for small screens */}
          <div className="block md:hidden">
            {reviews.length === 0 ? (
              <div className="text-center py-4 bg-white rounded shadow border">No reviews found.</div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-white rounded shadow border p-4 flex flex-col gap-2">
                    <div><span className="font-semibold">Name:</span> {review.name}</div>
                    <div><span className="font-semibold">Email:</span> {review.email}</div>
                    <div><span className="font-semibold">Location:</span> {review.location}</div>
                    <div><span className="font-semibold">Rating:</span> {review.rating}</div>
                    <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-xs ${review.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{review.reviewStatus}</span></div>
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        onClick={() => handleStatusUpdate(review._id)}
                        className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 text-xs"
                      >
                        {review.status === "approved" ? "Unapprove" : "Approve"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;

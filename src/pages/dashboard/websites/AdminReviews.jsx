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
      const res = await api.get(`/review/getAllReviews`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken,
        },
      });
      console.log("RES REVIEW",res);
      if (res.data.statusCode === 200 ||res.data.statusCode=== 201 ) {
        setReviews(res?.data?.data?.reviews || []);
      }
      
    } catch (err) {
      toast.error("Failed to fetch reviews")
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
      const res = await axios.put(`${API_BASE}/review/changeReviewStatus/${reviewId}`, {
        reviewStatus: "approved",
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": accessToken,
        }
      });
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Website Reviews</h2>
      <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleFilterSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          min="1"
          max="5"
          value={filters.rating}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded w-24"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">No reviews found.</td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="px-4 py-2 border">{review.name}</td>
                    <td className="px-4 py-2 border">{review.email}</td>
                    <td className="px-4 py-2 border">{review.location}</td>
                    <td className="px-4 py-2 border">{review.rating}</td>
                    <td className="px-4 py-2 border">
                      <span className={`px-2 py-1 rounded text-xs ${review.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {review.reviewStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleStatusUpdate(review._id)}
                        className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
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
      )}
    </div>
  );
};

export default AdminReviews; 
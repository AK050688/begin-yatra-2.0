import React, { useState, useEffect } from "react";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BackgroundImg from "../components/BackgroundImg";
import api from "../Api/ApiService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    email: "",
    review: "",
  });
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Calculate paginated reviews
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const getAllReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/review/getAllReviews");
      console.log("Reviews response:", res);
      
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        setReviews(res.data.data.reviews || []);
      } else {
        setError("Failed to fetch reviews");
        console.error("Failed to fetch reviews:", res.data);
      }
    } catch (error) {
      setError("Failed to fetch reviews");
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !formData.name ||
      !formData.location ||
      !formData.email ||
      !formData.review
    )
      return;

    try {
      const res = await api.post("/api/review/addReview", formData);
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        console.log("Review submitted successfully:", res.data);
        // Reset form
        setFormData({
          name: "",
          location: "",
          rating: 5,
          email: "",
          review: "",
        });
        // Refresh reviews
        getAllReviews();
      } else {
        console.error("Failed to submit review:", res.data);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <>
      <BackgroundImg
        contact={{
          title: "Reviews",
          dis: "Resume your travel journey — we're crafting your next adventure and delightful vacation with family & friends. Have a question or need inspiration? We're here to help.",
        }}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 mb-6">
            What Our Customers Say
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
            Hear directly from our happy travelers who've experienced memorable
            vacations with us!
          </p>

          {/* Add Review Form */}
          <div className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
              Share Your Experience
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Your Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer focus:border-blue-500 transition">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 && "s"}
                    </option>
                  ))}
                </select>

                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              <textarea
                name="review"
                rows="5"
                placeholder="Share your experience..."
                value={formData.review}
                onChange={handleChange}
                className="p-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                required></textarea>
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1">
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading reviews...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={getAllReviews}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Review Cards Carousel */}
          {!loading && !error && (
            <div className="mt-12 relative">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No reviews available yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paginatedReviews.map((review, index) => (
                      <div key={review._id || index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={review.image || "/Images/gojo.jpg"}
                            alt={review.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                            onError={(e) => {
                              e.target.src = "/Images/gojo.jpg";
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-xl text-gray-800">
                              {review.name}
                            </h3>
                            <p className="text-sm text-gray-500">{review.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-yellow-400 mb-3">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <FaStar key={i} className="w-5 h-5" />
                          ))}
                          {[...Array(5 - (review.rating || 5))].map((_, i) => (
                            <FaStar key={i} className="w-5 h-5 text-gray-300" />
                          ))}
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.review}</p>
                      </div>
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
                    >
                      <FaArrowLeft className="inline mr-2" /> Previous
                    </button>
                    <span className="text-gray-700 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
                    >
                      Next <FaArrowRight className="inline ml-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Carousel CSS removed */}
    </>
  );
};

export default Review;

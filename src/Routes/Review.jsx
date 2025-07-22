import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import BackgroundImg from "../components/BackgroundImg";
import api from "../Api/ApiService";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Amit Sharma",
      location: "Delhi, India",
      image: "/Images/gojo.jpg",
      rating: 5,
      review:
        "Amazing experience! The trip was well planned and the support was excellent. Will definitely book again.",
    },
    {
      name: "Priya Mehta",
      location: "Mumbai, India",
      image: "/Images/gojo.jpg",
      rating: 4,
      review:
        "Very satisfied with the service. Hotels were great and itinerary was smooth.",
    },
    {
      name: "Ravi Kumar",
      location: "Bangalore, India",
      image: "/Images/gojo.jpg",
      rating: 5,
      review:
        "Affordable, well-organized and very friendly team. Totally worth it!",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    Email: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.location ||
      !formData.Email ||
      !formData.review
    )
      return;

    try {
      const res = await api.post("/api/review/addReview", formData);
      if (res.status !== 200) {
        console.error("Failed to submit review:", res.data);
        return;
      }
      console.log("Review submitted successfully:", res.data);
    } catch (error) {
      console.error("Error submitting review:", error);
      return;
      
    }

    setReviews((prev) => [
      {
        ...formData,
        image: "/Images/gojo.jpg",
        rating: parseInt(formData.rating),
      },
      ...prev,
    ]);

    setFormData({
      name: "",
      location: "",
      rating: 5,
      Email: "",
      review: "",
    });
  };

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
            Hear directly from our happy travelers who’ve experienced memorable
            vacations with us!
          </p>

          {/* Review Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                  />
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>

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
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Your Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer focus:border-blue-500 transition"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 && "s"}
                    </option>
                  ))}
                </select>

                <input
                  type="Email"
                  name="Email"
                  placeholder="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>

              <textarea
                name="review"
                rows="5"
                placeholder="Share your experience..."
                value={formData.review}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                required
              ></textarea>
              <button
                type="submit"

                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;

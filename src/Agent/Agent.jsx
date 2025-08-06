import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import LatestLeads from "./LatestLeads";
// import GenerateTravelleads from "./GenerateTravelleads";
import Teravelleads from "./Teravelleads";
import WhatOurUsersSay from "./WhatOurUsersSay";
import Partners from "./Partners";
import Footer from "../HaderFooter/Footer";
import TopDestinations from "./TopDistination";
import api from "../Api/ApiService";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";

const Agent = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
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

  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <>
      <Banner />
      <LatestLeads />
      <Teravelleads title={"Categories of Travel leads"} />
      <div className="">
        <Teravelleads title={" Types of Travel Leads"} />
      </div>
      <div className="">
        <Teravelleads title={"How to generate travel leads?"} />
      </div>
      {/* <GenerateTravelleads /> */}
      {/* Review Cards Carousel */}
      {!loading && !error && (
        <div className="mt-12 w-full  relative">
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No reviews available yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <>
              <div className="w-full mx-20 ">
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
                  {paginatedReviews.map((review, index) => (
                    <div
                      key={review._id || index}
                      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
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
                          <p className="text-sm text-gray-500">
                            {review.location}
                          </p>
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
                      <p className="text-gray-600 leading-relaxed">
                        {review.review}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition">
                  <FaArrowLeft className="inline mr-2" /> Previous
                </button>
                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition">
                  Next <FaArrowRight className="inline ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <Partners />
      <TopDestinations />
      <Footer />
    </>
  );
};

export default Agent;

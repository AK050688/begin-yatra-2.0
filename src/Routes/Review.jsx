import React from 'react';
import { FaStar } from 'react-icons/fa';
import BackgroundImg from '../components/BackgroundImg';

const reviews = [
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
];

const Review = () => {
  return (
    <>
      <BackgroundImg contact={{title:"Reviews",dis:""}}/>
    <div className="bg-white min-h-screen px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-500 mb-4">
        What Our Customers Say
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Hear directly from our happy travelers who’ve experienced memorable vacations with us!
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
            <div className="flex items-center text-yellow-400 mb-2">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-gray-700 text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </div></>
  );
};

export default Review;
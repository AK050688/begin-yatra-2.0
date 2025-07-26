import React, { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import Card from "../../components/PopularPackages";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api/ApiService";

// const packages = [
//   {
//     img: "/Images/goa.jpeg",
//     title: "04 Nights / 05 Days Goa Tour With Dudhsagar Waterfall...",
//     location: "Goa",
//     duration: "4 Nights / 5 Days",
//     price: 6700,
//     rating: 4.3,
//     reviews: 106,
//   },
//   {
//     img: "/Images/rajastan.png",
//     title: "Experience Bali in 6 Nights of Tropical Beauty & Adventures!",
//     location: "Kuta, Ubud",
//     duration: "6 Nights / 7 Days",
//     price: 28500,
//     rating: 5.0,
//     reviews: 9,
//   },
//   {
//     img: "/Images/rajastan.png",
//     title: "Experience Bali in 6 Nights of Tropical Beauty & Adventures!",
//     location: "Kuta, Ubud",
//     duration: "6 Nights / 7 Days",
//     price: 28500,
//     rating: 5.0,
//     reviews: 9,
//   },

//   {
//     img: "/Images/kashmir.jpg",
//     title: "Gangtok Sikkim Package 4 N 5 D - (RATES APPLICABLE...)",
//     location: "Sikkim",
//     duration: "4 Nights / 5 Days",
//     price: 37500,
//     rating: 4.5,
//     reviews: 22,
//   },
//   {
//     img: "/Images/goa.jpeg",
//     title: "04 Nights / 05 Days Goa Tour With Dudhsagar Waterfall...",
//     location: "Goa",
//     duration: "4 Nights / 5 Days",
//     price: 6700,
//     rating: 4.3,
//     reviews: 106,
//   },
//   {
//     img: "/Images/rajastan.png",
//     title: "Experience Bali in 6 Nights of Tropical Beauty & Adventures!",
//     location: "Kuta, Ubud",
//     duration: "6 Nights / 7 Days",
//     price: 28500,
//     rating: 5.0,
//     reviews: 9,
//   },
// ];

const TrendingPackages = ({ trendingPackages = [] }) => {
  const navigate = useNavigate();
  
  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) {
      return '/Images/goa.jpeg'; // Default image
    }
    
    // If the image path is already a full URL, return it as is
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    
    // If it's a relative path, combine with base URL
    if (image.startsWith('/')) {
      return `https://begin-yatra-nq40.onrender.com/public/temp${image}`;
    }
    
    // If it's just a filename, combine with base URL
    return `https://begin-yatra-nq40.onrender.com/public/temp/${image}`;
  };

  const handlePackageClick = (packageId) => {
    // Store package data in localStorage for the inquiry page
    const selectedPackage = trendingPackages.find(pkg => pkg._id === packageId);
    if (selectedPackage) {
      localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
    }
    navigate('/get-qurey');
  };
 
  return (
    <>
      <section className="px-4 md:px-12 py-10 bg-white">
      <div className="flex justify-between align-middle">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Trending Tour Packages{" "}
          <span className="text-[#3b82f6]">on Begin Yatra</span>
          </h2>
          <Link to="/all-packages" className="text-blue-600 hover:underline">
            View All
          </Link>
      </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {trendingPackages.length > 0  && (
            trendingPackages.map((pkg, index) => (
              <div
                key={pkg._id || index}
                className="min-w-[280px] sm:min-w-[320px] w-[280px] sm:w-[320px] bg-white shadow-lg rounded-lg border border-gray-200 flex-shrink-0"
              >
                <img
                  src={getImageUrl(pkg.packageImage)}
                  alt={pkg.packageName}
                  className="w-full h-40 object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = '/Images/goa.jpeg';
                  }}
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                    {pkg.packageName}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm gap-1">
                    <MapPin className="w-4 h-4" />
                    {pkg.destinationId?.destinationName || 'Destination'}
                  </div>
                  <p className="text-gray-600 text-sm">{pkg.totalDaysNight}</p>
                  <div className="text-sm">
                    <p className="text-green-600 font-bold text-lg">
                      ₹ {pkg.packagePrice?.toLocaleString() || 'Contact for price'}
                    </p>
                    <p className="text-xs text-gray-400">
                      *Excluding Applicable Taxes
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={() => handlePackageClick(pkg._id)} 
                      className="flex-1 bg-[#3b82f6] hover:bg-[#3b83f698] text-white text-sm py-2 rounded-md"
                    >
                      Get Quotes
                    </button>
                    {/* <button className="flex-1 border border-gray-300 text-sm text-gray-700 py-2 rounded-md hover:bg-gray-50">
                      View Details
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          ) }
        </div>
      </section>
    </>
  );
};

export default TrendingPackages;

import React from "react";
import { MapPin, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api/ApiService";

const TrendingPackages = ({ trendingPackages = [] }) => {

  console.log("trendingPackages",trendingPackages);
  

  const navigate = useNavigate();

  const getImageUrl = (image) => {
    if (!image) return;
    if (image.startsWith("/")) {
      return `https://begin-yatra-nq40.onrender.com/public/temp${image}`;
    }

    return `https://begin-yatra-nq40.onrender.com/public/temp/${image}`;
  };

  const handlePackageClick = (packageId) => {
    const selectedPackage = trendingPackages.find(pkg => pkg._id === packageId);
    if (selectedPackage) {
      localStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
    }
    navigate("/get-qurey");
  };

  return (
    <section className="px-4 md:px-12 lg:py-10 md:py-8 py-4 bg-white">
      <div className="flex flex-wrap justify-between align-middle">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Trending Tour Packages{" "}
          <span className="text-[#3b82f6]">on Begin Yatra</span>
        </h2>
        <Link to="/all-packages" className="text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {trendingPackages.length > 0 &&
          trendingPackages.map((pkg, index) => {
            const destination = pkg.destinationId || {};
            const imageUrl = getImageUrl(destination.destinationImage);

            return (
              <div
                key={pkg._id || index}
                className="min-w-[280px] sm:min-w-[320px] w-[280px] sm:w-[320px] bg-white shadow-lg rounded-lg border border-gray-200 flex-shrink-0"
              >
                <img
                  src={imageUrl}
                  alt={destination.destinationName || pkg.packageName}
                  className="w-full h-40 object-cover rounded-t-lg"
                  // onError={(e) => {
                  //   e.target.src = "/Images/goa.jpeg";
                  // }}
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                    {pkg.packageName}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm gap-1">
                    <MapPin className="w-4 h-4" />
                    {destination.destinationName || "Destination"}
                  </div>

                  <p className="text-xs text-blue-500 capitalize">
                    {destination.destinationType || "domestic"}
                  </p>

                  <p className="text-gray-600 text-sm">
                    {pkg.totalDaysNight || "Duration Not Specified"}
                  </p>

                  <div className="text-sm">
                    <p className="text-green-600 font-bold text-lg">
                      ₹ {pkg.packagePrice?.toLocaleString() || "Contact for price"}
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
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default TrendingPackages;

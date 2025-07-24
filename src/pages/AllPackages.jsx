import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const allPackages = [
  {
    id: 1,
    name: "Goa Beach Escape",
    price: 299,
    description: "Enjoy the sunny beaches of Goa for 3 nights and 4 days.",
    location: "Goa, India",
    duration: 4,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Kashmir Paradise",
    price: 499,
    description: "Experience the beauty of Kashmir with a 5-day tour.",
    location: "Kashmir, India",
    duration: 5,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Rajasthan Heritage",
    price: 399,
    description: "Explore forts and palaces in Rajasthan for 4 nights.",
    location: "Jaipur, Rajasthan",
    duration: 4,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Maldives Luxury Escape",
    price: 999,
    description: "5 nights in a water villa with all meals included.",
    location: "Maldives",
    duration: 6,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Dubai Adventure",
    price: 799,
    description: "Desert safari, city tour, and shopping extravaganza.",
    location: "Dubai, UAE",
    duration: 4,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Singapore Family Fun",
    price: 699,
    description: "Universal Studios, Sentosa, and more for the family.",
    location: "Singapore",
    duration: 5,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  },
];

const priceRanges = [
  { label: "₹ 0 - ₹ 10,000", min: 0, max: 10000 },
  { label: "₹ 10,001 - ₹ 20,000", min: 10001, max: 20000 },
  { label: "₹ 20,001 - ₹ 50,000", min: 20001, max: 50000 },
  { label: "₹ 50,000+", min: 50001, max: Infinity },
];

const durationRanges = [
  { label: "0 – 4 Days", min: 0, max: 4 },
  { label: "5 – 9 Days", min: 5, max: 9 },
  { label: "10 – 15 Days", min: 10, max: 15 },
  { label: "16 – 25 Days", min: 16, max: 25 },
  { label: "25+ Days", min: 26, max: Infinity },
];

const getUniqueDestinations = (pkgs) => {
  const set = new Set(pkgs.map((p) => p.location));
  return Array.from(set);
};

const AllPackages = () => {
  // Remove old min/max price/duration states
  // Add new filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDurationRanges, setSelectedDurationRanges] = useState([]);
  const [appliedPriceRanges, setAppliedPriceRanges] = useState([]);
  const [appliedDurationRanges, setAppliedDurationRanges] = useState([]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // If you want to keep destination filter, you can keep it, but screenshot doesn't show it
  // const [destination, setDestination] = useState("");

  // Filtering logic
  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      // Price filter
      let priceMatch = true;
      if (appliedPriceRanges.length > 0) {
        priceMatch = appliedPriceRanges.some((rangeIdx) => {
          const range = priceRanges[rangeIdx];
          return pkg.price >= range.min && pkg.price <= range.max;
        });
      }
      // Duration filter
      let durationMatch = true;
      if (appliedDurationRanges.length > 0) {
        durationMatch = appliedDurationRanges.some((rangeIdx) => {
          const range = durationRanges[rangeIdx];
          return pkg.duration >= range.min && pkg.duration <= range.max;
        });
      }
      return priceMatch && durationMatch;
    });
  }, [appliedPriceRanges, appliedDurationRanges]);

  // Handlers
  const handlePriceChange = (idx) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  const handleDurationChange = (idx) => {
    setSelectedDurationRanges((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };
  const handleApplyFilter = () => {
    setAppliedPriceRanges(selectedPriceRanges);
    setAppliedDurationRanges(selectedDurationRanges);
  };
  const handleReset = () => {
    setSelectedPriceRanges([]);
    setSelectedDurationRanges([]);
    setAppliedPriceRanges([]);
    setAppliedDurationRanges([]);
  };

  const navigate = useNavigate();

  // Modal open handler
  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };
  // Modal close handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPackage(null);
  };
  // Inquiry navigation
  const handleInquiry = () => {
    if (selectedPackage) {
      navigate(`/get-qurey`);
    } else {
      navigate('/inquiry');
    }
  };

  return (
    <>
      <div className="relative h-[28rem] w-full bg-[url('/Images/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden ">
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12 py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-6 text-center animate-fade-in-down">
            All Packages
          </h1>
          </div>
        </div>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-2 md:px-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
          <div className="">
            <aside className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 mb-8 md:mb-0">
          
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800">Filter by</h2>
                <button className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={handleReset}>Reset all</button>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Price Range <span className="text-gray-400 text-sm">(per person)</span></div>
                  <div className="flex flex-col gap-2 mt-2">
                    {priceRanges.map((range, idx) => (
                      <label key={range.label} className="flex items-center gap-2 text-gray-700">
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          checked={selectedPriceRanges.includes(idx)}
                          onChange={() => handlePriceChange(idx)}
                        />
                        {range.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1 mt-4">Duration</div>
                  <div className="flex flex-col gap-2 mt-2">
                    {durationRanges.map((range, idx) => (
                      <label key={range.label} className="flex items-center gap-2 text-gray-700">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          checked={selectedDurationRanges.includes(idx)}
                          onChange={() => handleDurationChange(idx)}
                        />
                        {range.label}
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 cursor-pointer transition mt-4"
                  onClick={handleApplyFilter}
                >
                  Apply Filter
                </button>
              </div>
        </aside>
        </div>
            {/* Package Cards */}
            <main className="flex-1">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-1">
                {filteredPackages.length === 0 && (
                  <div className="text-center text-gray-500 text-xl py-20">
                    No packages found for selected filters.
                  </div>
                )}
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full md:w-72 h-60 object-cover object-center"
                    />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">
                          {pkg.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {pkg.location}
                          </span>
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {pkg.duration} Days
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-green-600">
                          ₹{pkg.price}
                        </span>
                        <button
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                          onClick={() => handleViewDetails(pkg)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
      </div>
      {/* Modal for package details */}
      {modalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in-up">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedPackage.image}
              alt={selectedPackage.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{selectedPackage.name}</h2>
            <p className="text-gray-600 mb-4">{selectedPackage.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {selectedPackage.location}
              </span>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {selectedPackage.duration} Days
              </span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-bold text-green-600">
                ₹{selectedPackage.price}
              </span>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                onClick={handleInquiry}
              >
                Get Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End Modal */}
    </>
  );
};

export default AllPackages;

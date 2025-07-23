import React, { useState, useMemo } from "react";

const allPackages = [
  {
    id: 1,
    name: "Goa Beach Escape",
    price: 299,
    description: "Enjoy the sunny beaches of Goa for 3 nights and 4 days.",
    location: "Goa, India",
    duration: 4,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Kashmir Paradise",
    price: 499,
    description: "Experience the beauty of Kashmir with a 5-day tour.",
    location: "Kashmir, India",
    duration: 5,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Rajasthan Heritage",
    price: 399,
    description: "Explore forts and palaces in Rajasthan for 4 nights.",
    location: "Jaipur, Rajasthan",
    duration: 4,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Maldives Luxury Escape",
    price: 999,
    description: "5 nights in a water villa with all meals included.",
    location: "Maldives",
    duration: 6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Dubai Adventure",
    price: 799,
    description: "Desert safari, city tour, and shopping extravaganza.",
    location: "Dubai, UAE",
    duration: 4,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Singapore Family Fun",
    price: 699,
    description: "Universal Studios, Sentosa, and more for the family.",
    location: "Singapore",
    duration: 5,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  }
];

const getUniqueDestinations = (pkgs) => {
  const set = new Set(pkgs.map((p) => p.location));
  return Array.from(set);
};

const AllPackages = () => {
  const [destination, setDestination] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      const matchesDestination = destination ? pkg.location === destination : true;
      const matchesMinPrice = minPrice ? pkg.price >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice ? pkg.price <= Number(maxPrice) : true;
      const matchesMinDuration = minDuration ? pkg.duration >= Number(minDuration) : true;
      const matchesMaxDuration = maxDuration ? pkg.duration <= Number(maxDuration) : true;
      return (
        matchesDestination &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinDuration &&
        matchesMaxDuration
      );
    });
  }, [destination, minPrice, maxPrice, minDuration, maxDuration]);

  const destinations = getUniqueDestinations(allPackages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-2 md:px-0">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700 drop-shadow">All Packages</h1>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-80 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Filter Packages</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Destination</label>
              <select
                className="border rounded-md px-3 py-2 min-w-[180px]"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">All</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Min Price ($)</label>
              <input
                type="number"
                className="border rounded-md px-3 py-2"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Max Price ($)</label>
              <input
                type="number"
                className="border rounded-md px-3 py-2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Min Duration (days)</label>
              <input
                type="number"
                className="border rounded-md px-3 py-2"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                placeholder="1"
                min="1"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">Max Duration (days)</label>
              <input
                type="number"
                className="border rounded-md px-3 py-2"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                placeholder="10"
                min="1"
              />
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition mt-2"
              onClick={() => {
                setDestination("");
                setMinPrice("");
                setMaxPrice("");
                setMinDuration("");
                setMaxDuration("");
              }}
            >
              Reset
            </button>
          </div>
        </aside>
        {/* Package Cards */}
        <main className="flex-1">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-1">
            {filteredPackages.length === 0 && (
              <div className="text-center text-gray-500 text-xl py-20">No packages found for selected filters.</div>
            )}
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full md:w-72 h-60 object-cover object-center"
                />
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">{pkg.name}</h2>
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
                    <span className="text-2xl font-bold text-green-600">${pkg.price}</span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
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
  );
};

export default AllPackages; 
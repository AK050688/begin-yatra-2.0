import React from 'react';

const brands = [
  { img: "/Logo/Logo.png", name: "Begin Yatra" },
  { img: "/Logo/Logo.png", name: "Begin Yatra" },
  { img: "/Logo/Logo.png", name: "Begin Yatra" },
];

const about = [
  { num: "50+", text: "Destinations" },
  { num: "87k+", text: "Leads in CRM" },
  { num: "100%", text: "Verified" },
];

const Partners = () => {
  return (
    <div className="bg-gray-50 py-14 px-4">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
        Partners Who Take Travel Leads
      </h1>

      {/* Brand Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="text-gray-700 font-semibold text-center">{brand.name}</p>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Cool Facts About Us
        </h4>
        <p className="text-gray-600 leading-relaxed mb-10">
          Our team has more than 50 years of experience in running a travel
          marketplace and CRM. We've started fresh to create an ecosystem where
          all travel companies can come together & help each other.
        </p>

        {/* About Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {about.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-40 h-28 bg-gradient-to-b from-blue-500 to-sky-200 rounded-2xl text-white shadow-md"
            >
              <p className="text-xl font-bold">{item.num}</p>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;

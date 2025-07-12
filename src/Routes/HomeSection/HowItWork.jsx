import React from "react";

const HowItWork = () => {
  const howWork = [
    {
      img: "/Images/gallery.png",
      title: "Select Your Tour",
      dis: "Tell us your Requirements",
    },
    {
      img: "/Images/gallery.png",
      title: "Customize Package",
      dis: "Personalize your itinerary",
    },
    {
      img: "/Images/gallery.png",
      title: "Book & Travel",
      dis: "Confirm and start your journey",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            How We Work?
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Customize & Book Your Tour Package in 3 Simple Steps
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howWork.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={data.img}
                  alt={data.title}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {data.title}
              </h3>
              <p className="text-gray-600">{data.dis}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
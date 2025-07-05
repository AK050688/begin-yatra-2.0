import React from "react";

const Contactus = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 text-center">Contact Us</h1>
      
      <p className="text-gray-700 mb-10 text-center max-w-3xl mx-auto">
        Resume your travel button — we're planning your next adventure & delightful vacation with your family & friends. Have a question for us, or need inspiration? We're here to help.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 text-gray-800">
        {/* Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">Address</h2>
          <div className="mb-3">
            <p className="font-medium">Regd Address:</p>
            <p className="text-sm">17, Rosewood, First Floor, Malibu Towne, Sector 47, Gurugram, Haryana - 122018</p>
          </div>
          <div className="mb-3">
            <p className="font-medium">Branch Address:</p>
            <p className="text-sm">C-4, Rayos Business Park, Block C, Sector 63, Noida, UP - 201301</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">Contact Info</h2>
          <div className="mb-3">
            <p className="font-medium">Email:</p>
            <p className="text-sm break-all">help@tripclap.com</p>
          </div>
          <div>
            <p className="font-medium">Mobile:</p>
            <p className="text-sm">+91-8069145442</p>
          </div>
        </div>

        {/* Stay Connected */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-500">Stay Connected</h2>
          <div className="mb-3">
            <p className="font-medium">Website:</p>
            <p className="text-sm break-all">www.tripclap.com</p>
          </div>
          <div className="mb-3">
            <p className="font-medium">Facebook:</p>
            <p className="text-sm break-all">www.facebook.com/tripclapp</p>
          </div>
          <div>
            <p className="font-medium">Instagram:</p>
            <p className="text-sm break-all">www.instagram.com/tripclapp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
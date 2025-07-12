import React from "react";
import { MdOutlineCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Contactus = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4 text-center">Contact Us</h1>
      
      <p className="text-gray-700 mb-10 text-center max-w-3xl mx-auto">
        Resume your travel button — we're planning your next adventure & delightful vacation with your family & friends. Have a question for us, or need inspiration? We're here to help.
      </p>
      <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
        <p className="text-gray-500 mb-8">
          Have questions or want to customize your trip? We're happy to help!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-5 bg-gray-50 p-6 rounded-xl shadow">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg flex gap-2 items-center font-semibold text-gray-800 mb-2">
            <FaLocationDot /> Address
            </h4>
            <p className="text-gray-600">
              4th Floor, TravelHub Building, Connaught Place, New Delhi – 110001
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg flex gap-2 items-center font-semibold text-gray-800 mb-2">
              <MdOutlineCall/>
 Phone
            </h4>
            <p className="text-gray-600">+91 9876543210</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg flex gap-2 items-center font-semibold text-gray-800 mb-2">
             <MdOutlineMail/> Email
            </h4>
            <p className="text-gray-600">support@tripclapclone.com</p>
          </div>
        </div>
      </div>
    </div>
      
      <div className="grid md:grid-cols-3 gap-6 text-gray-800">
       
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
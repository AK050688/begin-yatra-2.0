import React from "react";
import { MdOutlineCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import BackgroundImg from "../components/BackgroundImg";

const Contactus = () => {
  return (
    <>
      <BackgroundImg
        contact={{
          title: "Contact us",
          dis: "Resume your travel journey — we're crafting your next adventure and delightful vacation with family & friends. Have a question or need inspiration? We're here to help.",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-500 mb-8">
              Have questions or want to customize your trip? We're happy to
              help!
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
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="91+XXXXXXXXXX"
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
                  required></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
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
                  <p> Begin Yatra</p>
                  <p>Mandar Hill, Banka, Bihar, India 813104</p>
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="text-lg flex gap-2 items-center font-semibold text-gray-800 mb-2">
                  <MdOutlineCall />
                  Phone
                </h4>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="text-lg flex gap-2 items-center font-semibold text-gray-800 mb-2">
                  <MdOutlineMail /> Email
                </h4>
                <p className="text-gray-600">info@beginyatra.com</p>
                <p className="text-gray-600">service.beginyatra@gmail.com </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-gray-800">
          <div className="bg-white  hover:shadow-2xl p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">
              Address
            </h2>
            <div className="mb-3">
              <p className="font-medium">Begin Yatra</p>
              <p className="text-sm">Mandar Hill, Banka, Bihar, India 813104</p>
            </div>
          </div>

          <div className="bg-white  hover:shadow-2xl p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">
              Contact Info
            </h2>
            <div className="mb-3">
              <p className="font-medium">Email:</p>
              <p className="text-sm break-all">info@beginyatra.com</p>
            </div>
            <div>
              <p className="font-medium">Mobile:</p>
              <p className="text-sm">+91-9508241806</p>
            </div>
          </div>

          <div className="bg-white  hover:shadow-2xl p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">
              Stay Connected
            </h2>
            <div className="mb-3">
              <p className="font-medium">Website:</p>
              <a href="#" target="_blank" className="text-sm break-all">
                www.beginyatra.com
              </a>
            </div>
            <div className="mb-3">
              <p className="font-medium">Facebook:</p>
              <a href="https://www.facebook.com/Beginyatra?mibextid=ZbWKwL" target="_blank" className="text-sm break-all">
                https://www.facebook.com/Beginyatra
              </a>
            </div>
            <div>
              <p className="font-medium">Instagram:</p>
              <a href="https://www.instagram.com/beginyatra?igsh=YnlnOXExYWluY25h" target="_blank" className="text-sm break-all">
                https://www.instagram.com/beginyatra
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;

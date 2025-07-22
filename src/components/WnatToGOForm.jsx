import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { TbMessages } from "react-icons/tb";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    to: "",
    from: "Noida",
    departure: "",
    adults: "",
    infant: 0,
    children: 0,
    email: "",
    phone: "",
  });

  return (
    <div className="min-h-[640px] w-full px-4 py-8 sm:px-6 md:px-10 lg:px-16 bg-white text-gray-700 font-sans">
      <h3 className="text-2xl text-center mb-12 font-bold">
        Our experts would love to create a package just for you Fill in your
        requirements here
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section - How We Work */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-6">
            How we work?
          </h2>
          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <GrGallery className="mt-1 text-xl text-blue-600" />
              <div>
                <p className="font-medium">Select your tour</p>
                <p className="text-gray-500">Tell us your requirements</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <TbMessages className="mt-1 text-xl text-blue-600" />
              <div>
                <p className="font-medium">Get Multiple Free Quotes</p>
                <p className="text-gray-500">
                  From our verified travel experts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <HiDevicePhoneMobile className="mt-1 text-xl text-blue-600" />
              <div>
                <p className="font-medium">Customize & Book</p>
                <p className="text-gray-500">Your preferred tour</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 text-center text-blue-600">
            <h3 className="font-semibold text-sm mb-2">
              We're a growing company
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600">
              <div className="text-center">
                <img
                  src="/Images/verified.png"
                  alt="Verified"
                  className="w-14 mx-auto"
                />
                <p className="font-bold">1500+</p>
                <p>Verified Agents</p>
              </div>
              <div className="text-center">
                <img
                  src="/Images/happy.png"
                  alt="Happy"
                  className="w-14 mx-auto"
                />
                <p className="font-bold">100k+</p>
                <p>Happy Travellers</p>
              </div>
              <div className="text-center">
                <img
                  src="/Images/destination.png"
                  alt="Destinations"
                  className="w-14 mx-auto"
                />
                <p className="font-bold">190+</p>
                <p>Destinations</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 items-center text-base">
              <p className="text-gray-600 flex items-center gap-2">
                <FiPhoneCall /> Call Us for details
              </p>
              <p className="font-bold text-xl text-blue-600">0806 914 5442</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-6">
            Where do you want to go?
          </h2>

          <form className="space-y-4 text-sm">
            <div>
              <label htmlFor="to">To*</label>
              <input
                type="text"
                id="to"
                placeholder="Enter Destination"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="from">From*</label>
              <input
                type="text"
                id="from"
                value={formData.from}
                readOnly
                className="w-full border rounded px-4 py-2 bg-gray-100"
              />
            </div>

            {/* Departure Date Selection */}
            <div>
              <label htmlFor="departureDate">
                Departure Date <small>(Choose Any)*</small>
              </label>
              <div className="flex gap-2 my-2">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
                >
                  Fixed
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
                >
                  Flexible
                </button>
              </div>
              <input
                type="date"
                id="departureDate"
                value={formData.departure}
                onChange={(e) =>
                  setFormData({ ...formData, departure: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
            </div>

            {/* Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="adults">Adults</label>
                <select
                  id="adults"
                  className="w-full border rounded px-2 py-1"
                  value={formData.adults}
                  onChange={(e) =>
                    setFormData({ ...formData, adults: e.target.value })
                  }
                >
                  <option>Select</option>
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="infant">Infant</label>
                <input
                  type="number"
                  id="infant"
                  className="w-full border rounded px-2 py-1"
                  value={formData.infant}
                  onChange={(e) =>
                    setFormData({ ...formData, infant: e.target.value })
                  }
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="children">Children (2-12 yrs)</label>
                <input
                  type="number"
                  id="children"
                  className="w-full border rounded px-2 py-1"
                  value={formData.children}
                  onChange={(e) =>
                    setFormData({ ...formData, children: e.target.value })
                  }
                  min="0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="text"
                id="phone"
                placeholder="+91 Enter your mobile number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow-md"
            >
              Plan My Holidays →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TravelForm;

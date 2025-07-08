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
    <div className="min-h-[640px] w-full px-4 py-6 md:px-16 md:py-10 bg-white text-gray-700 font-sans">
      {/* Top Nav Strip (fake placeholder) */}
    

      <div className="grid md:grid-cols-2 gap-10 mt-4">
        {/* Left - How we work */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-6">How we work ?</h2>

          <div className="space-y-6 text-sm">
            <div className="flex items-start space-x-4">
                        <GrGallery className="mt-4 text-xl" />

              <div>
                <p className="font-medium">Select your tour</p>
                <p className="text-gray-500">Tell us your requirements</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
          <TbMessages  className="mt-4 text-xl" />

              <div>
                <p className="font-medium">Get Multiple Free Quotes</p>
                <p className="text-gray-500">From our verified travel experts</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
             <HiDevicePhoneMobile  className="mt-4 text-xl" />
              <div>
                <p className="font-medium">Customize & Book</p>
                <p className="text-gray-500">Your preferred tour</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-blue-600">
            <h3 className="font-semibold text-sm mb-2">We're a growing company</h3>
            <div className="flex justify-center gap-6 text-xs text-gray-600">
              <div className="text-center">
                <img src="/Images/verified.png" alt="img" className="w-16 mx-auto" />
                <p className="font-bold">1500+</p>
                <p>Verified Agents</p>
              </div>
              <div className="text-center">
                                <img src="/Images/happy.png" alt="img" className="w-16 mx-auto" />

                <p className="font-bold">100k+</p>
                <p>Happy Travellers</p>
              </div>
              <div className="text-center">
                                <img src="/Images/destination.png" alt="img" className="w-16 mx-auto" />

                <p className="font-bold">190+</p>
                <p>Destinations</p>
              </div>
            </div>

            <div className="mt-6 text-base flex flex-col gap-4 justify-center w-full text-center">
              <p className="text-gray-600 flex items-center gap-2 mx-auto"><FiPhoneCall /> Call Us for details</p>
              <p className="font-bold text-xl text-blue-600">0806 914 5442</p>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Where do you want to go?</h2>

          <form className="space-y-4 text-sm">
            <label htmlFor="to">To*</label>
            <input
              type="text"
              placeholder="Search Destination"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
            <label htmlFor="from">from*</label>

            <input
              type="text"
              value={formData.from}
              readOnly
              className="w-full border rounded px-4 py-2 bg-gray-100"
            />
<div className="">
  <label htmlFor="DepartureDate">Departure Date <small>(Choose Any)*</small></label>
  <div className="flex gap-2 justify-center items-center">
    <button className="btn px-18 hover:bg-blue-500 hover:text-white bg-gray-300">Fixed</button>
    <button className="btn px-18 hover:bg-blue-500 hover:text-white bg-gray-300">Flexed</button>
  </div>
</div>
            <input
              type="date"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />

            {/* Guests */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Adults</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                >
                  <option>Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Infant</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={formData.infant}
                  onChange={(e) => setFormData({ ...formData, infant: e.target.value })}
                  min="0"
                />
              </div>
              <div>
                <label>Children (2-12 yrs)</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                  min="0"
                />
              </div>
            </div>


<label htmlFor="email">email*</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
<label htmlFor="nubmer">number*</label>

            <input
              type="text"
              placeholder="+91 Enter your mobile number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow-md text-sm"
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
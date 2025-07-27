import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { TbMessages } from "react-icons/tb";
import api from "../Api/ApiService";

const defaultForm = {
  leadId: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  destination: "",
  travelDate: Date.now(),
  adult: "0",
  children: "0",
  infant: "0",
  tripType: "",
  leadType: "",
  totalMembers: {
    adult: "0",
    children: "0",
    infant: "0",
  },
  travelDays: "",
  travelNights: "",
};
const TravelForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    destination: "",
  });
  const handleGroupChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      totalMembers: {
        ...form.totalMembers,
        [name]: value,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (["name", "phone", "email", "city", "destination"].includes(name)) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!form.destination.trim()) {
      newErrors.destination = "Destination is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const leadData = {
        ...form,
        travelTime: `${form.travelDays} (days) - ${form.travelNights} (nights)`,
        totalMembers: form.totalMembers,
      };
      const res = await api.post("/api/leads", leadData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Lead submitted successfully:", res);
      if (
        (res.status === 200 || res.status === 201) &&
        (res.data.statusCode === 200 || res.data.statusCode === 201)
      ) {
        alert(res.data.message || "Lead submitted successfully! Our experts will contact you soon.");
      } else {
        alert(res.data.message || "Error submitting lead");
      }
      setForm(defaultForm);
      setErrors({});
    } catch (error) {
      console.error("Failed to submit lead:", error);
      alert("An error occurred while saving the lead.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[640px] w-full px-4 py-8 sm:px-6 md:px-10 lg:px-16 bg-white text-gray-700 font-sans">
      <h3 className="text-2xl text-center mb-12 font-bold">
        Our experts would love to create a package just for you Fill in your
        requirements here
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section - How We Work */}
        <div className="flex flex-col  justify-center bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl text-center font-semibold text-blue-600 mb-6">
            How we work?
          </h2>
          <div className="space-y-6 text-sm mx-auto">
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
            <h3 className="font-semibold text-center text-sm mb-2">
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
              <p className="font-bold text-xl text-blue-600">+91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col justify-center bg-gray-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl text-center font-semibold text-blue-600 mb-6">
            Where do you want to go?
          </h2>

          <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name || ""}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 "
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 justify-center align-middle gap-4 mb-4">
              <div className="w-full ">
                <label htmlFor="city">From*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City..."
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div className="w-full ">
                <label htmlFor="destination">To*</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Destination..."
                  value={form.destination}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 "
                />
                {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
              </div>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              <div>
                <label htmlFor="adult">Adults</label>
                <input
                  type="number"
                  id="adult"
                  name="adult"
                  value={form?.totalMembers?.adult}
                  min="0"
                  onChange={handleGroupChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>
              <div className="flex gap-2">
                <div className="">
                  <label htmlFor="travelDays">Travel days</label>
                  <input
                    type="number"
                    id="travelDays"
                    name="travelDays"
                    placeholder="Enter days"
                    min={0}
                    value={form.travelDays}
                    onChange={handleChange}
                    className="w-full px-4  py-3 border rounded-xl "
                  />
                </div>
                <div className="">
                  <label htmlFor="travelNights">Travel Night</label>
                  <input
                    type="number"
                    id="travelNights"
                    name="travelNights"
                    min={0}
                    placeholder="Enter nights"
                    value={form.travelNights}
                    onChange={handleChange}
                    className="w-full px-4  py-3 border  rounded-xl focus:ring-2   focus:border-transparent transition-all duration-200 "
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 Enter your mobile number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center gap-4">
              <div>
                <label htmlFor="leadType">Select Inquiry Type*</label>
                <select
                  id="leadType"
                  name="leadType"
                  value={form.leadType}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2">
                
                  <option value="domestic" selected>Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="tripType">Select Trip Type*</label>
                <select
                  name="tripType"
                  id="tripType"
                  value={form.tripType}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2">
                  <option value="">Select Trip Type</option>
                  <option value="Family">Family</option>
                  <option value="Friends">Friends</option>
                  <option value="Couples">Couples</option>
                  <option value="Business">Business</option>
                  <option value="Senior_Citizen">Senior_Citizen</option>
                  <option value="Group">Group</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center gap-2">
             
              {/* <div className="">
                <label htmlFor="travelDate">Date</label>
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  placeholder="Select date"
                  value={form.travelDate}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border  rounded-xl focus:ring-2   focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                />
              </div> */}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow-md">
              {isLoading ? "Submitting..." : "Plan My Holidays →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TravelForm;

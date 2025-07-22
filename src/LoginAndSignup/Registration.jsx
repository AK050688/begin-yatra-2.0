import React, { useState } from "react";

const AgentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    company: "",
    city: "",
    password: "",
    kyc: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    // Handle file separately
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted:", formData);
    alert("Registration Submitted!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-10 z-0"></div>
      <div className="bg-white/80 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Agent Registration
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-2 gap-4"
        >
          {/* Basic Inputs */}
          <input
            type="text"
            name="Username"
            placeholder="Name"
            value={formData.username}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
          />

          {/* File Upload */}
          {/* <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Upload KYC Document
            </label>
            <input
              type="file"
              name="kyc"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded px-2 py-1 file:bg-blue-500 file:text-white file:border-0 file:py-1 file:px-4"
            />
            {formData.kyc && (
              <p className="text-sm text-green-600 mt-1">Uploaded: {formData.kyc.name}</p>
            )}
          </div> */}

          {/* Textarea */}
          {/* <div className="col-span-1 md:col-span-2">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message or query"
              className="w-full border rounded px-4 py-2 resize-none"
            />
          </div> */}

          {/* Submit */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentRegistrationForm;

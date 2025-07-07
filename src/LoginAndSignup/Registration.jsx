import React, { useState } from "react";
import { Link } from "react-router-dom";

const AgentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    company: "",
    city: "",
    password: "",
    kyc: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Registration Submitted!");
  };

  return (
    <div className="min-h-screen bg-black/40 flex items-center justify-center relative">
      {/* Background Logo */}
      <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-10 z-0"></div>
      <div className="bg-white/50 shadow-2xl rounded-xl w-full max-w-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Agent Registration
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <label className="font-semibold mb-1 ">User Name</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
              className="input-style input"
              placeholder="Enter your name"
            />
          </div>


          <div className="flex flex-col">
            <label className="font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              required
              className="input-style input"
              placeholder="+91 9876543210"
            />
          </div>


          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="input-style input"
              placeholder="you@example.com"
            />
          </div>


          <div className="flex flex-col">
            <label className="font-semibold mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              onChange={handleChange}
              required
              className="input-style  input"
              placeholder="Begin Yatra Pvt Ltd"
            />
          </div>

        
          <div className="flex flex-col">
            <label className="font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              required
              className="input-style  input"
              placeholder="Your City"
            />
          </div>

     
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="input-style  input"
              placeholder="••••••••"
            />
          </div>

     
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="font-semibold mb-1">KYC Document</label>
            <input
              type="file"
              name="kyc"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white file:rounded file:cursor-pointer hover:file:bg-blue-600"
            />
          </div>

    
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="font-semibold mb-1">Query / Message</label>
            <textarea
              name="message"
              onChange={handleChange}
              rows={4}
              placeholder="Write your query or message here..."
              className="input-style resize-none"
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-300"
            >
              Register Now
            </button>
          </div>
           <p className="text-center text-sm text-gray-600 mt-6">
         Back to login? <Link to="/agent/login-agent" className="text-blue-500 hover:underline">Login</Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default AgentRegistrationForm;
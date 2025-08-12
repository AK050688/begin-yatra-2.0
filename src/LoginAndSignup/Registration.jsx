import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import api from "../Api/ApiService";
import { toast } from "react-toastify";

const AgentRegistrationForm = () => {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  // const [kycFile, setKycFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Log user after signup
  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("companyName", companyName);
      formData.append("city", city);

      await api.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Signup successfully");
      navigate("/agent/login-agent");
    } catch (error) {
      toast("Failed to create an account");
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black/30 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-50 z-0"></div>

      <div className="bg-white/80 p-8 rounded-lg shadow-md w-full max-w-4xl z-100 ">
        <div className="flex justify-between items-center align-middle my-4">
          <h2 className="text-2xl font-bold text-blue-600 text-center">
            Agent Registration
          </h2>
          <div className="flex justify-end align-middle">
            <button
              onClick={() => navigate(`/agent`)}
              className="bg-blue-600 px-4 py-2 rounded-2xl text-white cursor-pointer"
            >
              <FaArrowLeft />
            </button>
          </div>
        </div>
        <form
          onSubmit={signupHandler}
          className="grid grid-cols-2 md:grid-cols-2 gap-4"
        >
          {/* Basic Inputs */}
          <input
            type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
            required
            className="border rounded px-4 py-2"
          />
          <input
              type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
            required
            className="border rounded px-4 py-2"
          />
          <input
              type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
            required
            className="border rounded px-4 py-2"
          />
          <input
          type="text"
                id="companyName"
                // required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company"
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Mumbai"
            required
            className="border rounded px-4 py-2"
          />
          <input
            type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
            required
            className="border rounded px-4 py-2"
          />

          {/* Submit */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
            disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
            {isLoading ? "Processing.." : "Register"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/agent/login-agent"
            className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AgentRegistrationForm;

import React,{useState} from 'react'
import api from "../../Api/ApiService";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

const ForgotPassword = () => {
 const [email, setEmail] = useState("");
 const navigate = useNavigate();
const [loading, setLoading] = useState(false)
const handleForgotPassword = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
   const res = await api.post(`/api/auth/forgotPassword`, { email });
   console.log(res);
   localStorage.setItem("email", email);
   navigate("/verify-otp")
  } catch (error) {
    console.error("Forgot password error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
      setLoading(true);
  }
};


  return (
    <div className="min-h-screen bg-black/30 flex items-center justify-center relative">
      {/* Background Logo */}
      <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-50 z-0"></div>

      {/* Forgot Password Box */}
      <div className="bg-white/60 px-8 md:px-12 py-10 w-[90%] max-w-md rounded-lg shadow-lg z-10 relative">
        <div className="flex justify-between items-center align-middle mb-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Begin Yatra
          </h2>
          <div className="flex justify-end align-middle items-center">
            <button
              onClick={() => navigate(`/agent`)}
              className="bg-blue-600 px-4 py-2 rounded-2xl text-white cursor-pointer"
            >
              <FaArrowLeft />
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-black mb-2">
          Forgot Password
        </h1>
        <h2 className="text-center text-gray-600 mb-6">
          Enter your email to reset your password
        </h2>

        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1">
              Email 
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              required
            />
          </div>
         
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition">
            { loading ? "Sending OTP":"Send OTP"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/agent")}
            className="text-blue-500 hover:underline">
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword

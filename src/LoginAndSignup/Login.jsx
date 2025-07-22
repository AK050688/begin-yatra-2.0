import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      {/* Background Logo */}
      <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-10 z-0"></div>

      {/* Login Box */}
      <div className="bg-white/70 px-8 md:px-12 py-10 w-[90%] max-w-md rounded-lg shadow-lg z-10 relative">
        
        <div className="flex justify-between items-center align-middle ">
        <h2 className="text-3xl font-bold text-center text-blue-600">Begin Yatra</h2>
        <div className="flex justify-end align-middle items-center">
        <button onClick={()=>navigate(`/agent`)} className="bg-blue-600 px-4 py-2 rounded-2xl text-white cursor-pointer">Back to Agent page</button>
          </div>
          </div>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <Link to="/agent/login-agent-registration" className="text-blue-500 hover:underline">Registration</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
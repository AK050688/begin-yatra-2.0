import React, { useState } from "react";
import api from "../../Api/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const email = localStorage.getItem("email");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!newPassword || !confirmNewPassword) {
      toast.warn("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    try {
      const res = await api.post("/api/auth/changePassword", {
        email,
        newPassword,
        confirmNewPassword,
      });

      toast.success("Password changed successfully!");
      console.log(res, "pass");
      navigate("/auth/login");

      // Clear inputs
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black/30 flex items-center justify-center relative">
        {/* Background Logo */}
        <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-50 z-0"></div>

        {/* Change Password Box */}
        <div className="bg-white/60 px-8 md:px-12 py-10 w-[90%] max-w-md rounded-lg shadow-lg z-10 relative">
          <ToastContainer position="top-center" />

          <div className="flex justify-between items-center align-middle mb-6">
            <h2 className="text-3xl font-bold text-center text-blue-600">
              Begin Yatra
            </h2>
            <div className="flex justify-end align-middle items-center">
              <button
                onClick={() => navigate(`/agent/login-agent`)}
                className="bg-blue-600 px-4 py-2 rounded-2xl text-white cursor-pointer">
                <FaArrowLeft />
              </button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-black mb-2">
            Change Password
          </h1>
          <h2 className="text-center text-gray-600 mb-6">
            Enter your new password
          </h2>

          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

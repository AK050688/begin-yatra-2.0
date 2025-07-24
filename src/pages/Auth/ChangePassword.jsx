import React, { useState } from "react";
import api from "../../Api/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
       <ToastContainer position="top-center" />
       <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
         <h1 className="text-3xl font-bold text-center text-black">
           Change Password
         </h1>
         <h2 className="text-center text-gray-600 mt-2 mb-6">
           Enter your new password
         </h2>

         <form className="space-y-4" onSubmit={handleChangePassword}>
           <div>
             <input
               type="password"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               placeholder="New Password"
               className="w-full h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
             />
           </div>
           <div>
             <input
               type="password"
               value={confirmNewPassword}
               onChange={(e) => setConfirmNewPassword(e.target.value)}
               placeholder="Confirm Password"
               className="w-full h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
             />
           </div>
           <button
             type="submit"
             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
             Change Password
           </button>
         </form>
       </div>
     </div>
   </>
 );
};

export default ChangePassword;

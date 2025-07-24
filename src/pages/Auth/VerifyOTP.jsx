import React, { useRef, useState, useEffect } from "react";
import api from "../../Api/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputsRef = useRef([]);
  const email = localStorage.getItem("email");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  // Countdown timer effect
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 4 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

const handleVerifyOTP = async (e) => {
  e.preventDefault();
  const finalOtp = otp.join("");
  console.log("Final OTP:", finalOtp);

  if (finalOtp.length !== 5) {
    toast.warn("Please enter all 5 digits of the OTP.");
    return;
  }

  try {
    const res = await api.post(`/api/auth/verifyUserOtp`, {
      email,
      otp: parseInt(finalOtp, 10), // Convert OTP string to integer
    });
    toast.success("OTP verified successfully!");
    navigate("/add-new-password")
    // Redirect if needed
  } catch (error) {
    console.error("OTP verification failed:", error);
    toast.error("Invalid OTP or server error.");
  }
};

const handleResendOtp = async () => {
  // Check if email exists
  if (!email) {
    toast.error("No email found. Please try again.");
    return;
  }

  setIsResending(true); // Disable button during request

  try {
    // Call API to resend OTP
    const response = await api.put("/api/auth/reSendOtp", { email });

    // Show success toast
    toast.success("OTP resent successfully!");
    console.log(response);
    
    // Clear existing OTP input
    setOtp(new Array(5).fill(""));

    // Restart 30-second countdown
    setResendTimer(30);

    // Focus the first OTP input
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  } catch (error) {
    console.error("Resend OTP failed:", error);
    toast.error("Failed to resend OTP. Try again later.");
  } finally {
    setIsResending(false); // Re-enable button
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-black">
          Verify OTP
        </h1>
        <h2 className="text-center text-gray-600 mt-2 mb-6">
          Enter the 5-digit code sent to your email
        </h2>

        <form className="space-y-4" onSubmit={handleVerifyOTP}>
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => e.preventDefault()} // Prevent pasting
                autoFocus={index === 0}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend available in {resendTimer}s
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-sm text-blue-600 hover:underline disabled:opacity-50">
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;


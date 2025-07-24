import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import axiosWithCredentials from "../Api/ApiService";
import { toast } from "react-toastify";
import { loginRequest, loginSuccess } from "../store/userSlice";
const LoginPage = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();


  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(true));

    try {
      setIsLoading(true);
      const response = await axiosWithCredentials.post(`/api/auth/login`, {
        emailOrPhone: email,
        password,
      });
      const user = response.data.data.user;
      const accessToken = response.data.data.accessToken;
      dispatch(
        loginSuccess({
          user,
          accessToken,
        })
      );
      navigate("/");
    } catch (error) {
      console.error(
        "Error during login:",
        error?.response?.data || error?.message
      );
      toast("Invalid email or password");
    } finally {
      dispatch(loginRequest(false));
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black/30 flex items-center justify-center relative">
      {/* Background Logo */}
      <div className="absolute inset-0 bg-[url('/Logo/Logo.png')] bg-center bg-no-repeat bg-contain opacity-50 z-0"></div>

      {/* Login Box */}
      <div className="bg-white/60 px-8 md:px-12 py-10 w-[90%] max-w-md rounded-lg shadow-lg z-10 relative">
        <div className="flex justify-between items-center align-middle ">
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
        <form className="space-y-5">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
                            required
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
                required
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end text-sm text-gray-600">
            {/* <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label> */}
              <Link
              to={"/agent/forgot-password"} className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
          type="submit"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            {isLoading ?"Processing...": "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/agent/registration"
            className="text-blue-500 hover:underline"
          >
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

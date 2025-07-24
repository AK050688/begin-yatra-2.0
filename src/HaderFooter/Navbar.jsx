import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("user in navbar", user);
  
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const navList = [
    { data: "Home", path: "/" },
    { data: "Contact Us", path: "/contact" },
    { data: "About Us", path: "/about" },
    { data: "Reviews", path: "/reviews" },
    { data: "Terms & Condition", path: "/terms&condition" },
    { data: "Privacy Policy", path: "/privacy&policy" },
  ];

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? isScrolled
        ? "text-blue-600 font-semibold border-b-2 border-blue-600"
        : "text-white font-semibold border-b-2 border-white"
      : isScrolled
      ? "text-gray-800 hover:text-blue-500 transition duration-200"
      : "text-white hover:text-blue-300 transition duration-200";

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-3 px-4 lg:px-12">
        {/* Logo */}
        <img src="/Logo/Logo.png" alt="Logo" className="w-24 md:w-32" />

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6">
          {navList.map((item, index) => (
            <NavLink
              onClick={() => window.scrollTo({ top: 0 })}
              key={index}
              to={item.path}
              className={navLinkStyle}
            >
              {item.data}
            </NavLink>
          ))}
        </div>

       

        {/* Agent Login Button */}
        {!user ? (
          <button
          onClick={() => navigate("/agent")}
          className={`hidden sm:inline-block px-4 py-2 border rounded-md transition duration-300 ${
            isScrolled
              ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              : "border-white text-white hover:bg-white hover:text-blue-600"
          }`}
        >
          Agent Login
        </button>
        ) : user?.role === "admin" ? (
            <div className="flex gap-4">
              <button
            onClick={() => navigate("/dashboard")}
              className={`hidden sm:inline-block px-4 py-2 border rounded-md transition duration-300
              ${isScrolled
                ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                : "border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              Dashboard
              </button>
        
              <button
                onClick={() => dispatch(logout())}
                className={`hidden sm:inline-block px-4 py-2 border rounded-md transition duration-300
                ${isScrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-blue-600"
                  }`}
              >
                Logout
              </button>
            
            </div>
        ) : (
              <div className="flex gap-4">
                <button
            onClick={() => navigate("/dashboard")}
            className={`hidden sm:inline-block px-4 py-2 border rounded-md transition duration-300
              ${isScrolled
                ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                : "border-white text-white hover:bg-white hover:text-blue-600"
              }`}
              >
                My Leads
              </button>
              
              <button
                onClick={() => dispatch(logout())}
                className={`hidden sm:inline-block px-4 py-2 border rounded-md transition duration-300
                ${isScrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-blue-600"
                  }`}
              >
                Logout
              </button>
          </div>
              
        )
          }
        

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={isScrolled ? "black" : "white"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h12M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 p-4 shadow rounded-box w-56 ${
              isScrolled ? "bg-white" : "bg-gray-900 text-white"
            }`}
          >
            {navList.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className={navLinkStyle}>
                  {item.data}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/agent")}
                className={`w-full mt-2 px-4 py-2 border rounded-md transition duration-300 ${
                  isScrolled
                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                Agent Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

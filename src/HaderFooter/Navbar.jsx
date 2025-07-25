import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu on navigation
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileMenuOpen]);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-3 px-4 lg:px-12">
        {/* Logo */}
        <img src="/Logo/Logo.png" alt="Logo" className="w-24 md:w-32 cursor-pointer" onClick={() => handleNavClick("/")} />

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 items-center">
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
          {/* Auth Buttons */}
          {!user ? (
            <button
              onClick={() => navigate("/agent")}
              className={`ml-4 px-4 py-2 border rounded-md transition duration-300 ${
                isScrolled
                  ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              Agent Login
            </button>
          ) : user?.role === "admin" ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={`ml-4 px-4 py-2 border rounded-md transition duration-300 ${
                  isScrolled
                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => dispatch(logout())}
                className={`ml-2 px-4 py-2 border rounded-md transition duration-300 ${
                  isScrolled
                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={`ml-4 px-4 py-2 border rounded-md transition duration-300 ${
                  isScrolled
                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                My Leads
              </button>
              <button
                onClick={() => dispatch(logout())}
                className={`ml-2 px-4 py-2 border rounded-md transition duration-300 ${
                  isScrolled
                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-blue-600"
                }`}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isScrolled ? "black" : "white"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={`fixed inset-0 z-50 bg-black/40 flex flex-col items-end lg:hidden`}>
            <div className={`w-64 bg-white h-full shadow-lg p-6 flex flex-col gap-4 animate-slide-in-right`}>
              <button
                className="self-end mb-4 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {navList.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 block py-2"
                      : "text-gray-800 hover:text-blue-500 transition duration-200 block py-2"
                  }
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.data}
                </NavLink>
              ))}
              {/* Auth Buttons */}
              {!user ? (
                <button
                  onClick={() => { handleNavClick("/agent"); }}
                  className="w-full mt-2 px-4 py-2 border rounded-md transition duration-300 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Agent Login
                </button>
              ) : user?.role === "admin" ? (
                <>
                  <button
                    onClick={() => handleNavClick("/dashboard")}
                    className="w-full mt-2 px-4 py-2 border rounded-md transition duration-300 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => { dispatch(logout()); setMobileMenuOpen(false); }}
                    className="w-full mt-2 px-4 py-2 border rounded-md transition duration-300 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick("/dashboard")}
                    className="w-full mt-2 px-4 py-2 border rounded-md transition duration-300 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    My Leads
                  </button>
                  <button
                    onClick={() => { dispatch(logout()); setMobileMenuOpen(false); }}
                    className="w-full mt-2 px-4 py-2 border rounded-md transition duration-300 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
            {/* Click outside to close */}
            <div className="flex-1 w-full" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

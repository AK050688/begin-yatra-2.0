import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigite=useNavigate()

  const navigateHandler =()=>navigite('/agent')
  const navList = [
    { data: "Home", path: "/" },
    { data: "Contact us", path: "/contact" },
    { data: "About us", path: "/about" },
    { data: "Reviews", path: "/reviews" },
    { data: "Terms & Condition", path: "/terms&condition" },
    { data: "Privacy Policy", path: "/privacy&policy" },
  ]

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#3b82f6] font-semibold border-b-2 border-[#3b82f6)]"
      : "text-gray-700 hover:text-blue-500 transition duration-200"

  return (
    <div className="navbar bg-white shadow-md px-4 lg:px-12">
      {/* Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            {navList.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path} className={navLinkStyle}>
                  {item.data}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <img src='/Logo/Logo.png' className="w-30"/>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {navList.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path} className={navLinkStyle}>
                {item.data}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* End */}
      <div className="navbar-end">
        <button onClick={navigateHandler} className="btn btn-outline border-[#3b82f6] text-[#3b82f6] hover:text-white hover:bg-[#3b82f6]">Agent Login</button>
      </div>
    </div>
  )
}

export default Navbar

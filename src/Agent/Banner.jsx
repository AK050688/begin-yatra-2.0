import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate=useNavigate()
  return (
     <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white pt-4 py-16 px-4 md:px-12 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <img src="/Logo/Logo.png" alt="logo" className='w-30 h-auto' />
          <div className="navbar-end">
        <button onClick={()=>navigate('/agent/login-agent')} className="btn btn-outline bg-white border-[#3b82f6] text-[#3b82f6] hover:text-white hover:bg-[#3b82f6]">Agent Login</button>
      </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 z-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
               100% Mobile Verified Leads
            </span>
            <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              ISO Certified
            </span>
            <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              TAAI Member
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Travel Leads Marketplace
          </h1>
          <p className="text-lg font-medium mb-6 leading-relaxed">
            Buy High-Quality, Verified Travel Leads & Boost your Travel Agency Business
          </p>

          <p className="text-sm text-gray-200 mb-6">
            Free Registration | Pay per Travel Lead | No Hidden Costs
          </p>

          {/* CTA */}
          <div className="flex gap-4">
          <button onClick={()=>navigate('/')} className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-md text-white font-semibold shadow">
           back 
          </button>
          <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-md text-white font-semibold shadow">
            Get Travel Leads
          </button></div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 z-10">
          <img
            src="/Images/laptop.svg"
            alt="Dashboard Screenshot"
            className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
          />
        </div>
      </div>

      
    
    </div>
  )
}

export default Banner
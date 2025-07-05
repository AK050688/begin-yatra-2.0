import React from 'react'

   const stats = [
  { icon: "/Icons/Aggents.png", value: "750+", label: "Verified Agents" },
  { icon: "/Icons/Aggents.png", value: "1,200+", label: "Happy Travellers" },
  { icon: "/Icons/Aggents.png", value: "300+", label: "Destinations" },
  { icon: "/Icons/Aggents.png", value: "Tripclap", label: "Verified" },

];
const PackageMarketplace = () => {
  return (
    <div>
     

 
    <div className="px-4 sm:px-8 md:px-12 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 text-center sm:text-left">
        <p className="text-2xl font-semibold">We're a growing tour package marketplace</p>
        <p className="text-2xl font-semibold text-blue-600">Safe, Secure & Trustworthy</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center bg-white rounded-lg shadow p-4">
            <img src={item.icon} alt={item.label} className="w-12 h-12 mb-2" />
            <span className="text-xl font-bold text-blue-700">{item.value}</span>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>

   


    </div>
  )
}

export default PackageMarketplace
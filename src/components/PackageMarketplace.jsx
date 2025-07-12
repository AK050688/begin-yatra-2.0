import React from 'react'

   const stats = [
  { icon: "/Icons/Aggents.png", value: "750+", label: "Verified Agents" },
  { icon: "/Icons/happytravel.png", value: "1,200+", label: "Happy Travellers" },
  { icon: "/Icons/location.png", value: "300+", label: "Destinations" },
  { icon: "/Icons/verified.png", value: "Begin Yatra", label: "Verified" },

];
const PackageMarketplace = () => {
  const placeByMonth =["Aug","Sep","Oct","Nov","Dec","Jan","Fab","Mar","Apr","May","Jun","Jul"]
  return (
    <div>
     
{/* Best places by month */}
<section className="px-4 md:px-12 py-10">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">
    Best places to visit in India by <span className='text-[#3b82f6]'> month</span>
  </h1>
  <div className="flex flex-wrap gap-3">
    {placeByMonth.map((data, index) => (
      <span
        key={index}
        className="rounded-full border border-gray-300 py-6 px-6 text-sm hover:bg-[#3b82f6] hover:text-white transition cursor-pointer"
      >
        {data}
      </span>
    ))}
  </div>
</section>
 
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
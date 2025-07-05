import React from 'react';
import { MapPin, Star } from 'lucide-react';
import Card from '../../components/card';

const packages = [
  {
    img: '/Images/goa.jpeg',
    title: '04 Nights / 05 Days Goa Tour With Dudhsagar Waterfall...',
    location: 'Goa',
    duration: '4 Nights / 5 Days',
    price: 6700,
    rating: 4.3,
    reviews: 106,
  },
  {
    img: '/Images/bali.jpg',
    title: 'Experience Bali in 6 Nights of Tropical Beauty & Adventures!',
    location: 'Kuta, Ubud',
    duration: '6 Nights / 7 Days',
    price: 28500,
    rating: 5.0,
    reviews: 9,
  },
  {
    img: '/Images/sikkim.jpg',
    title: 'Gangtok Sikkim Package 4 N 5 D - (RATES APPLICABLE...)',
    location: 'Sikkim',
    duration: '4 Nights / 5 Days',
    price: 37500,
    rating: 4.5,
    reviews: 22,
  },
];


const StoriesData=[
  {
    img:"/Images/goa.jpeg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },
  {
    img:"/Images/goa.jpeg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },  
  {
    img:"/Images/goa.jpeg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },
    {
    img:"/Images/goa.jpeg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },
]
const placeByMonth =["Aug","Sep","Oct","Nov","Dec","Jan","Fab","Mar","Apr","May","Jun","Jul"]
const TrendingPackages = () => {
  return (
    <>
   <section className="px-4 md:px-12 py-10 bg-white">
  {/* Header */}
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
    <span className="text-[#3b82f6]">Trending Tour Packages</span> on Tripclap
  </h2>

  {/* Tour Packages */}
  <div className="flex gap-6 overflow-x-auto pb-4">
    {packages.map((pkg, index) => (
      <div
        key={index}
        className="min-w-[280px] sm:min-w-[320px] w-[280px] sm:w-[320px] bg-white shadow-lg rounded-lg border border-gray-200 flex-shrink-0"
      >
        <img
          src={pkg.img}
          alt={pkg.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug">{pkg.title}</h3>
          <div className="flex items-center text-gray-500 text-sm gap-1">
            <MapPin className="w-4 h-4" />
            {pkg.location}
          </div>
          <p className="text-gray-600 text-sm">{pkg.duration}</p>
          <div className="text-sm">
            <p className="text-green-600 font-bold text-lg">₹ {pkg.price.toLocaleString()}</p>
            <p className="text-xs text-gray-400">*Excluding Applicable Taxes</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-gray-700 font-medium">{pkg.rating}</span>
            <span className="text-gray-400">({pkg.reviews} Reviews)</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 bg-[#3b82f6] hover:bg-[#3b83f698] text-white text-sm py-2 rounded-md">
              Get Quotes
            </button>
            <button className="flex-1 border border-gray-300 text-sm text-gray-700 py-2 rounded-md hover:bg-gray-50">
              View Details
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Trending Stories */}
<section className="px-4 md:px-12 py-10">
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
    <span>Our Trending </span>
    <span className="text-[#3b82f6]">Stories </span> on Tripclap
  </h2>

  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left: Main image */}
    <img
      src="/Images/img.webp"
      alt="img"
      className="w-full lg:w-1/2 h-64 sm:h-96 lg:h-auto object-cover rounded-lg"
    />

    {/* Right: Stories */}
    <div className="flex flex-col gap-4 w-full">
      {StoriesData.map((data, index) => (
        <div key={index} className="flex bg-white shadow-sm rounded-lg overflow-hidden">
          <img src={data.img} alt="Story" className="h-36 w-36 object-cover" />
          <div className="p-4 flex flex-col justify-between">
            <h2 className="text-md font-semibold">{data.reviews}</h2>
            <p className="text-sm text-gray-600">Number of viewers: <span className="font-medium">{data.numOfView}</span></p>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-2">
        <button className="text-sm text-[#3b82f6] underline">View more story</button>
      </div>
    </div>
  </div>
</section>

{/* Top Countries */}
<section className="px-4 md:px-12 py-10">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">
    Top <span className="text-[#3b82f6]">Countries</span> you can explore
  </h1>
  <Card />
</section>

{/* Best places by month */}
<section className="px-4 md:px-12 py-10">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">
    Best places to visit in India by month
  </h1>
  <div className="flex flex-wrap gap-3">
    {placeByMonth.map((data, index) => (
      <span
        key={index}
        className="rounded-full border border-gray-300 py-2 px-4 text-sm hover:bg-[#3b82f6] hover:text-white transition cursor-pointer"
      >
        {data}
      </span>
    ))}
  </div>
</section>

    </>
  );
};

export default TrendingPackages;
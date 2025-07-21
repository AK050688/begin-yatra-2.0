import React from 'react';
import { MapPin, Star } from 'lucide-react';
import Card from '../../components/PopularPackages';

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
    img: '/Images/rajastan.png',
    title: 'Experience Bali in 6 Nights of Tropical Beauty & Adventures!',
    location: 'Kuta, Ubud',
    duration: '6 Nights / 7 Days',
    price: 28500,
    rating: 5.0,
    reviews: 9,
  },
   {
    img: '/Images/rajastan.png',
    title: 'Experience Bali in 6 Nights of Tropical Beauty & Adventures!',
    location: 'Kuta, Ubud',
    duration: '6 Nights / 7 Days',
    price: 28500,
    rating: 5.0,
    reviews: 9,
  },
  
  {
    img: '/Images/kashmir.jpg',
    title: 'Gangtok Sikkim Package 4 N 5 D - (RATES APPLICABLE...)',
    location: 'Sikkim',
    duration: '4 Nights / 5 Days',
    price: 37500,
    rating: 4.5,
    reviews: 22,
  },
];



const TrendingPackages = () => {
  return (
    <>
   <section className="px-4 md:px-12 py-10 bg-white">

  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
  Trending Tour Packages <span className="text-[#3b82f6]">on Begin Yatra</span>   
  </h2>

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



    </>
  );
};

export default TrendingPackages;
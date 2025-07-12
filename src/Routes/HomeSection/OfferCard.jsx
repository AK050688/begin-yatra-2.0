import React from "react";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    id: 1,
    title: "Summer Special: Goa",
    description: "Book now and get 20% off on beachside resorts!",
    discount: "20% OFF",
    image: "/Images/offer.webp",
  },
  {
    id: 2,
    title: "Romantic Paris Escape",
    description: "Valentine’s week deal on Paris honeymoon packages.",
    discount: "Flat ₹10,000 OFF",
    image: "/Images/offer.webp",
  },
  {
    id: 3,
    title: "Adventure in the Alps",
    description: "Save big on Switzerland adventure tour packages.",
    discount: "Save ₹7,500",
    image: "/Images/offer.webp",
  },
];

const OfferCards = () => {
  const navigate=useNavigate()
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
         Limited-Time <span className="text-[#3b82f6]"> Offers</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                {offer.discount}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{offer.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
              <button onClick={()=>navigate('/get-quote')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                Enquiry →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferCards;
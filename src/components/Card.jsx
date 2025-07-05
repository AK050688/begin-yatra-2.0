import React from 'react'

const Card = () => {

    
const cardData = [
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
  {
    img: "/Images/goa.jpeg",
    place: "Goa",
    price: 57758,
  },
];
  return (
    <div>
              {/* Cards Grid */}
<div className="overflow-x-auto px-4">
  <div className="flex space-x-6 min-w-max">
    {cardData.map((card, index) => (
      <div
        key={index}
        className="min-w-[250px] bg-white/70 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all transform hover:-translate-y-1 hover:scale-[1.02]"
      >
        <div className="relative">
          <img
            src={card.img}
            alt={card.place}
            className="w-full h-48 object-cover"
          />
          {/* <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-md">
            Featured
          </span> */}
        </div>

        <div className="p-5 space-y-2">
          <h4 className="text-xl font-bold text-gray-800">{card.place}</h4>
          <p className="text-sm text-gray-500">Starting from</p>
          <p className="text-xl text-green-600 font-bold">₹{card.price}</p>

          <button className="mt-3 w-full cursor-pointer px-4 py-2 bg-[#3b82f6] text-white font-semibold rounded-md hover:bg-[#3b83f6ab] transition-all">
            Book Now
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  )
}

export default Card
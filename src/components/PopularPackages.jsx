import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useNavigation } from "react-router-dom";

const PopularPackages = () => {
  const cardData = [
    {
      img: "/Images/rajastan.png",
      place: "Goa",
      price: 57758,
      description: "Beaches & Nightlife",
    },
    {
      img: "/Images/Andaman.jpg",
      place: "Kerala",
      price: 62499,
      description: "Backwaters & Serenity",
    },
    {
      img: "/Images/kashmir.jpg",
      place: "Manali",
      price: 48999,
      description: "Mountains & Adventure",
    },
    {
      img: "/Images/rajastan.png",
      place: "Rajasthan",
      price: 72999,
      description: "Forts & Culture",
    },
    {
      img: "/Images/kashmir.jpg",
      place: "Kashmir",
      price: 81999,
      description: "Valleys & Snow",
    },
    {
      img: "/Images/Andaman.jpg",
      place: "Andaman",
      price: 65999,
      description: "Islands & Diving",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="py-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-full mx-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 ">
          Popular Travel <span className="text-[#3b82f6]"> Destination</span>
        </h2>

        <Slider {...settings}>
          {cardData.map((card, index) => (
            <div key={index} className="px-2">
              <div
                onClick={() => navigate("/destination")}
                className="relative hover:scale-105 cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={card.img}
                  alt={card.place}
                  className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"
                />
                {/* Text over image */}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold">{card.place}</h4>
                  <p className="text-sm">{card.description}</p>
                  <p className="text-xs opacity-80">Starting from</p>
                  <p className="text-lg font-semibold text-green-300">
                    ₹{card.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularPackages;

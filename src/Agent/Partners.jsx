import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api, { imgApi } from "../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/userSlice";


const Partners = () => {
  const [partners, setPartners] = useState([]);
 
  console.log("partners",partners);
  
const token = useSelector(selectAccessToken);
  // Fetch all partners
  const fetchPartners = async (name = "") => {
    try {
       // Retrieve token from auth utility
      const response = await api.get(
        `/api/leads/getAllpartners${name ? `?name=${name}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetchPartners", response);
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        setPartners(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners();
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Sample about data (since it wasn't provided)
  const about = [
    { num: "50+", text: "Years Experience" },
    { num: "100+", text: "Partners" },
    { num: "1M+", text: "Travelers Served" },
  ];

  return (
    <div className="bg-gray-50 py-14 px-4">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
        Partners Who Take Travel Leads
      </h1>

      {/* Brand Cards Carousel */}
      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          { partners.map((brand) => (
            <>
              {brand?.isListed &&  (<>
                <div
              key={brand?._id}
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 mx-2"
            >
              <img
                src={imgApi+brand.image}
                alt={brand.name}
                className="w-full h-30  object-contain mb-3"
              />
              <p className="text-gray-700 font-semibold text-center">
                {brand.name}
              </p>
            </div>
              </>)}
            </>
          ))}
        </Slider>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Cool Facts About Us
        </h4>
        <p className="text-gray-600 leading-relaxed mb-10">
          Our team has more than 50 years of experience in running a travel
          marketplace and CRM. We've started fresh to create an ecosystem where
          all travel companies can come together & help each other.
        </p>

        {/* About Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {about.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-40 h-28 bg-gradient-to-b from-blue-500 to-sky-200 rounded-2xl text-white shadow-md"
            >
              <p className="text-xl font-bold">{item.num}</p>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
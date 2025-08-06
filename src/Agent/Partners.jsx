import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/userSlice";
import api, { imgApi } from "../Api/ApiService";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const scrollRef = useRef(null);
  const token = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(false)
  // Fetch all partners
  const fetchPartners = async (name = "") => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/leads/getAllpartners${name ? `?name=${name}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        setPartners(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    <div className="flex justify-center items-center h-32">
  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>
  }

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners();
  }, []);

  // Scroll handling
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Sample about data
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

      {/* Brand Cards with Navigation */}
      <div className="max-w-5xl mx-auto relative">
        <div className="flex items-center gap-4">
          <button
            onClick={scrollLeft}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-4 pb-4 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {partners.map((brand) =>
              brand?.isListed ? (
                <div
                  key={brand?._id}
                  className="flex-shrink-0 w-64 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <img
                    src={imgApi + brand.image}
                    alt={brand.name}
                    className="w-full h-32 object-contain mb-4 rounded-md"
                  />
                  <p className="text-gray-800 font-semibold text-center text-lg truncate">
                    {brand.name}
                  </p>
                </div>
              ) : null
            )}
          </div>

          <button
            onClick={scrollRight}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
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
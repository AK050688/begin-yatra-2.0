import React from "react";
import PopularPackages from "../../components/PopularPackages";
import { useNavigate } from "react-router-dom";

const StoriesData = [
  {
    img: "/Images/kashmir1.jpeg",
    reviews: "Top 10 Thins to do in Kashmir",
    Description:
      "Visit Srinagar Dal Lake and Mughal Gardens Ski in Gulmarg and ride the worlds highest cable car Trek in Sonamarg and discover scenic valleys Seek blessings at Vaishno Devi pilgrimage site Enjoy scenic views and adventure activities in Pahalgam",
    // numOfView: 325,
  },
  {
    img: "/Images/Shimla.jpeg",
    reviews: "Top 10 Thins to do in Shimla",
    Description:
      "Explore Shimla's Mall Road and Christ Church Visit Manalis Hadimba Devi Temple and Solang Valley Enjoy trekking, skiing, and adventure sports Take in scenic views from Jakhu Hill and Rohtang Pass Relax in nature's lap amidst pine and cedar forests",
    // numOfView: 135,
  },
  {
    img: "/Images/Dubai.jpeg",
    reviews: "Top 10 Thins to do in Dubai",
    Description:
      "Marvel at Burj Khalifa's towering grandeur Explore Dubai Mall's vast shopping paradise Visit iconic Palm Jumeirah and Atlantis Aquaventure Desert safaris and camel rides for thrilling adventures Gold Souk and spice markets for unique shopping",
    // numOfView: 595,
  },
  {
    img: "/Images/Gangtok.jpeg",
    reviews: "Top 10 Thins to do in Gangtok",
    Description:
      "Visit Darjeeling's iconic toy train and tea gardens Explore Gangtok's Rumtek Monastery and Tsomgo Lake Enjoy Kanchenjunga views from Tiger Hill Trek to Singalila Ridge and experience scenic trails Visit Darjeeling's night markets and savor local cuisine",
    // numOfView: 315,
  },
];

const TrandingStories = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Trending Stories */}
      <section className="px-4 md:px-12 py-10 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          <span>Our Trending </span>
          Stories on<span className="text-[#3b82f6]"> Begin Yatra </span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src="/Images/img.webp"
            alt="img"
            className="w-full lg:w-1/2 h-64 sm:h-96 lg:h-auto object-cover rounded-lg"
          />

          <div className="flex flex-col gap-4 w-full">
            {StoriesData.map((data, index) => (
              <div
                key={index}
                onClick={() => navigate("/get-qurey")}
                className="flex bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={data.img}
                  alt="Story"
                  className="h-36 w-36 object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <h2 className="text-md text-black font-semibold">
                    {data.reviews}
                  </h2>
                  <p className="text-sm text-gray-600">{data.Description}</p>
                  {/* <p className="text-sm text-gray-600">
                    Number of viewers:{" "}
                    <span className="font-medium">{data.numOfView}</span>
                  </p> */}
                </div>
              </div>
            ))}
            {/* <div className="flex justify-end mt-2">
        <button className="text-sm text-[#3b82f6] underline">View more story</button>
      </div> */}
          </div>
        </div>
      </section>

      {/* Top Countries */}
      {/* <section className="px-4 md:px-12 py-10">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">
    Top <span className="text-[#3b82f6]">Countries</span> you can explore
  </h1>
  <PopularPackages/>
</section> */}
    </div>
  );
};

export default TrandingStories;

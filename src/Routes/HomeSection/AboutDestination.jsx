import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { destinations } from "./TopDestionation";
import TopCountries from "./TopCountries";
import api  from "../../Api/ApiService";

const AboutDestination = () => {
  const { id, name } = useParams();
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const res = await api.get(`/api/destination/getDestinationById/${id}`);
          console.log("res destination ",res);
          
          if (res.data && res.data.data) {
            setDestinationData(res.data.data);
          } else {
            setDestinationData(null);
          }
        } catch (err) {
          setError("Failed to fetch destination");
          setDestinationData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDestination();
  }, [id]);

  // Fallback to static data if no API data
  let data = destinationData;
  if (!data) {
    data = destinations.find((item) => item.id === id) || { name: name };
  }

  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return '/Images/kashmir.jpg'; // Default image
    }
    // If the image path is already a full URL, return it as is
    if (Array.isArray(images)) {
      if (images[0].startsWith('http://') || images[0].startsWith('https://')) {
        return images[0];
      }
      if (images[0].startsWith('/')) {
        return `https://begin-yatra-nq40.onrender.com/public/temp${images[0]}`;
      }
      return `https://begin-yatra-nq40.onrender.com/public/temp/${images[0]}`;
    } else {
      if (images.startsWith('http://') || images.startsWith('https://')) {
        return images;
      }
      if (images.startsWith('/')) {
        return `https://begin-yatra-nq40.onrender.com/public/temp${images}`;
      }
      return `https://begin-yatra-nq40.onrender.com/public/temp/${images}`;
    }
  };

  // Get package information
  const getPackageInfo = () => {
    if (data.packageId && data.packageId.length > 0) {
      const packageData = data.packageId[0];
      return {
        price: packageData.packagePrice,
        duration: packageData.totalDaysNight,
        theme: packageData.theme
      };
    }
    return {
      price: "1000 to 34000",
      duration: "1 to 3 days",
      theme: "Adventure"
    };
  };

  const packageInfo = getPackageInfo();

  // Function to capitalize first letter of destination name
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const navigate = useNavigate();
  if (loading) return <div className="p-10 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-10 text-center text-gray-500">Destination not found.</div>;

  return (
    <div>
      <section>
        <div className="flex gap-4 mx-20 pt-10">
          <div className="w-1/2">
            <img src={getImageUrl(data.destinationImage)} alt="image" />
          </div>
                     <div className="mx-10 w-1/2">
             <h1 className="font-medium pl-4 text-4xl">{capitalizeFirstLetter(data.destinationName || data.name)}</h1>
             <h1 className="flex items-center gap-2 pl-4">
               <IoLocation className="" />
               {capitalizeFirstLetter(data.destinationName || data.name)}
             </h1>
            <div className="grid grid-cols-2 gap-8 p-5 ">
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Package" <br />
                <span>
                  <strong>₹{packageInfo.price}</strong>
                </span>
              </div>
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Duration" <br />
                <span>
                  <strong>{packageInfo.duration}</strong>
                </span>
              </div>
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Best Time to Visit" <br />
                <span>
                  <strong>Oct to Nov</strong>
                </span>
              </div>
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Theme" <br />
                <span>
                  <strong>{packageInfo.theme}</strong>
                </span>
              </div>
            </div>
            <button
              className="btn bg-blue-500 w-50 p-5 mx-10 rounded-2xl text-white"
              onClick={() => navigate("/get-qurey")}
            >
              Explore
            </button>
          </div>
        </div>
      </section>
      <section>
                 <div className="">
           <h1 className="font-medium pt-5 text-3xl mx-20">
             {capitalizeFirstLetter(data.destinationName || data.name)} <span className="text-sky-500">Tour Guide</span>
           </h1>
          <p className="mx-20 pt-3">
            {data.tourGuide || data.description || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            corporis eaque veniam praesentium provident libero, quisquam cum
            fugiat harum totam voluptas odit eum sint sit eos fugit, possimus
            ipsa, vel asperiores. Itaque dicta velit ullam veritatis nam, dolor
            fugiat reprehenderit hic, expedita totam temporibus quod delectus
            aliquid. Vitae, libero aliquam reprehenderit itaque doloremque porro
            ullam magnam molestias placeat tempora eos eaque aperiam. Quia unde
            est placeat ea corporis. Nam harum officiis magnam ex porro numquam
            soluta nostrum.`}
          </p>

                     <ol className=" pt-8 list-decimal">
             <p className="mx-18 text-2xl">
               <span className="text-sky-600">Top Attractions</span> in{" "}
               {capitalizeFirstLetter(data.destinationName || data.name)}
             </p>
            {data.topAttraction ? (
              <li className="mx-25 pt-3">{data.topAttraction}</li>
            ) : (
              <>
                <li className="mx-25 pt-3">Coringa Wildlife Sanctuary.</li>
                <li className="mx-25">Hope Island.</li>
                <li className="mx-25">Kashmir Beach.</li>
                <li className="mx-25">Dolphine Nose.</li>
                <li className="mx-25">Patnitop.</li>
              </>
            )}
          </ol>
                     <h3 className="mx-20 pt-5 text-2xl">
             {capitalizeFirstLetter(data.destinationName || data.name)} is <span className="text-sky-600">Famous for</span>
           </h3>
          <p className="mx-20">
            {data.famousFor || "its stunning natural beauty, including picturesque valleys, serene lakes, and snow-capped mountains."}
          </p>

                     <ul className=" pt-8 list-disc">
             <p className="mx-18 text-2xl">
               <span className="text-sky-600">What's Great</span> about{" "}
               {capitalizeFirstLetter(data.destinationName || data.name)}?
             </p>
            {data.whatsGreat ? (
              <li className="mx-25 pt-3">{data.whatsGreat}</li>
            ) : (
              <>
                <li className="mx-25 pt-3">Stunning natural beauty.</li>
                <li className="mx-25">Snow-capped Mountains.</li>
                <li className="mx-25">Unique Seasons.</li>
                <li className="mx-25">Stunning Landscapes.</li>
                <li className="mx-25">Serene Lakes.</li>
              </>
            )}
          </ul>
                     <ul className=" pt-8 list-disc">
             <p className="mx-18 text-2xl">
               Cultural Experiences in
               <span className="text-sky-600"> {capitalizeFirstLetter(data.destinationName || data.name)}?</span>
             </p>
            {data.culturalExperiences ? (
              <li className="mx-25 pt-3">{data.culturalExperiences}</li>
            ) : (
              <>
                <li className="mx-25 pt-3">Rich Handicrafts.</li>
                <li className="mx-25">Delicious Cuisine.</li>
                <li className="mx-25">Spiritual Sites.</li>
                <li className="mx-25">Friendly Locals.</li>
                <li className="mx-25">Paradise on Earth.</li>
              </>
            )}
          </ul>
                     <ul className=" pt-8 list-disc">
             <p className="mx-18 text-2xl">
               Tips for
               <span className="text-sky-600"> {capitalizeFirstLetter(data.destinationName || data.name)}</span>
             </p>
            {data.Tips ? (
              <li className="mx-25 pt-3">{data.Tips}</li>
            ) : (
              <>
                <li className="mx-25 pt-3">
                  Know When To Visit Kashmir As Per Weather.
                </li>
                <li className="mx-25">Carry All Your Necessary Documents Along.</li>
                <li className="mx-25"> Travel Light While Visiting Kashmir.</li>
                <li className="mx-25">Take Necessary Medicines Along.</li>
                <li className="mx-25">Have Knowledge About The Currency.</li>
              </>
            )}
          </ul>
          <ul className=" pt-8 list-disc">
            <p className="mx-18 text-2xl">
              Important Information
              <span className="text-sky-600"> About Trip</span>
            </p>
            {data.importantInformation && data.importantInformation.length > 0 ? (
              data.importantInformation.map((info, index) => (
                <li key={index} className="mx-25 pt-3">{info}</li>
              ))
            ) : (
              <>
                <li className="mx-25 pt-3">
                  <strong>Ideal Duration:</strong>3-4 days.
                </li>
                <li className="mx-25">
                  <strong>Best Time To Visit:</strong>Sep to Jan.
                </li>
                <li className="mx-25">
                  <strong>Nearest Airport:</strong>Sheikh ul-Alam International
                  Airport (Srinagar Airport).
                </li>
              </>
            )}
          </ul>
          <div>
            <p className="mx-18 text-2xl pt-8">
              Top <span className="text-sky-600"> Places</span> to visit in{" "}
              <span className="text-sky-600">{capitalizeFirstLetter(data.destinationName || data.name)}</span>
            </p>
            <div className="grid grid-cols-3 gap-2 p-5 w-250 mx-20">
              {data.topPlaces && data.topPlaces.length > 0 ? (
                data.topPlaces.slice(0, 6).map((place, index) => (
                  <div key={index}  onClick={()=> navigate(`/get-qurey`)} className="cursor-pointer text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>{place}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="pt-5 text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>Gulmarg</p>
                  </div>
                  <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>Pahalgam</p>
                  </div>
                  <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>Shrinagar</p>
                  </div>
                  <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>Dal Lake</p>
                  </div>
                  <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>Nigeen Lake</p>
                  </div>
                  <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                    <img src="/Images/moreplace.png" alt="More Place" />
                    <p>Patnitop</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDestination;

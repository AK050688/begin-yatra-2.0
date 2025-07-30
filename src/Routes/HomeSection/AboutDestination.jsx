import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/ApiService";

const AboutDestination = () => {
  const { id, name } = useParams();
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestination = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const res = await api.get(`/api/destination/getDestinationById/${id}`);
          console.log("Destination ??????",res);
          
          if (res.data && res.data.data) {
            setDestinationData(res.data.data);
          } else {
            setDestinationData(null);
          }
        } catch (err) {
          setError("Failed to fetch destination");
          setDestinationData(null);
          console.error(err);
          
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDestination();
  }, [id]);

  // Fallback to minimal data if no API data
  let data = destinationData || { name: name || "Unknown Destination" };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return '/Images/default.jpg'; // Default image
    }
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

  const getPackageInfo = () => {
    if (data.packageId && data.packageId.length > 0) {
      const packageData = data.packageId[0];
      return {
        price: packageData.packagePrice,
        duration: packageData.totalDaysNight,
        theme: packageData.theme,
        summary: packageData.packageSummery || []
      };
    }
    return {
      price: "N/A",
      duration: "N/A",
      theme: "N/A",
      summary: []
    };
  };

  const packageInfo = getPackageInfo();

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-6 text-center text-gray-500">Destination not found.</div>;

  return (
    <div className=" mx-auto  px-8 lg:px-16 md:px-10 py-8 bg-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-12">
        <div className="w-full lg:w-1/2">
          <img 
            src={getImageUrl(data.destinationImage)} 
            alt={data.destinationName || data.name} 
            className="w-full h-auto rounded-lg object-cover max-h-[500px]"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl text-blue-500 lg:text-4xl font-semibold mb-2">
              {capitalizeFirstLetter(data.destinationName || data.name)}
            </h1>
            <h2 className="flex items-center gap-2 text-lg sm:text-xl text-gray-600 mb-6">
              <IoLocation className="text-blue-500" />
              {capitalizeFirstLetter(data.destinationName || data.name)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Package", value: `₹${packageInfo.price}` },
                { label: "Duration", value: packageInfo.duration },
                { label: "Best Time to Visit", value: data.importantInformation?.[0]?.includes("Best Time") ? data.importantInformation[0].match(/Best Time To Visit: ([^.+]+)/)?.[1] || "N/A" : "N/A" },
                { label: "Theme", value: packageInfo.theme }
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center p-4 border border-gray-200 rounded-lg shadow-md"
                >
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="font-semibold text-blue-500">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition w-full sm:w-auto"
            onClick={() => navigate("/get-qurey")}
          >
            Explore
          </button>
        </div>
      </section>

      {/* Details Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl text-blue-500  font-semibold mb-4">
            {capitalizeFirstLetter(data.destinationName || data.name)} 
            <span className=" text-black"> Tour Guide</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.tourGuide || "No tour guide information available."}
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl text-blue-600 font-semibold mb-3">
            <span className="text-black">Package Itinerary</span> for{" "}
            {capitalizeFirstLetter(data.destinationName || data.name)}
          </h3>
          <div className="space-y-4">
            {packageInfo.summary.length > 0 ? (
              packageInfo.summary.map((day, index) => (
                <div 
                  key={day._id} 
                  className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{day.day}</h4>
                    <p className="text-gray-700">{day.about}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No itinerary available.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            <span className="text-blue-600">Top Attractions</span> in{" "}
            {capitalizeFirstLetter(data.destinationName || data.name)}
          </h3>
          <ol className="list-decimal text-black pl-6 space-y-2">
            {data.topAttraction ? (
              <li>{data.topAttraction}</li>
            ) : (
              <li>No top attractions available.</li>
            )}
          </ol>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            {capitalizeFirstLetter(data.destinationName || data.name)} is 
            <span className="text-blue-600"> Famous for</span>
          </h3>
          <p className="text-gray-700">
            {data.famousFor || "No information available."}
          </p>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            <span className="text-blue-600">What's Great</span> about{" "}
            {capitalizeFirstLetter(data.destinationName || data.name)}?
          </h3>
          <ul className="list-disc text-black  pl-6 space-y-2">
            {data.whatsGreat ? (
              <li>{data.whatsGreat}</li>
            ) : (
              <li>No information available.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            Cultural Experiences in
            <span className="text-blue-600"> {capitalizeFirstLetter(data.destinationName || data.name)}</span>
          </h3>
          <ul className="list-disc text-black pl-6 space-y-2">
            {data.culturalExperiences ? (
              <li>{data.culturalExperiences}</li>
            ) : (
              <li>No cultural experiences available.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            Tips for
            <span className="text-blue-600"> {capitalizeFirstLetter(data.destinationName || data.name)}</span>
          </h3>
          <ul className="list-disc text-black pl-6 space-y-2">
            {data.Tips ? (
              <li>{data.Tips}</li>
            ) : (
              <li>No tips available.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            Important Information
            <span className="text-blue-600"> About Trip</span>
          </h3>
          <ul className="list-disc pl-6 text-black space-y-2">
            {data.importantInformation && data.importantInformation.length > 0 ? (
              data.importantInformation.map((info, index) => (
                <li key={index}>{info}</li>
              ))
            ) : (
              <li>No important information available.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-black sm:text-2xl font-semibold mb-3">
            Top <span className="text-blue-600">Places</span> to visit in{" "}
            {capitalizeFirstLetter(data.destinationName || data.name)}
          </h3>
          <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.topPlaces && data.topPlaces.length > 0 ? (
              data.topPlaces.slice(0, 6).map((place, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate("/get-qurey")} 
                  className="cursor-pointer border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <img 
                    src="/Images/moreplace.png" 
                    alt={place} 
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <p className="text-center font-medium">{place}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No top places available.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDestination;

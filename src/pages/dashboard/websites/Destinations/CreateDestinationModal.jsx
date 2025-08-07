import React, { useState, useRef } from "react";
import api from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import { toast } from "react-toastify";

const CreateDestinationModal = ({
  show,
  onClose,
  places,
  packages,
  onDestinationCreated,
  onOpenAddPlace,
}) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [topAttraction, setTopAttraction] = useState("");
  const [whatsGreat, setWhatsGreat] = useState("");
  const [tourGuide, setTourGuide] = useState("");
  const [famousFor, setFamousFor] = useState("");
  const [culturalExperiences, setCulturalExperiences] = useState("");
  const [tips, setTips] = useState("");
  const [importantInformation, setImportantInformation] = useState([""]);
  const [topPlaces, setTopPlaces] = useState([""]);
  const [destinationType, setDestinationType] = useState("domestic");
  const destinationImageRef = useRef();
  const placesImagesRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isPopularDestination, setIsPopularDestination] = useState(false);
  const [isTrandingDestination, setIsTrandingDestination] = useState(false);

  // Handle multiple input fields
  const handleMultiInputChange = (setter, values, idx, value) => {
    const newArr = [...values];
    newArr[idx] = value;
    setter(newArr);
  };

  const handleAddField = (setter, values) => setter([...values, ""]);
  const handleRemoveField = (setter, values, idx) =>
    setter(values.filter((_, i) => i !== idx));

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("places", JSON.stringify(selectedPlaces));
      formData.append("topAttraction", topAttraction);
      formData.append("whatsGreat", whatsGreat);
      formData.append("tourGuide", tourGuide);
      formData.append("famousFor", famousFor);
      formData.append("culturalExperiences", culturalExperiences);
      formData.append("Tips", tips);
      formData.append(
        "importantInformation",
        JSON.stringify(importantInformation.filter(Boolean))
      );
      formData.append("topPlaces", JSON.stringify(topPlaces.filter(Boolean)));
      formData.append("destinationType", destinationType);
      formData.append("destinationName", destinationName);
      formData.append("packageId", JSON.stringify(selectedPackages));
      formData.append("isPopularDestination", isPopularDestination);
      formData.append("isTrandingDestination", isTrandingDestination);

      // Handle destination images
      if (destinationImageRef.current?.files && destinationImageRef.current.files.length > 0) {
        Array.from(destinationImageRef.current.files).forEach((file) => {
          formData.append("destinationImage", file);
        });
      }

      // Handle places images (if needed by backend)
      if (placesImagesRef.current?.files && placesImagesRef.current.files.length > 0) {
        Array.from(placesImagesRef.current.files).forEach((file) => {
          formData.append("placesImages", file);
        });
      }

      const res = await api.post("/api/destination", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
        toast.success("Destination created successfully!");
        setMessage("Destination created successfully!");
        if (onDestinationCreated) onDestinationCreated();
        onClose();
      } else {
        setMessage("Failed to create destination.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Create Destination</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Destination Name: <span className="text-red-500">*</span>
              <input
                type="text"
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </label>
            <label>
              Destination Type:<span className="text-red-500">*</span>
              <select
                required
                value={destinationType}
                onChange={(e) => setDestinationType(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Places:<span className="text-red-500">*</span>
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-full max-h-28 overflow-y-auto border rounded p-2">
                  {places.map((place) => (
                    <label
                      key={place.id || place._id}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        value={place.id || place._id}
                        checked={selectedPlaces.includes(place.id || place._id)}
                        onChange={(e) => {
                          const value = place.id || place._id;
                          setSelectedPlaces((prev) =>
                            e.target.checked
                              ? [...prev, value]
                              : prev.filter((p) => p !== value)
                          );
                        }}
                      />
                      <span>{place.name || place.placeName}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-2 py-1 rounded h-fit"
                  onClick={onOpenAddPlace}
                >
                  + Add Place
                </button>
              </div>
            </label>
          </div>
          <div>
            <label>
              Packages:
              <div className="flex flex-col gap-1 w-full max-h-28 overflow-y-auto border rounded p-2">
                {packages.map((pkg) => (
                  <label
                    key={pkg.id || pkg._id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={pkg.id || pkg._id}
                      checked={selectedPackages.includes(pkg.id || pkg._id)}
                      onChange={(e) => {
                        const value = pkg.id || pkg._id;
                        setSelectedPackages((prev) =>
                          e.target.checked
                            ? [...prev, value]
                            : prev.filter((p) => p !== value)
                        );
                      }}
                    />
                    <span>{pkg.name || pkg.packageName}</span>
                  </label>
                ))}
              </div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Top Attraction:<span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={topAttraction}
                onChange={(e) => setTopAttraction(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              What's Great:<span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={whatsGreat}
                onChange={(e) => setWhatsGreat(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Tour Guide:<span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={tourGuide}
                onChange={(e) => setTourGuide(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Famous For:<span className="text-red-500">*</span>
              <input
                required
                type="text"
                value={famousFor}
                onChange={(e) => setFamousFor(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Cultural Experiences:<span className="text-red-500">*</span>
              <input
                type="text"
                value={culturalExperiences}
                onChange={(e) => setCulturalExperiences(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </label>
            <label>
              Tips:<span className="text-red-500">*</span>
              <input
                type="text"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Important Information:<span className="text-red-500">*</span>
              {importantInformation.map((info, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    type="text"
                    value={info}
                    onChange={(e) =>
                      handleMultiInputChange(
                        setImportantInformation,
                        importantInformation,
                        idx,
                        e.target.value
                      )
                    }
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveField(
                        setImportantInformation,
                        importantInformation,
                        idx
                      )
                    }
                    disabled={importantInformation.length === 1}
                    className="px-2"
                  >
                    -
                  </button>
                  {idx === importantInformation.length - 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleAddField(
                          setImportantInformation,
                          importantInformation
                        )
                      }
                      className="px-2"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </label>
          </div>
          <div>
            <label>
              Top Places:<span className="text-red-500">*</span>
              {topPlaces.map((place, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    type="text"
                    value={place}
                    onChange={(e) =>
                      handleMultiInputChange(
                        setTopPlaces,
                        topPlaces,
                        idx,
                        e.target.value
                      )
                    }
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveField(setTopPlaces, topPlaces, idx)
                    }
                    disabled={topPlaces.length === 1}
                    className="px-2"
                  >
                    -
                  </button>
                  {idx === topPlaces.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleAddField(setTopPlaces, topPlaces)}
                      className="px-2"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </label>
          </div>
          <div>
            <label>
              Destination Images:<span className="text-red-500">*</span>
              <input
                type="file"
                required
                ref={destinationImageRef}
                multiple
                accept="image/*"
                className="w-full"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPopularDestination}
                onChange={(e) => setIsPopularDestination(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
              />
              Popular Destination
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isTrandingDestination}
                onChange={(e) => setIsTrandingDestination(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
              />
              Trending Destination
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {submitting ? "Creating..." : "Create Destination"}
          </button>
          {message && (
            <div className="mt-2 text-center text-red-500">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateDestinationModal;
import React, { useState, useEffect } from "react";
import api, { imgApi } from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import { toast } from "react-toastify";

const UpdateDestinationModal = ({
  show,
  onClose,
  places = [],
  packages = [],
  editDestination,
  onDestinationUpdated,
  onOpenAddPlace,
}) => {
  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [topAttraction, setTopAttraction] = useState("");
  const [whatsGreat, setWhatsGreat] = useState("");
  const [tourGuide, setTourGuide] = useState("");
  const [famousFor, setFamousFor] = useState("");
  const [culturalExperiences, setCulturalExperiences] = useState("");
  const [tips, setTips] = useState("");
  const [importantInformation, setImportantInformation] = useState([""]);
  const [topPlaces, setTopPlaces] = useState([""]);
  const [destinationType, setDestinationType] = useState("domestic");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [isPopularDestination, setIsPopularDestination] = useState(false);
  const [isTrendingDestination, setIsTrendingDestination] = useState(false); // Fixed typo
  const [imagePreviews, setImagePreviews] = useState([]);
  const [destinationImageFiles, setDestinationImageFiles] = useState([]);
  const [placesImageFiles, setPlacesImageFiles] = useState([]);

  // Prefill form with editDestination data
  useEffect(() => {
    if (editDestination) {
      setDestinationName(editDestination.destinationName || "");
      setDestinationType(editDestination.destinationType || "domestic");
      setSelectedPackages(Array.isArray(editDestination.packageId) ? editDestination.packageId : []);
      setSelectedPlaces(Array.isArray(editDestination.places) ? editDestination.places : []);
      setTopAttraction(editDestination.topAttraction || "");
      setWhatsGreat(editDestination.whatsGreat || "");
      setTourGuide(editDestination.tourGuide || "");
      setFamousFor(editDestination.famousFor || "");
      setCulturalExperiences(editDestination.culturalExperiences || "");
      setTips(editDestination.tips || ""); // Fixed case to match backend
      setImportantInformation(
        Array.isArray(editDestination.importantInformation) ? editDestination.importantInformation : [""]
      );
      setTopPlaces(Array.isArray(editDestination.topPlaces) ? editDestination.topPlaces : [""]);
      setIsPopularDestination(!!editDestination.isPopularDestination);
      setIsTrendingDestination(!!editDestination.isTrendingDestination); // Fixed typo
      
      // Ensure imagePreviews is always an array
      const destinationImages = editDestination.destinationImage;
      setImagePreviews(
        Array.isArray(destinationImages) ? destinationImages : []
      );
    }
  }, [editDestination, show]);

  // Handle image preview and file storage
  const handleImageChange = (e, setFiles, setPreviews) => {
    const files = Array.from(e.target.files);
    setFiles(files); // Store the actual File objects
    if (setPreviews) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviews(previews);
    }
  };

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (typeof preview === "string" && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreviews]);

  // Handle multiple input fields
  const handleMultiInputChange = (setter, values, idx, value) => {
    const newArr = [...values];
    newArr[idx] = value;
    setter(newArr);
  };

  const handleAddField = (setter, values) => setter([...values, ""]);
  const handleRemoveField = (setter, values, idx) =>
    setter(values.filter((_, i) => i !== idx));

  // Handle package selection
  const handlePackageChange = (packageId, checked) => {
    setSelectedPackages((prev) =>
      checked ? [...prev, packageId] : prev.filter((id) => id !== packageId)
    );
  };

  // Handle form submission with basic validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destinationName.trim()) {
      setMessage("Destination Name is required.");
      return;
    }
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
      formData.append("tips", tips); // Fixed case to match backend
      formData.append(
        "importantInformation",
        JSON.stringify(importantInformation.filter(Boolean))
      );
      formData.append("topPlaces", JSON.stringify(topPlaces.filter(Boolean)));
      formData.append("destinationType", destinationType);
      formData.append("destinationName", destinationName);
      formData.append("packageId", JSON.stringify(selectedPackages));
      formData.append("isPopularDestination", isPopularDestination);
      formData.append("isTrendingDestination", isTrendingDestination); // Fixed typo

      // Append destination images
      if (destinationImageFiles.length > 0) {
        destinationImageFiles.forEach((file) => {
          formData.append("destinationImage", file);
        });
      }

      // Append places images
      if (placesImageFiles.length > 0) {
        placesImageFiles.forEach((file) => {
          formData.append("placesImages", file);
        });
      }

      const res = await api.put(
        `/api/destination/updateDestination/${editDestination._id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
        toast.success("Destination updated successfully!");
        setMessage("Destination updated successfully!");
        if (onDestinationUpdated) onDestinationUpdated();
        onClose();
      } else {
        setMessage("Failed to update destination.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!show || !editDestination) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">Update Destination</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Destination Name:
              <input
                type="text"
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </label>
            <label>
              Destination Type:
              <select
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
              Places:
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-full max-h-28 overflow-y-auto border rounded p-2">
                  {places.length > 0 ? (
                    places.map((place) => (
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
                          className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                        />
                        <span>{place.name || place.placeName}</span>
                      </label>
                    ))
                  ) : (
                    <p>No places available</p>
                  )}
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
              Packages (Optional):
              <div className="flex flex-col gap-1 w-full max-h-28 overflow-y-auto border rounded p-2">
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <label
                      key={pkg.id || pkg._id}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        value={pkg.id || pkg._id}
                        checked={selectedPackages.includes(pkg.id || pkg._id)}
                        onChange={(e) =>
                          handlePackageChange(pkg.id || pkg._id, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                      />
                      <span>{pkg.name || pkg.packageName}</span>
                    </label>
                  ))
                ) : (
                  <p>No packages available</p>
                )}
              </div>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Top Attraction:
              <input
                type="text"
                value={topAttraction}
                onChange={(e) => setTopAttraction(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              What's Great:
              <input
                type="text"
                value={whatsGreat}
                onChange={(e) => setWhatsGreat(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Tour Guide:
              <input
                type="text"
                value={tourGuide}
                onChange={(e) => setTourGuide(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Famous For:
              <input
                type="text"
                value={famousFor}
                onChange={(e) => setFamousFor(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Cultural Experiences:
              <input
                type="text"
                value={culturalExperiences}
                onChange={(e) => setCulturalExperiences(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
            <label>
              Tips:
              <input
                type="text"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </label>
          </div>
          <div>
            <label>
              Important Information:
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
              Top Places:
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
              Destination Images:
              {Array.isArray(imagePreviews) && imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview.startsWith('http') ? preview : `${imgApi}${preview}`}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setDestinationImageFiles, setImagePreviews)}
                  className="w-full mt-2"
                />
              )}
              {Array.isArray(imagePreviews) && imagePreviews.length > 0 && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviews([]);
                      setDestinationImageFiles([]);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear Images
                  </button>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setDestinationImageFiles, setImagePreviews)}
                    className="w-full mt-2"
                  />
                </div>
              )}
            </label>
          </div>
          <div>
            <label>
              Places Images:
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageChange(e, setPlacesImageFiles, () => {})}
                className="w-full mt-2"
              />
              {placesImageFiles.length > 0 && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setPlacesImageFiles([])}
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear Places Images
                  </button>
                </div>
              )}
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
                checked={isTrendingDestination}
                onChange={(e) => setIsTrendingDestination(e.target.checked)}
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
            {submitting ? "Updating..." : "Update Destination"}
          </button>
          {message && (
            <div className="mt-2 text-center text-red-500">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateDestinationModal;
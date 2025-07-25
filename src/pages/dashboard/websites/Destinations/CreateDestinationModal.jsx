import React, { useState, useRef, useEffect } from "react";
import api from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import axios from "axios";

const CreateDestinationModal = ({
  show,
  onClose,
  places,
  packages,
  onPlaceAdded,
  onDestinationCreated,
  onOpenAddPlace,
  editDestination,
  onDestinationUpdated,
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
  // Prefill for edit
  useEffect(() => {
    if (editDestination) {
      setDestinationName(editDestination.destinationName || "");
      setDestinationType(editDestination.DestinationType || "domestic");
      setSelectedPackages(editDestination.packageId || []);
      setSelectedPlaces(editDestination.places || []);
      setTopAttraction(editDestination.topAttraction || "");
      setWhatsGreat(editDestination.whatsGreat || "");
      setTourGuide(editDestination.tourGuide || "");
      setFamousFor(editDestination.famousFor || "");
      setCulturalExperiences(editDestination.culturalExperiences || "");
      setTips(editDestination.Tips || "");
      setImportantInformation(editDestination.importantInformation || [""]);
      setTopPlaces(editDestination.topPlaces || [""]);
    } else {
      setDestinationName("");
      setDestinationType("domestic");
      setSelectedPackages([]);
      setSelectedPlaces([]);
      setTopAttraction("");
      setWhatsGreat("");
      setTourGuide("");
      setFamousFor("");
      setCulturalExperiences("");
      setTips("");
      setImportantInformation([""]);
      setTopPlaces([""]);
    }
  }, [editDestination, show]);

  const handleMultiInputChange = (setter, values, idx, value) => {
    const newArr = [...values];
    newArr[idx] = value;
    setter(newArr);
  };
  const handleAddField = (setter, values) => setter([...values, ""]);
  const handleRemoveField = (setter, values, idx) =>
    setter(values.filter((_, i) => i !== idx));

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
      formData.append("DestinationType", destinationType);
      formData.append("destinationName", destinationName);
      // formData.append("packageId", JSON.stringify(selectedPackages));
      if (destinationImageRef.current?.files) {
        Array.from(destinationImageRef.current.files).forEach((file) => {
          formData.append("destinationImage", file);
        });
      }
      if (placesImagesRef.current?.files) {
        Array.from(placesImagesRef.current.files).forEach((file) => {
          formData.append("placesImages", file);
        });
      }

      let res;
      if (editDestination && editDestination._id) {
        // Update
        res = await api.put(
          `/api/destination/updateDestination/${editDestination._id}`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        // Create
        res = await axios.post(
          `https://7wvxgkc8-8000.inc1.devtunnels.ms/api/destination`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }
      const isSuccess =
        res.ok || res.data?.statusCode === 200 || res.data?.statusCode === 201;
      if (isSuccess) {
        setMessage(
          editDestination
            ? "Destination updated successfully!"
            : "Destination created successfully!"
        );
        if (editDestination && onDestinationUpdated) onDestinationUpdated();
        if (!editDestination && onDestinationCreated) onDestinationCreated();
        onClose();
      } else {
        setMessage(
          editDestination
            ? "Failed to update destination."
            : "Failed to create destination."
        );
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
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Destination
        </h2>
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
                className="w-full border rounded px-2 py-1">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>
          </div>
          {/* <div>
            <label>
              Packages:
              <div className="flex flex-col gap-1 w-full max-h-28 overflow-y-auto border rounded p-2">
                {packages.map((pkg) => (
                  <label key={pkg.id || pkg._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={pkg.id || pkg._id}
                      checked={selectedPackages.includes(pkg.id || pkg._id)}
                      onChange={e => {
                        const value = pkg.id || pkg._id;
                        setSelectedPackages(prev =>
                          e.target.checked
                            ? [...prev, value]
                            : prev.filter(p => p !== value)
                        );
                      }}
                    />
                    <span>{pkg.name || pkg.packageName}</span>
                  </label>
                ))}
              </div>
            </label>
          </div> */}
          <div>
            <label>
              Places:
              <div className="flex gap-2 items-start">
                <div className="flex flex-col gap-1 w-full max-h-28 overflow-y-auto border rounded p-2">
                  {places.map((place) => (
                    <label
                      key={place.id || place._id}
                      className="flex items-center gap-2">
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
                  onClick={onOpenAddPlace}>
                  + Add Place
                </button>
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
                    className="px-2">
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
                      className="px-2">
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
                    className="px-2">
                    -
                  </button>
                  {idx === topPlaces.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleAddField(setTopPlaces, topPlaces)}
                      className="px-2">
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
              <input
                type="file"
                ref={destinationImageRef}
                multiple
                accept="image/*"
                className="w-full"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
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

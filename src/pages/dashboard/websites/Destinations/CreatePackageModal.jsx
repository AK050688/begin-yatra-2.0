import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import api from '../../../../Api/ApiService';
import { FaTimes, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CreatePackageModal = ({ show, onClose, onPackageCreated, destinations = [], selectedDestination = null }) => {
  const token = useSelector(selectAccessToken);
  const [creating, setCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    packageImage: null,
    destinationId: "",
    packageName: "",
    totalDaysNight: "",
    packagePrice: "",
    theme: "",
    AboutPackage: "",
    packageSummery: [{ day: "", about: "" }],
  });

  // Reset form when modal opens/closes or when selectedDestination changes
  useEffect(() => {
    if (!show) {
      setForm({
        packageImage: null,
        destinationId: "",
        packageName: "",
        totalDaysNight: "",
        packagePrice: "",
        theme: "",
        AboutPackage: "",
        packageSummery: [{ day: "", about: "" }],
      });
      setImagePreview(null);
    } else if (selectedDestination) {
      // Pre-select the destination when creating from Destinations page
      setForm(prev => ({
        ...prev,
        destinationId: selectedDestination._id
      }));
    }
  }, [show, selectedDestination]);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'packageImage' && files && files[0]) {
      const file = files[0];
      setForm(prev => ({ ...prev, packageImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle package summary changes
  const handleSummeryChange = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      packageSummery: prev.packageSummery.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new summary day
  const addSummeryDay = () => {
    setForm(prev => ({
      ...prev,
      packageSummery: [...prev.packageSummery, { day: "", about: "" }]
    }));
  };

  // Remove summary day
  const removeSummeryDay = (index) => {
    setForm(prev => ({
      ...prev,
      packageSummery: prev.packageSummery.filter((_, idx) => idx !== index)
    }));
  };

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    
    try {
      const formData = new FormData();
      formData.append("packageImage", form.packageImage);
      formData.append("destinationId", form.destinationId);
      formData.append("packageName", form.packageName);
      formData.append("totalDaysNight", form.totalDaysNight);
      formData.append("packagePrice", form.packagePrice);
      formData.append("theme", form.theme);
      formData.append("AboutPackage", form.AboutPackage);
      
      // Append package summary
      form.packageSummery.forEach((item, idx) => {
        formData.append(`packageSummery[${idx}][day]`, item.day);
        formData.append(`packageSummery[${idx}][about]`, item.about);
      });

      const res = await api.post('/api/package', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": token,
        },
      });

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Package created successfully!");
        onPackageCreated();
        onClose();
      } else {
        alert("Failed to create package");
      }
    } catch (err) {
      console.error("Error creating package:", err);
      alert("Failed to create package");
    } finally {
      setCreating(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Create New Package
            {selectedDestination && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                for {selectedDestination.destinationName}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <form onSubmit={handleCreate} className="p-6 space-y-6">
          {/* Package Image */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  name="packageImage"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="hidden"
                  id="packageImage"
                  required
                />
                <label
                  htmlFor="packageImage"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
                >
                  <div className="text-center">
                    <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload package image
                    </p>
                  </div>
                </label>
              </div>
              {imagePreview && (
                <div className="flex-shrink-0">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div> */}

          {/* Destination Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <select
              name="destinationId"
              value={form.destinationId}
              onChange={handleFormChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Destination</option>
              {destinations.map((dest) => (
                <option key={dest._id} value={dest._id}>
                  {dest.destinationName}
                </option>
              ))}
            </select>
          </div>

          {/* Package Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Name
            </label>
            <input
              type="text"
              name="packageName"
              value={form.packageName}
              onChange={handleFormChange}
              placeholder="Enter package name"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Duration and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days/Nights)
              </label>
              <input
                type="text"
                name="totalDaysNight"
                value={form.totalDaysNight}
                onChange={handleFormChange}
                placeholder="e.g., 5 Days / 4 Nights"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (per person)
              </label>
              <input
                type="number"
                name="packagePrice"
                value={form.packagePrice}
                onChange={handleFormChange}
                placeholder="Enter price"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              name="theme"
              value={form.theme}
              onChange={handleFormChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Theme</option>
              <option value="Adventure">Adventure</option>
              <option value="Romantic">Romantic</option>
              <option value="Family">Family</option>
              <option value="Cultural">Cultural</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>

          {/* About Package */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Package
            </label>
            <textarea
              name="AboutPackage"
              value={form.AboutPackage}
              onChange={handleFormChange}
              placeholder="Describe the package..."
              rows="4"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Package Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Summary
            </label>
            <div className="space-y-3">
              {form.packageSummery.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Day (e.g., Day 1)"
                    value={item.day}
                    onChange={(e) => handleSummeryChange(idx, "day", e.target.value)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.about}
                    onChange={(e) => handleSummeryChange(idx, "about", e.target.value)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  {form.packageSummery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSummeryDay(idx)}
                      className="p-2 text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSummeryDay}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <FaPlus className="text-sm" />
                Add Day
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackageModal;
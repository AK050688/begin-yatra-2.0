import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import api from '../../../../Api/ApiService';
import { FaTimes, FaUpload, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UpdatePlaceModal = ({ show, onClose, editPlace, onPlaceUpdated }) => {
  const token = useSelector(selectAccessToken);
  const [updating, setUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    placeName: '',
    placeDescription: '',
    status: 'active'
  });
  const placeImageRef = useRef();

  // Reset form when modal opens/closes or when editPlace changes
  useEffect(() => {
    if (!show) {
      setForm({
        placeName: '',
        placeDescription: '',
        status: 'active'
      });
      setImagePreview(null);
    } else if (editPlace) {
      // Pre-fill the form with existing place data
      setForm({
        placeName: editPlace.placeName || '',
        placeDescription: editPlace.placeDescription || '',
        status: editPlace.status || 'active'
      });
      
      // Set image preview if place has an image
      if (editPlace.placeImage) {
        setImagePreview(editPlace.placeImage);
      }
    }
  }, [show, editPlace]);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'placeImage' && files && files[0]) {
      const file = files[0];
      setForm(prev => ({ ...prev, placeImage: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("placeName", form.placeName);
      formData.append("placeDescription", form.placeDescription);
      formData.append("status", form.status);

      // Handle image upload
      if (placeImageRef.current?.files && placeImageRef.current.files.length > 0) {
        Array.from(placeImageRef.current.files).forEach((file, index) => {
          formData.append("placeImage", file);
        });
      }

      const res = await api.put(
        `/api/place/updatePlace/${editPlace._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token,
          },
        }
      );

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Place updated successfully!");
        onPlaceUpdated();
        onClose();
      } else {
        toast.error("Failed to update place");
      }
    } catch (err) {
      console.error("Error updating place:", err);
      toast.error("Failed to update place");
    } finally {
      setUpdating(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Update Place
            {editPlace && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                - {editPlace.placeName}
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

        <form onSubmit={handleUpdate} className="p-6 space-y-6">
          {/* Place Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  name="placeImage"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="hidden"
                  id="placeImage"
                  ref={placeImageRef}
                />
                <label
                  htmlFor="placeImage"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
                >
                  <div className="text-center">
                    <FaUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload place image
                    </p>
                  </div>
                </label>
              </div>
              {imagePreview && (
                <div className="flex-shrink-0 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setForm(prev => ({ ...prev, placeImage: null }));
                      if (placeImageRef.current) {
                        placeImageRef.current.value = '';
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Place Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Place Name
            </label>
            <input
              type="text"
              name="placeName"
              value={form.placeName}
              onChange={handleFormChange}
              placeholder="Enter place name"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Place Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="placeDescription"
              value={form.placeDescription}
              onChange={handleFormChange}
              placeholder="Describe the place..."
              rows="4"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
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
              disabled={updating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Update Place"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlaceModal; 
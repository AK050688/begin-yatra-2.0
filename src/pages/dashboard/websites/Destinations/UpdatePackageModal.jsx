import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import api from '../../../../Api/ApiService';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../../store/userSlice';
import { toast } from 'react-toastify';

const UpdatePackageModal = ({ show, onClose, onPackageUpdated, editPackage, destinations }) => {
  const token = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    packageName: '',
    destinationId: '',
    totalDaysNight: '',
    packagePrice: '',
    theme: '',
    AboutPackage: '',
    packageSummery: [],
    isFeaturedForTop: false,
    isTrandingPackage: false
  });

  // Initialize form when editPackage changes
  useEffect(() => {
    if (editPackage) {
      // Handle destinationId - it can be null, string, or object
      let destinationId = '';
      if (editPackage.destinationId) {
        if (typeof editPackage.destinationId === 'object' && editPackage.destinationId._id) {
          destinationId = editPackage.destinationId._id;
        } else if (typeof editPackage.destinationId === 'string') {
          destinationId = editPackage.destinationId;
        }
      }

             setForm({
         packageName: editPackage.packageName || '',
         destinationId: destinationId,
         totalDaysNight: editPackage.totalDaysNight || '',
         packagePrice: editPackage.packagePrice || '',
         theme: editPackage.theme || '',
         AboutPackage: editPackage.AboutPackage || '',
         packageSummery: editPackage.packageSummery || [],
         isFeaturedForTop: editPackage.isFeaturedForTop || false,
         isTrandingPackage: editPackage.isTrandingPackage || false
       });
    }
  }, [editPackage]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSummaryChange = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      packageSummery: prev.packageSummery.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Helper function to preserve existing _id when updating summary items

  const addSummaryItem = () => {
    setForm(prev => ({
      ...prev,
      packageSummery: [...prev.packageSummery, { day: '', about: '' }]
    }));
  };

  const removeSummaryItem = (index) => {
    setForm(prev => ({
      ...prev,
      packageSummery: prev.packageSummery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare package data, preserving existing _id fields in packageSummery
             const packageData = {
         packageName: form.packageName,
         destinationId: form.destinationId || null, // Handle null destinationId
         totalDaysNight: form.totalDaysNight,
         packagePrice: parseInt(form.packagePrice),
         theme: form.theme,
         AboutPackage: form.AboutPackage,
         packageSummery: form.packageSummery
           .filter(item => item.day && item.about)
           .map(item => ({
             day: item.day,
             about: item.about,
             _id: item._id // Preserve existing _id if it exists
           })),
         isFeaturedForTop: form.isFeaturedForTop,
         isTrandingPackage: form.isTrandingPackage
       };

      const res = await api.put(`/api/package/updatePackage/${editPackage._id}`, packageData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success('Package updated successfully');
        onPackageUpdated();
      } else {
        setError('Failed to update package');
      }
    } catch (err) {
      console.error('Error updating package:', err);
      setError(err.response?.data?.message || 'Failed to update package');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Update Package</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Name *
              </label>
              <input
                type="text"
                name="packageName"
                value={form.packageName}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter package name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                name="destinationId"
                value={form.destinationId}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">No Destination (Optional)</option>
                {destinations.map((dest) => (
                  <option key={dest._id} value={dest._id}>
                    {dest.destinationName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="totalDaysNight"
                value={form.totalDaysNight}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., 5 Days / 4 Nights"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="packagePrice"
                value={form.packagePrice}
                onChange={handleFormChange}
                required
                min="0"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme *
              </label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Theme</option>
                <option value="Adventure">Adventure</option>
                <option value="Romantic">Romantic</option>
                <option value="Family">Family</option>
                <option value="Cultural">Cultural</option>
                <option value="Relaxation">Relaxation</option>
              </select>
            </div>
          </div>

                     <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Package Description *
             </label>
             <textarea
               name="AboutPackage"
               value={form.AboutPackage}
               onChange={handleFormChange}
               required
               rows="4"
               className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
               placeholder="Enter package description"
             />
           </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-center">
               <input
                 type="checkbox"
                 id="isFeaturedForTop"
                 name="isFeaturedForTop"
                 checked={form.isFeaturedForTop}
                 onChange={handleFormChange}
                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
               />
               <label htmlFor="isFeaturedForTop" className="ml-2 block text-sm text-gray-900">
                 Featured For Top
               </label>
             </div>
             <div className="flex items-center">
               <input
                 type="checkbox"
                 id="isTrandingPackage"
                 name="isTrandingPackage"
                 checked={form.isTrandingPackage}
                 onChange={handleFormChange}
                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
               />
               <label htmlFor="isTrandingPackage" className="ml-2 block text-sm text-gray-900">
                 Trending Package
               </label>
             </div>
           </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Package Summary
              </label>
              <button
                type="button"
                onClick={addSummaryItem}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add Day
              </button>
            </div>
            
            <div className="space-y-3">
              {form.packageSummery.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.day}
                      onChange={(e) => handleSummaryChange(index, 'day', e.target.value)}
                      placeholder="Day (e.g., Day 1)"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                    />
                    <textarea
                      value={item.about}
                      onChange={(e) => handleSummaryChange(index, 'about', e.target.value)}
                      placeholder="Description of the day"
                      rows="2"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {item._id && (
                      <div className="text-xs text-gray-500 mt-1">
                        ID: {item._id}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSummaryItem(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Package'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackageModal; 
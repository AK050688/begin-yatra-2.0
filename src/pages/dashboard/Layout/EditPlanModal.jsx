import React, { useState, useEffect } from "react";
import api from "../../../Api/ApiService";

const EditPlanModal = ({ isOpen, onClose, plan, onUpdate }) => {
  const [formData, setFormData] = useState({
    planName: "",
    price: "",
    description: "",
    validity: "",
    planType: "domestic",
    numberOfLeads: "",
  });
  const [error, setError] = useState(null);

 useEffect(() => {
   // console.log(plan,"plan>>>>>>>>>>");
   
    if (plan) {
      console.log("Plan data in modal:", plan);
      setFormData({
        planName: plan.planName || "",
        price: plan.price || "",
        description: plan.description || "",
        validity: plan.validity || "",
        planType: plan.planType || "domestic",
        numberOfLeads: plan.numberOfLeads || "",
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

   
    if (!plan?._id) {
      setError("Invalid plan ID");
      return;
    }

    if (
      !formData.planName ||
      !formData.price ||
      !formData.validity ||
      !formData.numberOfLeads
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const res = await api.put(`/api/plan/${plan._id}`, {
        ...formData,
        price: parseFloat(formData.price),
        validity: parseInt(formData.validity, 10),
        numberOfLeads: parseInt(formData.numberOfLeads, 10),
      });
      onUpdate(res.data);
      onClose();
    } catch (error) {
      console.error("Error updating plan:", error);
      setError("Failed to update plan. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Plan</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Plan Name
            </label>
            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Validity (days)
            </label>
            <input
              type="number"
              name="validity"
              value={formData.validity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Plan Type
            </label>
            <select
              name="planType"
              value={formData.planType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of Leads
            </label>
            <input
              type="number"
              name="numberOfLeads"
              value={formData.numberOfLeads}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlanModal;

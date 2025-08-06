import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../../store/userSlice";
import api, { imgApi } from "../../../../Api/ApiService";

const PartnersPage = () => {
  const token = useSelector(selectAccessToken);
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
    isListed: true,
  });
  const [updateId, setUpdateId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch all partners
  const fetchPartners = async (name = "") => {
    try {
      const response = await api.get(
        `/api/leads/getAllpartners${name ? `?name=${name}` : ""}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("fetchPartners", response);
      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        setPartners(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission for adding a partner
  const handleAddPartner = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("isListed", formData.isListed);
    if (formData.logo) data.append("logo", formData.logo);

    try {
      await api.post("/api/leads/partners", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      fetchPartners();
      setFormData({ name: "", description: "", logo: null, isListed: true });
    } catch (error) {
      console.error("Error adding partner:", error);
    }
  };

  // Handle partner update
  const handleUpdatePartner = async (id) => {
    const data = {
      name: formData.name,
      description: formData.description,
      isListed: formData.isListed,
    };

    try {
      await api.put(`/api/leads/updatePartners/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      fetchPartners();
      setFormData({ name: "", description: "", logo: null, isListed: true });
      setUpdateId(null);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating partner:", error);
    }
  };

  // Handle partner deletion
  const handleDeletePartner = async (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await api.delete(`/api/leads/deletePartners/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        fetchPartners();
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (partner) => {
    setFormData({
      name: partner.name,
      description: partner.description,
      logo: null,
      isListed: partner.isListed,
    });
    setUpdateId(partner._id);
    setShowUpdateModal(true);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPartners(searchName);
  };

  // Handle view details
  const handleViewDetails = (partner) => {
    setSelectedPartner(partner);
  };

  // Close modals
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setFormData({ name: "", description: "", logo: null, isListed: true });
    setUpdateId(null);
  };

  const closeViewModal = () => {
    setSelectedPartner(null);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Add Partner Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Partner</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Partner Name"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="file"
            name="logo"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              name="isListed"
              checked={formData.isListed}
              onChange={(e) =>
                setFormData({ ...formData, isListed: e.target.checked })
              }
              className="mr-2"
            />
            <label>Is Listed</label>
          </div> */}
          <button
            onClick={handleAddPartner}
            className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Partner
          </button>
        </div>
      </div>

      {/* Search Partners */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Search Partners</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by name"
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Logo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Listed</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner._id} className="border-b">
                <td className="p-3">
                  {partner.image && (
                    <img
                      src={imgApi + partner.image}
                      alt="Logo"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="p-3">{partner.name}</td>
                <td className="p-3">
                  {partner.description.substring(0, 50)}...
                </td>
                <td className="p-3">{partner.isListed ? "Yes" : "No"}</td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(partner)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleViewDetails(partner)}
                    className="bg-blue-400 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeletePartner(partner._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Partner Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Update Partner</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Partner Name"
                className="w-full p-2 border rounded-md"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 border rounded-md"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isListed"
                  checked={formData.isListed}
                  onChange={(e) =>
                    setFormData({ ...formData, isListed: e.target.checked })
                  }
                  className="mr-2"
                />
                <label>Is Listed</label>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUpdatePartner(updateId)}
                  className="w-full bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Update Partner
                </button>
                <button
                  onClick={closeUpdateModal}
                  className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">
              {selectedPartner.name}
            </h2>
            <p>
              <strong>Description:</strong> {selectedPartner.description}
            </p>
            {selectedPartner.image && (
              <img
                src={imgApi + selectedPartner.image}
                alt="Logo"
                className="w-32 h-32 object-cover my-2"
              />
            )}
            <p>
              <strong>Listed:</strong> {selectedPartner.isListed ? "Yes" : "No"}
            </p>
            <button
              onClick={closeViewModal}
              className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersPage;
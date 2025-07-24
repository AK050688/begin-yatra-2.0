import React, { useEffect, useState } from "react";
import api from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";


const DESTINATIONS = [
  { id: "64b9e12345abc67890def123", name: "Manali" },
  { id: "64b9e12345abc67890def456", name: "Goa" },
  // Add more destinations as needed
];

const AdminPackages = () => {
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
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
  const [imagePreview, setImagePreview] = useState(null);
  const [creating, setCreating] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/getAllPackages`);
      setPackages(res.data?.packages || []);
    } catch (err) {
      setError("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => { fetchPackages(); }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "packageImage") {
      setForm({ ...form, packageImage: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSummeryChange = (idx, field, value) => {
    const updated = form.packageSummery.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setForm({ ...form, packageSummery: updated });
  };

  const addSummeryDay = () => {
    setForm({ ...form, packageSummery: [...form.packageSummery, { day: "", about: "" }] });
  };

  const removeSummeryDay = (idx) => {
    setForm({ ...form, packageSummery: form.packageSummery.filter((_, i) => i !== idx) });
  };



  return (
    <div className="p-6">
      
      <button onClick={() => setShowCreate(true)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Create New Package</button>
      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4">No packages found.</td></tr>
              ) : (
                packages.map((pkg) => (
                  <tr key={pkg._id}>
                    <td className="px-4 py-2 border">{pkg.name}</td>
                    <td className="px-4 py-2 border">{pkg.type}</td>
                    <td className="px-4 py-2 border">{pkg.price}</td>
                    <td className="px-4 py-2 border">{pkg.description}</td>
                    <td className="px-4 py-2 border">{/* Edit/Delete buttons will go here */}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPackages; 
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../Api/ApiService";

const AddNewUserModal = ({ show, onClose, getUsers, pagination }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [kycFile, setKycFile] = useState(null);

  const handleFileChange = (e) => {
    setKycFile(e.target.files[0]);
  };
  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("companyName", company);
      formData.append("city", city);
      if (kycFile) {
        formData.append("kyc", kycFile);
      }

      await api.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User registered successfully!");
      getUsers(1);

      onClose();
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setCompany("");
      setCity("");
      setKycFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register user");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[70%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6 sm:p-8 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-black">
          Add New User
        </h1>
        <h2 className="text-center text-gray-600 mt-2 mb-6 text-sm sm:text-base">
          Join Begin Yatra and start your journey
        </h2>

        <form className="space-y-6" onSubmit={signupHandler}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              id="name"
              value={name}
              onChange={setName}
            />
            <InputField
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <InputField
              label="Phone Number"
              id="phone"
              type="tel"
              value={phone}
              onChange={setPhone}
            />
            <InputField
              label="Company Name"
              id="company"
              value={company}
              onChange={setCompany}
            />
            <InputField
              label="City"
              id="city"
              value={city}
              onChange={setCity}
            />
          </div>

          <div>
            <label
              htmlFor="kyc"
              className="block text-sm font-medium text-gray-700"
            >
              KYC Document
            </label>
            <input
              type="file"
              id="kyc"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a valid ID proof (PDF, JPG, PNG, max 5MB)
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
          >
            Add New User
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type = "text", value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
);

export default AddNewUserModal;

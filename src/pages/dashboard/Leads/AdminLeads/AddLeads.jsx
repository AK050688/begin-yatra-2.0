import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Plane,
  Calendar,
  Clock,
  Users,
  Baby,
  Route,
  CheckCircle,
  Trash2,
  Edit,
  Plus,
  Hash,
} from "lucide-react";
import { FaShoppingCart, FaTag } from "react-icons/fa";
import api from "../../../../Api/ApiService";
import { toast } from "react-toastify";
import { selectAccessToken } from "../../../../store/userSlice";
import { useSelector } from "react-redux";
// import { selectLoading, setLoading } from "../store/loadingSlice";

const defaultForm = {
  leadId: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  destination: "",
  travelDate: "",
  adult: "0",
  children: "0",
  infant: "0",
  tripType: "",
  leadType: "",
  totalMembers: {
    adult: "0",
    children: "0",
    infant: "0",
  },
  travelDays: "",
  travelNights: "",
};

export default function AddLeads() {
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoadiing", isLoading);

  const accessToken = useSelector(selectAccessToken);
  // const [soldLeads, setSoldLeads] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const getTotalMember = (totalMembers) => {
    return Object.values(totalMembers || {})?.reduce((acc, curr) => {
      return acc + Number(curr);
    }, 0);
  };

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    destination: "",
  });

  const [savedLeads, setSavedLeads] = useState([]);
  // console.log("🚀 ~ AddLeads ~ savedLeads:", savedLeads);
  const [editingId, setEditingId] = useState(null);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    limit: 10,
    totalPages: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });

  const handlePageChange = (pageNumber) => {
    getLeads(pageNumber);
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      getLeads(pagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      getLeads(pagination.page + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (pagination.totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = pagination.totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;
      startPage = Math.max(pagination.page - maxPagesBeforeCurrent, 1);
      endPage = Math.min(
        pagination.page + maxPagesAfterCurrent,
        pagination.totalPages
      );

      if (endPage - startPage < maxPagesToShow - 1) {
        if (pagination.page < pagination.totalPages / 2) {
          endPage = Math.min(
            startPage + maxPagesToShow - 1,
            pagination.totalPages
          );
        } else {
          startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // const generateLeadId = () => {
  //   const timestamp = new Date()
  //     .toISOString()
  //     .replace(/[-:.T]/g, "")
  //     .slice(0, 14);
  //   const random = Math.floor(1000 + Math.random() * 9000);
  //   return `lead_${timestamp}_${random}`;
  // };

  const handleGroupChange = (e) => {
    e.preventDefault();

    setForm({
      ...form,
      totalMembers: {
        ...form.totalMembers,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    if (["name", "phone", "email", "city", "destination"].includes(name)) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
 
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!form.destination.trim()) {
      newErrors.destination = "Destination is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
      return;
    }

    try {
      const leadData = {
        ...form,
        travelTime: `${form.travelDays} (days) - ${form.travelNights} (nights)`,
        // leadId: editingId ? form.leadId : generateLeadId(),
        totalMembers: {
          adult: String(form.totalMembers.adult || "0"),
          children: String(form.totalMembers.children || "0"),
          infant: String(form.totalMembers.infant || "0"),
        },
        id: editingId || Date.now(),
        createdAt: editingId
          ? savedLeads.find((lead) => lead.id === editingId)?.createdAt
          : new Date().toLocaleString(),
      };

      delete leadData.leadId;

      if (editingId) {
        await api.put(`/api/leads/${editingId}`, leadData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await api.post("/api/leads", leadData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setForm({
        leadId: "",
        name: "",
        phone: "",
        email: "",
        city: "",
        destination: "",
        travelDate: "",
        adult: "0",
        children: "0",
        infant: "0",
        tripType: "",
        travelTime: "",
      });

      setErrors({});
      setShowModal(false);

      alert(
        editingId ? "Lead updated successfully!" : "Lead saved successfully!"
      );
      await getLeads();
    } catch (error) {
      console.error("Failed to submit lead:", error);
      alert("An error occurred while saving the lead.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (lead) => {
    try {
      setIsLoading(true);
      const newData = {
        leadId: lead.leadId || "",
        name: lead.name || "",
        phone: lead.phone || "",
        email: lead.email || "",
        city: lead.city || "",
        destination: lead.destination || "",
        travelDate: lead.travelDate || "",
        totalMembers: {
          adult: String(lead.totalMembers.adult || "0"),
          children: String(lead.totalMembers.children || "0"),
          infant: String(lead.totalMembers.infant || "0"),
        },
        tripType: lead.tripType || "",
        travelDays: lead.travelTime?.split(" ")[0]?.trim() || "",
        travelNights: lead.travelTime?.split(" ")[3]?.trim() || "",
      };
      setForm(newData);
      setEditingId(lead.id);
      setErrors({});
      setShowModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await api.delete(`/api/leads/${id}`);
        await getLeads();
        console.log(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeModal = () => {
    setForm(defaultForm);
    setErrors({});
    setEditingId(null);
    setShowModal(false);
  };

  const getLeads = async (page) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/leads?page=${page}&limit=${50}`);
      // console.log("re", response.data.data.leads);

      const { leads, ...paginate } = response.data.data;
      setPagination({
        limit: 50,
        totalDocs: paginate.totalLeads,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        page: paginate.currentPage,
      });

      if (!Array.isArray(leads)) {
        console.error("Leads is not an array:", leads);
        setSavedLeads([]);
        return;
      }
      const normalizedLeads = leads.map((lead) => ({
        id: lead._id || Date.now() + Math.random(),
        // leadId: lead.leadId || generateLeadId(),
        name: lead.name || "",
        phone: lead.phone || "",
        email: lead.email || "",
        city: lead.city || "",
        destination: lead.destination || "",
        travelDate: lead.travelDate
          ? new Date(lead.travelDate).toISOString().split("T")[0]
          : "",
        travelTime: lead.travelTime || "",
        adult: String(lead.adult || 0),
        status: lead.satatus,
        children: String(lead.children || 0),
        infant: String(lead.infant || 0),
        tripType: lead.tripType || "",
        totalMembers: lead.totalMembers,
        createdAt: lead.createdAt
          ? new Date(lead.createdAt).toLocaleString()
          : new Date().toLocaleString(),
      }));
      setSavedLeads(normalizedLeads);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setSavedLeads([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeads(1);
  }, []);

  const handleStatus = async (id) => {
    setIsLoading(true);
    if (!accessToken) {
      console.error("No token found");
      return;
    }

    try {
      const response = await api.put(
        `/api/leads/${id}`,
        { satatus: "sold" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log("❓❓❓❓❓",response);

      if (response.status === 200) {
        toast.success(`Lead marked as sold`);
      }

      await getLeads();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Error updating status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen justify-start lg:mr-6 md:mr-5 mr-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto lg:mb-8 md:mb-6 mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-blue-500 text-white lg:py-4 md:py-3 py-2  lg:px-8 md:px-6 px-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <Plus className="w-6 h-6" />
            {editingId ? "  Edit Travel Lead" : "Add New Travel Lead"}
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingId ? "Edit Travel Lead" : "Add New Travel Lead"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 pb-3 border-b border-gray-200">
                    <User className="w-6 h-6 text-blue-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <div className="group">
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          name="leadId"
                          value={
                            form.leadId ||
                            (editingId ? form.leadId : generateLeadId())
                          }
                          readOnly
                          placeholder="Lead ID"
                          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                        />
                      </div>
                    </div> */}
                    <div className="group">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className={`w-full text-black pl-11 pr-4 py-3 border ${
                            errors.name ? "border-red-500" : "border-red-200"
                          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-red-300`}
                          required
                        />
                        <div className="absolute top-2 right-3">
                          <span className="text-red-500 text-lg">*</span>
                        </div>
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className={`w-full text-black pl-11 pr-4 py-3 border ${
                            errors.phone ? "border-red-500" : "border-red-200"
                          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-red-300`}
                          required
                        />
                        <div className="absolute top-2 right-3">
                          <span className="text-red-500 text-lg">*</span>
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className={`w-full text-black pl-11 pr-4 py-3 border ${
                            errors.email ? "border-red-500" : "border-red-200"
                          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-red-300`}
                          required
                        />
                        <div className="absolute top-2 right-3">
                          <span className="text-red-500 text-lg">*</span>
                        </div>
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="City"
                          className={`w-full text-black pl-11 pr-4 py-3 border ${
                            errors.city ? "border-red-500" : "border-red-200"
                          } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-red-300`}
                          required
                        />
                        <div className="absolute top-2 right-3">
                          <span className="text-red-500 text-lg">*</span>
                        </div>
                      </div>
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 pb-3 border-b border-gray-200">
                    <Plane className="w-6 h-6 text-purple-500" />
                    Travel Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                          type="text"
                          name="destination"
                          value={form.destination}
                          onChange={handleChange}
                          placeholder="Destination"
                          className={`w-full text-black pl-11 pr-4 py-3 border ${
                            errors.destination
                              ? "border-red-500"
                              : "border-red-200"
                          } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-red-300`}
                          required
                        />
                        <div className="absolute top-2 right-3">
                          <span className="text-red-500 text-lg">*</span>
                        </div>
                      </div>
                      {errors.destination && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.destination}
                        </p>
                      )}
                    </div>
                    <div className="group">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                          type="date"
                          name="travelDate"
                          value={form.travelDate}
                          onChange={handleChange}
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                          type="number"
                          name="travelDays"
                          placeholder="Enter days"
                          value={form.travelDays}
                          onChange={handleChange}
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                          type="number"
                          name="travelNights"
                          placeholder="Enter nights"
                          value={form.travelNights}
                          onChange={handleChange}
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="relative">
                        <Route className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <select
                          name="leadType"
                          value={form.leadType}
                          onChange={handleChange}
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300 appearance-none"
                        >
                          <option value="">Select Lead Type</option>
                          <option value="domestic">Domestic</option>
                          <option value="international">International</option>
                        </select>
                      </div>
                    </div>
                    <div className="group">
                      <div className="relative">
                        <Route className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <select
                          name="tripType"
                          value={form.tripType}
                          onChange={handleChange}
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300 appearance-none"
                        >
                          <option value="">Select Trip Type</option>
                          <option value="Family">Family</option>
                          <option value="Friends">Friends</option>
                          <option value="Couples">Couples</option>
                          <option value="Business">Business</option>
                          <option value="Senior_Citizen">Senior_Citizen</option>
                          <option value="Group">Group</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 pb-3 border-b border-gray-200">
                    <Users className="w-6 h-6 text-green-500" />
                    Group Size
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adults
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        <input
                          type="number"
                          name="adult"
                          value={form?.totalMembers?.adult}
                          onChange={handleGroupChange}
                          min="0"
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Children
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        <input
                          type="number"
                          name="children"
                          value={form?.totalMembers?.children}
                          onChange={handleGroupChange}
                          min="0"
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Infants
                      </label>
                      <div className="relative">
                        <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                        <input
                          type="number"
                          name="infant"
                          value={form?.totalMembers?.infant}
                          onChange={handleGroupChange}
                          min="0"
                          className="w-full text-black pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-xl p-3 text-center">
                        <p className="text-sm text-gray-600">Total Members</p>
                        <p className="text-2xl font-bold text-green-600">
                          {getTotalMember(form?.totalMembers)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {isLoading
                      ? "Processing.."
                      : editingId
                      ? "Update Travel Lead"
                      : "Save Travel Lead"}
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm lg:rounded-2xl md:rounded-xl rounded lg:shadow-xl md:shadow-md shadow border border-white/20 lg:p-8 md:p-6 p-2 lg:hover:shadow-2xl md:hover:shadow-xl hover:shadow transition-all duration-300">
            <h2 className="lg:text-3xl md:text-xl text-md font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent lg:mb-8 md:mb-4 md-3 flex items-center gap-3">
              <CheckCircle className="lg:w-8 md:w-6 w-4 lg:h-8 md:h-6 h-4 text-green-500" />
              Travel Leads ({pagination.totalDocs})
            </h2>
            {savedLeads.length === 0 ? (
              <div className="text-center lg:py-12 md:py-10 py-8">
                <Users className="lg:w-16 md:w-12 w-8  lg:h-16 md:h-12 h-8 text-gray-300 mx-auto lg:mb-4 md:mb-4 mb-2" />
                <p className="text-gray-500 lg:text-lg md:text-md text-sm">
                  No leads available. Add your first lead to get started!
                </p>
              </div>
            ) : (
              <div className="grid lg:gap-6 md:gap-4 gap-2">
                {savedLeads.map((lead) => {
                  if (!lead || typeof lead !== "object") {
                    console.warn("Invalid lead:", lead);
                    return null;
                  }
                  return (
                    <div
                      key={lead.id}
                      className="bg-gradient-to-r from-gray-50 to-blue-50 lg:rounded-xl md:rounded rounded lg:p-6 md:p-4 p-2 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6 md:gap-4 gap-2">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" />
                            Personal Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="lg:font-medium md:font-medium font-semibold text-black">Lead ID:</span>{" "}
                              <span className="text-black">{lead._id || "N/A"}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium md:font-medium font-semibold text-black">Name:</span>{" "}
                              <span className="text-black">{lead.name || "N/A"}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium md:font-medium font-semibold text-black">Email:</span>{" "}
                                <span className="text-black">{lead.email || "N/A"}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium md:font-medium font-semibold text-black">City:</span>{" "}
                                <span className="text-black">{lead.city || "N/A"}</span>
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                            <Plane className="w-5 h-5 text-purple-500" />
                            Travel Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="flg:font-medium  text-blacklg:font-medium md:font-medium font-semibold text-black">Destination:</span>{" "}
                              <span className="text-black">  {lead.destination || "Not specified"}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium text-blacklg:font-medium md:font-medium font-semibold text-black">Date:</span>{" "}
                              <span className="text-black">  {lead.travelDate
                                ? new Date(lead.travelDate).toLocaleDateString()
                                : "Not specified"}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium  text-blacklg:font-medium md:font-medium font-semibold text-black">Time:</span>{" "}
                              <span className="text-black">  {lead.travelTime || "Not specified"}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium  text-blacklg:font-medium md:font-medium font-semibold text-black">Trip Type:</span>{" "}
                                <span className="text-black">{lead.tripType || "Not specified"}</span>
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-500" />
                            Group Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="lg:font-medium  text-blacklg:font-medium md:font-medium font-semibold text-black">
                                Total Members:
                              </span>
                              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                {getTotalMember(lead?.totalMembers) || 0}
                              </span>
                            </p>
                            <p>
                              <span className="lg:font-medium md:font-medium font-semibold text-black">Adults:</span>{" "}
                              <span className="text-black">  {lead?.totalMembers?.adult || 0}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium  text-blacklg:font-medium md:font-medium font-semibold text-black">Children:</span>{" "}
                                <span className="text-black">{lead?.totalMembers?.children || 0}</span>
                            </p>
                            <p>
                              <span className="lg:font-medium  text-blacklg:font-medium md:font-medium font-semibold text-black ">Infants:</span>{" "}
                                <span className="text-black">{lead?.totalMembers?.infant || 0}</span>
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            Actions
                          </h4>
                          <div className="space-y-3">
                            <p className="text-xs text-gray-500">
                              Created: {lead.createdAt || "Not specified"}
                            </p>
                            <div className="flex gap-2 justify-center align-middle w-full ">
                              <button
                                disabled={lead.status === "sold"}
                                onClick={() => handleEdit(lead)}
                                className="flex min-w-1/2 justify-center disabled:cursor-not-allowed disabled:opacity-75 align-middle  items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="flex justify-center align-middle min-w-1/2  items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>

                            <div className="flex items-center gap-2 justify-center w-full py-2 shadow-sm">
                              <button
                                disabled={lead.status === "sold"}
                                className="w-fit disabled:cursor-not-allowed bg-blue-400 px-4 py-2 text-white rounded-md"
                                onClick={() => handleStatus(lead?.id)}
                              >
                                Mark as sold
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20">
          {pagination.totalDocs > 0 && (
            <div className="max-w-6xl mx-auto mt-6 flex flex-col items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.page * pagination.limit,
                  pagination.totalDocs
                )}{" "}
                of {pagination.totalDocs} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={!pagination.hasPrevPage}
                  className={`px-3 py-1 rounded-md border border-gray-300 text-sm transition-colors ${
                    !pagination.hasPrevPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md border border-gray-300 text-sm transition-colors ${
                      pagination.page === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  className={`px-3 py-1 rounded-md border border-gray-300 text-sm transition-colors ${
                    !pagination.hasNextPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

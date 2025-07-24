import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Building, User, Eye, Plus } from "lucide-react";
import api from "../../Api/ApiService";
import { toast } from "react-toastify";
import { FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../store/userSlice"; // adjust the path
import AddNewUserModal from "./Layout/AddNewUserModal";
import ReplacementLeadsModal from "./layout/ReplacementLeadsModal";
import moment from "moment";
import { useDebounce } from "@uidotdev/usehooks";

const UserCard = () => {
  // const [users, setUsers] = useState([]);
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
  const [showModal, setShowModal] = useState(false);
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const [viewShowModal, setViewShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [viewDetails, setViewDetails] = useState({});

  // console.log("viewDetails", viewDetails);

  const [error, setError] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserWalletModal, setShowUserWalletModal] = useState(false);
  const [walletAmount, setWalletAmount] = useState("");
  const token = useSelector(selectAccessToken);
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [userData, setUserData] = useState({});

  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    companyName:""
  });

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    city: "",
    companyName: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserLeads, setCurrentUserLeads] = useState([]);

  const debouncedFilters = useDebounce(filters, 300);

  // const getAllUser = async () => {
  //   const response = await api.get("/api/auth/users");
  //   setUsers(response.data.data.docs || []);
  //   console.log("Fetched Users:", response.data.data.docs);
  // }

  const statusColourMap = {
    approved: "bg-orange-400",
    rejected: "bg-red-400",
    pending: "bg-yellow-400",
    "no-replacement": "bg-green-400",
  };

  // Fetch users for a specific page
  const getUsers = async (page = 1) => {
    try {
      debouncedFilters.page = page;
      let endpoint = "/api/auth/users?";
      Object.keys(debouncedFilters).forEach((filterKey) => {
        if (!debouncedFilters[filterKey]) return;
        endpoint += `${filterKey}=${debouncedFilters[filterKey]}&`;
      });
      endpoint = endpoint.substring(0, endpoint.length - 1);
      const response = await api.get(endpoint);
      const {
        docs,
        totalDocs,
        limit,
        totalPages,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = response.data.data;
      // setUsers(docs || []);
      setFilteredUsers(docs || []);
      setPagination({
        totalDocs,
        limit,
        totalPages,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      });
      console.log("Fetched Users:", docs);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch users";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // const getUserById = async (id) => {
  //   try {
  //     const res = await api.get(`/api/auth/users/${id}`);

  //     const user = res.data.data;
  //     console.log("User:", user);
  //   } catch (error) {}
  // };

  // filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // const applyFilters = () => {
    //   let filtered = users;
    //   if (filters.name) {
    //     filtered = filtered.filter((user) =>
    //       user.name?.toLowerCase().includes(filters.name.toLowerCase())
    //     );
    //   }
    //   if (filters.email) {
    //     filtered = filtered.filter((user) =>
    //       user.email?.toLowerCase().includes(filters.email.toLowerCase())
    //     );
    //   }

    //   if (filters.city) {
    //     filtered = filtered.filter((user) =>
    //       user.city?.toLowerCase().includes(filters.city.toLowerCase())
    //     );
    //   }
    //   if (filters.company) {
    //     filtered = filtered.filter((user) =>
    //       user.companyName
    //         ?.toLowerCase()
    //         .includes(filters.company.toLowerCase())
    //     );
    //   }
    //   setFilteredUsers(filtered);
    // };
    // applyFilters();
    getUsers(pagination.page);
  }, [debouncedFilters]);

  const getPlans = async () => {
    try {
      const response = await api.get("/api/plan");
      setPlans(response.data.data || []);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch plans";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const formatLeadData = (leads) => {
    let user = {};
    const filteredLeads = [];
    leads.forEach((leadData) => {
      if (!user?._id && leadData.user) {
        user = leadData.user;
      }
      if (!leadData.lead) return;
      filteredLeads.push({
        ...leadData.lead,
        cost: leadData.cost,
        replacementStatus: leadData.replacementStatus || leadData?.status,
      });
    });
    return {
      user,
      leads: filteredLeads,
    };
  };

  // Fetch user details by ID
  const getViewDetails = async (id) => {
    try {
      const response = await api.get(`/api/leads/getUserLead/${id}`);
      if (response?.data?.data === null) {
        setViewDetails({});
        return toast("No leads found.");
      }
      setViewDetails(formatLeadData(response.data.data) || {});
    } catch (error) {
      setError(error?.message);
    }
  };

  const getUserDataById = async (id) => {
    try {
      const res = await api.get(`/api/auth/getUserById/${id}`);

      if (res.status === 200) {
        setUserData(res.data.data);
      }
    } catch (error) {
      toast(`Failed to fetch user data: ${error?.message}`);
    }
  };

  const handleReactivate = async (id) => {
    console.log("Test");
    if (!id || typeof id !== "string") {
      console.error("[Suspend] Invalid ID provided:", id);
      toast.error("Invalid user ID");
      return;
    }
    const confirmSuspend = window.confirm(
      "Are you sure you want to activate this user?"
    );
    if (!confirmSuspend) return;
    try {
      console.log("[Activating] Sending request with payload:", { userId: id });
      const response = await api.post(
        `/api/auth/suspendUser/${id}?status=active`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("[Active] Backend response:", response?.data);
      toast.success("User activated successfully!");
      // Refresh the current page to reflect updated user status
      getUsers(pagination.page);
      handleLeadsCostCloseModal();
    } catch (error) {
      console.error("[Active] Full Error:", error.response || error);
      const errorMessage =
        error.response?.data?.messsage ||
        error.response?.data?.message ||
        error.message ||
        "Failed to activate user";
      toast.error(errorMessage);
    }
  };

  // Suspend the user
  const handleSuspend = async (id) => {
    if (!id || typeof id !== "string") {
      console.error("[Suspend] Invalid ID provided:", id);
      toast.error("Invalid user ID");
      return;
    }
    const confirmSuspend = window.confirm(
      "Are you sure you want to suspend this user?"
    );
    if (!confirmSuspend) return;
    try {
      console.log("[Suspend] Sending request with payload:", { userId: id });
      const response = await api.post(
        `/api/auth/suspendUser/${id}?status=suspended`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("[Suspend] Backend response:", response?.data);
      toast.success("User suspended successfully!");
      // Refresh the current page to reflect updated user status
      getUsers(pagination.page);
      handleLeadsCostCloseModal();
    } catch (error) {
      console.error("[Suspend] Full Error:", error.response || error);
      const errorMessage =
        error.response?.data?.messsage ||
        error.response?.data?.message ||
        error.message ||
        "Failed to suspend user";
      console.error("[Suspend] Error Message:", errorMessage);
      toast.error(errorMessage);
    }
  };

  // Assign plan to user
  const handleAssign = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan to assign.");
      return;
    }
    try {
      await api.post("/api/plan/addUsersPlanByAdmin", {
        userId: selectedUserId,
        planId: selectedPlan,
      });
      toast.success("Plan assigned successfully!");
      // Refresh the current page to reflect updated plan
      getUsers(pagination.page);
      handleLeadsCostCloseModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to assign plan";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getUsers();
    getPlans();
  }, []);

  // Open Assign Plan Modal
  const handleAssignPlan = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  // Open View Details Modal
  const handleDetailsView = async (id) => {
    await getUserDataById(id);
    setViewShowModal(true);
  };

  // Open View Details Modal
  const handlePurchasedLeadsView = async (id) => {
    await getViewDetails(id);
    setViewModal(true);
  };

  // Close all modals
  const handleLeadsCostCloseModal = () => {
    setShowModal(false);
    setViewShowModal(false);
    setSelectedUserId(null);
    setSelectedPlan("");
    setError("");
    // setViewDetails({});
    setIsUpdateModalOpen(false);
  };

  // Open Update User Modal and close View Details Modal
  const handleToUpdateUser = (user) => {
    setSelectedUser(user);
    setUpdateFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      city: user.city || "",
    });
    setViewShowModal(false);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include userId in the payload
      const payload = {
        ...updateFormData,
        userId: selectedUser._id,
      };
      // Use PUT instead of PATCH to match the cURL request
      await api.put(`/api/auth/updateUser`, payload);
      toast.success("User updated successfully!");
      setIsUpdateModalOpen(false);
      // Refresh the current page to reflect updated user data
      getUsers(pagination.page);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Update failed";
      toast.error(errorMessage);
    }
  };

  // Pagination navigation
  const handlePageChange = (pageNumber) => {
    getUsers(pageNumber);
  };

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      getUsers(pagination.prevPage);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      getUsers(pagination.nextPage);
    }
  };

  // Generate page numbers for display
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

  //User Wallet
  // const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserWallet = (id) => {
    setSelectedUserId(id);
    setShowUserWalletModal(true);
    console.log("Wallet modal opened for user ID:", id);
  };

  const handleWalletRecharge = async () => {
    if (!walletAmount || isNaN(walletAmount)) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await api.post(
        "/api/plan/adminWalletRecharge",
        {
          userId: selectedUserId,
          amount: Number(walletAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        alert("Amount added successfully!");
        setShowUserWalletModal(false);
        setWalletAmount("");
      } else {
        alert(response?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error adding amount:", error);
      alert("Failed to add amount.");
    }
  };

  //

  const handleCurrentUserLeads = async (id) => {
    try {
      const res = await api.get(
        `/api/leadReplacement/getReplacementRequestOfUserById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const lead = res.data;
      // console.log(">>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<", res.data.data);

      setCurrentUserLeads(res.data.data);
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm max-w-6xl mx-auto">
          {error}
        </div>
      )}

      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => setShowAddNewUserModal(true)}
          className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add New User
        </button>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full sm:w-auto">
          <h3 className="text-lg font-semibold mb-4">Filter Users</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Filter by Name"
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
              placeholder="Filter by Email"
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Filter by City"
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="companyName"
              value={filters.companyName}
              onChange={handleFilterChange}
              placeholder="Filter by Company"
              className="p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {Array.isArray(filteredUsers) &&
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  user.userStatus === "active"
                    ? "bg-green-100 text-green-700"
                    : user.userStatus === "suspended"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                {user.userStatus}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    <span className="capitalize">
                      {user?.name?.[0] || "N/A"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user.name || "N/A"}
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-500">USER</span>
                  <div className="sm:ml-4">
                    <span className="text-gray-500">User ID</span>
                    <div className="sm:text-xl font-bold text-blue-600">
                      #{user._id}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">
                      Contact Details
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-900">
                      Business Info
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="text-gray-900 capitalize">
                          {user.companyName || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p className="text-gray-900">{user.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold text-gray-900">
                      Account Info
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full mt-1"></div>
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full mt-1"></div>
                      <div>
                        <p className="text-sm text-gray-500">Assigned Plan</p>
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">
                          {user?.plan?.planName || "No plan assigned"}
                        </span>
                        <span className="font-bold h-1.5">|</span>
                        <span> &#8377;{user?.plan?.price || "00"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleDetailsView(user._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => handlePurchasedLeadsView(user._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  Purchased Leads
                </button>
                <button
                  onClick={() => handleAssignPlan(user._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  Assign Plan
                </button>
                <button
                  onClick={() => handleUserWallet(user._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                  <FaWallet />
                  Wallet
                </button>
                <button
                  onClick={() => {
                    setShowLeadsModal(true);
                    handleCurrentUserLeads(user._id);
                  }}
                  className="bg-green-400 flex-1 flex items-center justify-center gap-2  hover:bg-green-600 text-white px-4 py-2 rounded text-sm">
                  <Eye className="w-4 h-4" />
                  Replacement
                </button>
                <ReplacementLeadsModal
                  show={showLeadsModal}
                  onClose={() => setShowLeadsModal(false)}
                  leads={currentUserLeads}
                />
              </div>
            </div>
          ))}
      </div>
      {/* Show User Wallet modal to add amount */}
      {showUserWalletModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setShowUserWalletModal(false)}>
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[90vw] sm:max-w-lg md:max-w-xl p-6 relative min-h-[30vh] max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add Amount in Wallet
                </h2>
              </div>

              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between items-center border-b py-2 gap-2">
                  <strong>Add Amount:</strong>
                  <input
                    type="number"
                    placeholder="500..."
                    value={walletAmount}
                    onChange={(e) => setWalletAmount(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full sm:w-1/2"
                  />
                </div>

                <div className="flex justify-end flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => setShowUserWalletModal(false)} // ✅ Cancel closes modal
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 text-sm w-full sm:w-auto">
                    Cancel
                  </button>
                  <button
                    onClick={handleWalletRecharge}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 text-sm w-full sm:w-auto">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      <AddNewUserModal
        show={showAddNewUserModal}
        onClose={() => setShowAddNewUserModal(false)}
        getUsers={getUsers}
        pagination={pagination}
      />
      {/* Pagination */}
      {pagination.totalDocs > 0 && (
        <div className="max-w-6xl mx-auto mt-6 flex flex-col items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.totalDocs)}{" "}
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
              aria-label="Previous page">
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
                aria-label={`Page ${page}`}>
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
              aria-label="Next page">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Update User Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update User</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={updateFormData.name}
                onChange={handleUpdateChange}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={updateFormData.email}
                onChange={handleUpdateChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                value={updateFormData.phone}
                onChange={handleUpdateChange}
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="city"
                value={updateFormData.city}
                onChange={handleUpdateChange}
                placeholder="City"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="companyName"
                value={updateFormData.companyName}
                onChange={handleUpdateChange}
                placeholder="Company Name"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Plan Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40"
            onClick={handleLeadsCostCloseModal}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[90vw] sm:max-w-lg md:max-w-xl p-4 sm:p-6 relative min-h-[30vh] max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Assign Plan</h2>
              <button
                onClick={handleLeadsCostCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
                aria-label="Close modal">
                ✕
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Select Plan
                  </label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Plan</option>
                    {plans.map((plan) => (
                      <option
                        key={plan._id}
                        value={plan._id}
                        className="flex justify-evenly align-middle">
                        {`${plan.planName} - ₹${plan.price}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between flex-col sm:flex-row gap-2">
                  <div className="flex justify-start">
                    <span>No. of Plans {plans.length}</span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleLeadsCostCloseModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm w-full sm:w-auto">
                      Cancel
                    </button>
                    <button
                      onClick={handleAssign}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300 text-sm w-full sm:w-auto"
                      disabled={!selectedPlan}>
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Details Modal */}
      {viewShowModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={handleLeadsCostCloseModal}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full md:max-w-[70vw] p-6 relative min-h-[30vh] max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  View User Details
                </h2>
                <button
                  onClick={handleLeadsCostCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-xl focus:outline-none"
                  aria-label="Close modal">
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between border-b py-2">
                  <strong>Name:</strong> <span>{userData?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <strong>Email:</strong>{" "}
                  <span>{userData?.email || "N/A"}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <strong>Phone:</strong>{" "}
                  <span>{userData?.phone || "N/A"}</span>
                </div>
                {/* <div className="flex justify-between border-b py-2">
                  <strong>Company:</strong>{" "}
                  <span>{viewDetails?.user?.company || "N/A"}</span>
                </div> */}
                <div className="flex justify-between border-b py-2">
                  <strong>City:</strong> <span>{userData?.city || "N/A"}</span>
                </div>
                {/* <div className="flex justify-between border-b py-2">
                  <strong>Role:</strong>{" "}
                  <span>{viewDetails.role || "N/A"}</span>
                </div> */}
                <div className="flex justify-between border-b py-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 text-xs text-white font-semibold capitalize rounded-full ${
                      viewDetails?.user?.userStatus === "active"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}>
                    {userData?.userStatus}
                  </span>
                </div>
              </div>
              <div className="flex justify-between flex-col sm:flex-row gap-3 mt-6 border-b pb-4">
                <div className="flex justify-items-start text-center">
                  <p className="font-bold">Total Wallet Amount : &nbsp;</p>
                  <span className={`text-black   `}>
                    &#8377;
                    {userData?.wallet > 0 ? userData?.wallet : " 00 "}
                  </span>
                </div>
                <div className="flex gap-4 justify-end">
                  {userData?.userStatus === "active" ? (
                    <button
                      onClick={() => handleSuspend(userData?._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition-all duration-200 text-sm w-full sm:w-auto"
                      disabled={userData?.userStatus === "suspended"}>
                      Suspend User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(userData?._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer transition-all duration-200 text-sm w-full sm:w-auto"
                      disabled={userData?.userStatus === "active"}>
                      Re-activate User
                    </button>
                  )}
                  <button
                    onClick={() => handleToUpdateUser(userData)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 text-sm w-full sm:w-auto">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {viewModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={handleLeadsCostCloseModal}>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl shadow-2xl w-full md:max-w-[80vw] p-6 relative min-h-[30vh] max-h-[90vh] overflow-y-auto border border-gray-200">
                <div className="py-4 min-h-[150px] md:min-w-[60vw]">
                  <div className="flex  justify-between w-full items-center">
                    <h2 className="text-lg font-semibold">User Leads:</h2>
                    <button
                      onClick={() => setViewModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-xl focus:outline-none"
                      aria-label="Close modal">
                      ✕
                    </button>
                  </div>
                  <div className="md:max-w-[80vw] mt-4">
                    <div className="overflow-x-auto space-y-2">
                      {Array.isArray(viewDetails?.leads) &&
                      viewDetails?.leads?.length > 0 ? (
                        viewDetails?.leads.map((lead) => (
                          <div
                            key={lead?.leadId}
                            className="py-2 px-2 border flex justify-around items-center gap-8 rounded-lg min-h-[100px] shadow-sm">
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Lead ID
                              </span>
                              <span className="text-sm">{lead?.leadId}</span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Name
                              </span>
                              <span className="text-sm">{lead?.name}</span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Email
                              </span>
                              <span className="text-sm">{lead?.email}</span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Travel Date
                              </span>
                              <span className="text-sm">
                                {moment(lead?.travelDate).format(
                                  "DD-MM-YYYY HH:MM A"
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Travel Time
                              </span>
                              <span className="text-sm">
                                {lead?.travelTime}
                              </span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Trip Type
                              </span>
                              <span className="text-sm">{lead?.tripType}</span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Total Members
                              </span>
                              <span className="text-sm">
                                {lead?.totalMembers?.adult +
                                  lead?.totalMembers?.children +
                                  lead?.totalMembers?.infant}
                              </span>
                            </div>
                            <div className="flex flex-col h-full justify-center gap-2">
                              <span className="text-sm font-medium min-w-[50px]">
                                Replacement Status
                              </span>
                              <span
                                className={`text-sm capitalize w-fit px-2 py-1 rounded-full text-white ${
                                  statusColourMap[lead?.replacementStatus]
                                }`}>
                                {lead?.replacementStatus}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500">
                          No leads found for this user.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;

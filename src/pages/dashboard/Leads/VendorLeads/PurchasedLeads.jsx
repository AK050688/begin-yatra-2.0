import api from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdFlightTakeoff } from "react-icons/md";
import { BiSearch, BiFilter } from "react-icons/bi";
import { BsCalendar3, BsInfoCircle } from "react-icons/bs";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import { Users } from "lucide-react";

const PurchaseLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [leadTypeFilter, setLeadTypeFilter] = useState("all");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [replacementReason, setReplacementReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  // const [leadStatus, setLeadStatus] = useState("");

  const token = useSelector(selectAccessToken);

  const [stats, setStats] = useState({
    totalLeads: 0,
    totalSpent: 0,
    thisMonth: 0,
  });

  const maskInfo = (value) => (value ? "****" : "N/A");

  const user = useSelector(selectUser);

  const userId = user?._id;
  const statusColourMap = {
    approved: "bg-orange-400",
    rejected: "bg-red-400",
    pending: "bg-yellow-400",
    "no-replacement": "bg-green-400",
  };
  const fetchLeadsData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/leads/getUserLead/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "ressponse");
      console.log(response.data.data, "ressponse >>>>>>>>>>>>>>> ");
      const leadsData = response.data?.data || [];
      console.log("Leads >>>>>>>>>>>", leadsData);

      setLeads(leadsData);
      setFilteredLeads(leadsData);

      const purchasedLeads = leadsData;
      const totalLeads = purchasedLeads.length;
      const totalSpent = purchasedLeads.reduce(
        (sum, lead) => sum + (lead.cost || 0),
        0
      );
      const currentMonth = new Date().getMonth();
      const thisMonth = purchasedLeads.filter(
        (lead) =>
          lead.createdAt && new Date(lead.createdAt).getMonth() === currentMonth
      ).length;

      setStats({ totalLeads, totalSpent, thisMonth });
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
      setFilteredLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLeadReplacement = (id) => {
    if (!token) {
      setSubmitMessage("Please log in to request a lead replacement.");
      return;
    }

    if (!id) {
      setSubmitMessage("Invalid lead ID. Please try again.");
      return;
    }

    setSelectedLeadId(id);
    setIsModalOpen(true);
    setReplacementReason("");
    setSubmitMessage("");
  };

  const handleSubmitReplacement = async () => {
    if (!replacementReason.trim()) {
      setSubmitMessage("Please provide a reason for replacement.");
      return;
    }

    if (!selectedLeadId) {
      setSubmitMessage("Invalid lead ID.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post(
        "/api/leadReplacement/requestLeadReplacement",
        {
          leadId: selectedLeadId,
          reason: replacementReason.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setReplacementReason("");
        return setSubmitMessage(response.data.messsage);
      }

      if (response.status === 201) {
        setSubmitMessage("Replacement request submitted successfully!");
        setReplacementReason("");
        setSubmitMessage("");
        await fetchLeadsData();
        setIsModalOpen(false);
      } else {
        setSubmitMessage("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting replacement request:", error);
      const errorMessage =
        error.response?.status === 400
          ? error.response?.data?.message ||
            "Invalid request. Please check your input and try again."
          : error.response?.status === 401
          ? "Unauthorized access. Please log in again."
          : error.response?.data?.message ||
            "Failed to submit replacement request. Please try again.";
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  // fetchLeadsData();
  useEffect(() => {
    fetchLeadsData();
  }, []);

  const applyFilters = () => {
    let filtered = [...leads];
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (lead.destination || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (lead.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (lead.leadId || lead._id || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (leadTypeFilter !== "all") {
      filtered = filtered.filter(
        (lead) => (lead.tripType || "") === leadTypeFilter
      );
    }

    if (destinationFilter) {
      filtered = filtered.filter((lead) =>
        (lead.destination || "")
          .toLowerCase()
          .includes(destinationFilter.toLowerCase())
      );
    }

    if (sourceFilter) {
      filtered = filtered.filter((lead) =>
        (lead.city || "").toLowerCase().includes(sourceFilter.toLowerCase())
      );
    }

    console.log("Filtered Leads:", filtered);
    setFilteredLeads(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, leadTypeFilter, destinationFilter, sourceFilter, leads]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <FiShoppingBag className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600">
            My Purchased Leads
          </h1>
        </div>
        <p className="text-gray-600">
          Manage and view all your purchased travel leads
        </p>
      </div>

      <div className="p-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={<FiShoppingBag />}
            color="blue"
            loading={loading}
          />
          <StatCard
            title="Total Spent"
            value={`₹${stats.totalSpent}`}
            icon="₹"
            color="green"
            loading={loading}
          />
          <StatCard
            title="This Month"
            value={stats.thisMonth}
            icon={<BsCalendar3 />}
            color="purple"
            loading={loading}
          />
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center gap-3 mb-4">
            <div className="flex align-middle  ">
              <div className="bg-blue-500 p-2 flex items-center rounded-lg">
                <BiFilter className="text-white text-xl" />
              </div>
              <h4 className="text-xl text-center p-2 font-semibold text-gray-800">
                Search & Filter
              </h4>
            </div>
            {/* <button
              onClick={() => handleRequestLeadReplacement()}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
            >
              Request Replacement
            </button> */}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, destination, or city..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={leadTypeFilter}
              onChange={(e) => setLeadTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Types</option>
              <option value="Domestic">Domestic</option>
              <option value="International">International</option>
            </select>
            <input
              type="text"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              placeholder="Source City"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <input
              type="text"
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              placeholder="Destination"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={fetchLeadsData}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Purchased Leads ({filteredLeads.length} of {stats.totalLeads})
          </h2>
        </div>

        {/* Lead Cards */}
        <div className="space-y-6">
          {loading ? (
            <LoadingSpinner />
          ) : filteredLeads.length === 0 ? (
            <EmptyState />
          ) : (
            filteredLeads.map(({ lead, cost, replacementStatus }) => (
              <div
                key={lead?._id || lead?.leadId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                {/* Lead Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold capitalize text-xl">
                        {(lead?.name || "N/A").charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold capitalize text-gray-900 text-xl">
                        {lead?.name || "N/A"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Lead ID: {lead?.leadId || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                        (lead?.tripType || "") === "Domestic"
                          ? "bg-green-100 text-green-800"
                          : (lead?.tripType || "") === "International"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lead?.tripType || "N/A"}
                    </span>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Cost</span>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{cost || 0}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-200 pt-6">
                  {/* Contact Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AiOutlineMail className="text-gray-600 text-lg" />
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Contact
                      </h4>
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-900 text-base">
                        <span className="font-medium">Email: </span>
                        {lead?.email || maskInfo(lead?.email)}
                      </p>
                      <p className="text-gray-900 text-base break-all">
                        <span className="font-medium">Phone: </span>
                        {lead?.phone || maskInfo(lead?.phone)}
                      </p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MdFlightTakeoff className="text-gray-600 text-lg" />
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Trip Details
                      </h4>
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-900 text-base">
                        <span className="font-medium">From: </span>
                        {lead?.city || "N/A"}
                      </p>
                      <p className="text-gray-900 text-base">
                        <span className="font-medium">To: </span>
                        {lead?.destination || "N/A"}
                      </p>
                    </div>
                  </div>
                  {/* Travel Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BsCalendar3 className="text-gray-600 text-lg" />
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Travel Details
                      </h4>
                    </div>
                    <div className="ml-6">
                      <p className="text-gray-900 text-base">
                        <span className="font-medium">Date: </span>
                        {lead?.travelDate
                          ? new Date(
                              lead?.travelDate.replace(/^\+0+/, "")
                            ).toLocaleDateString("en-GB")
                          : "N/A"}
                      </p>
                      <p className="text-gray-900 text-base">
                        <span className="font-medium">Time: </span>
                        {lead?.travelTime || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="text-gray-600 text-lg" />
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Total Members
                      </h4>
                    </div>
                    <div className="ml-6 flex flex-col">
                      <div className="flex items-center gap-2">
                        <label className="font-medium">Adults:</label>
                        {lead?.totalMembers?.adult}
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="font-medium">Children:</label>
                        {lead?.totalMembers?.children}
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="font-medium">Infants:</label>
                        {lead?.totalMembers?.infant}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Purchase Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BsInfoCircle className="text-gray-600 text-lg" />
                      <h4 className="font-semibold text-gray-700 text-sm">
                        Purchase Info
                      </h4>
                    </div>
                    <div className="space-y-2 ml-6">
                      <p className="text-gray-900 text-base">
                        <span className="font-medium">Purchased: </span>
                        {lead?.createdAt
                          ? new Date(lead?.createdAt).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </p>
                      <p className="text-gray-900 text-base capitalize">
                        <span className="font-medium">Status: </span>
                        <span
                          className={`${statusColourMap[replacementStatus]} text-white px-2 py-1 rounded-md capitalize`}
                        >
                          {replacementStatus || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Centering the button */}
                  <div className="flex justify-center items-center">
                    {replacementStatus === "no-replacement" ? (
                      <button
                        onClick={() =>
                          handleRequestLeadReplacement(lead._id || lead.leadId)
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                      >
                        Request Replacement
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Lead Replacement */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Request Lead Replacement
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for Replacement
              </label>
              <textarea
                value={replacementReason}
                onChange={(e) => setReplacementReason(e.target.value)}
                placeholder="Please explain why you want to replace this lead..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            {submitMessage && (
              <p
                className={`mb-4 text-sm ${
                  submitMessage.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMessage}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                onClick={handleSubmitReplacement}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable UI Components
const StatCard = ({ title, value, icon, color, loading }) => (
  <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-6`}>
    <div className="flex items-center gap-3">
      <div className={`bg-${color}-500 p-2 rounded-lg`}>
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div>
        <p className={`text-${color}-600 text-sm font-medium`}>{title}</p>
        <h3 className={`text-2xl font-bold text-${color}-700`}>
          {loading ? "..." : value}
        </h3>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="text-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    <p className="mt-4 text-gray-600">Loading leads...</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
    <p className="text-gray-600">No purchased leads found.</p>
  </div>
);

export default PurchaseLeads;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import buyLead  from "../../../store/LeadSlice";
import { selectUser } from "../../../store/userSlice";
import api from "../../../Api/ApiService";

const TravelTable = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.data?.accessToken);
  const [savedLeads, setSavedLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [error, setError] = useState(null);
  const { wallet } = useSelector((state) => state.leads);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(selectUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeadType, setSelectedLeadType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    if (!user?._id) return;

    try {
      const res = await api.get(`/api/auth/getUserById/${user?._id}`);
      setCurrentUser(res.data?.data || null);
    } catch (err) {
      console.error("Failed to fetch user by ID", err);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const [pagination, setPagination] = useState({
    totalDocs: 0,
    limit: 50,
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

  const generateLeadId = () => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 14);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `lead_${timestamp}_${random}`;
  };

  const getLeads = async (page) => {
    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      const response = await api.get(`/api/leads?page=${page}&limit=${50}`);
      console.log("re", response.data.data.leads);
      const { leads, ...paginate } = response.data.data;

      console.log("my leads", leads);

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
        setFilteredLeads([]);
        return;
      }

      const normalizedLeads = leads.map((lead) => ({
        id: lead._id || Date.now() + Math.random(),
        leadId: lead.leadId || generateLeadId(),
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
        children: String(lead.children || 0),
        infant: String(lead.infant || 0),
        tripType: lead.tripType || "",
        totalMembers: lead.totalMembers,
        leadType: lead.leadType || "",
        satatus: lead.satatus || "",
        cost: lead.cost || "",
        createdAt: lead.createdAt
          ? new Date(lead.createdAt).toLocaleString()
          : new Date().toLocaleString(),
      }));

      setSavedLeads(normalizedLeads);
      setFilteredLeads(normalizedLeads);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setSavedLeads([]);
      setFilteredLeads([]);
    }
  };

  useEffect(() => {
    const filtered = savedLeads.filter((lead) => {
      const matchesSearch = lead.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesLeadType = selectedLeadType
        ? lead.leadType === selectedLeadType
        : true;
      return matchesSearch && matchesLeadType;
    });
    setFilteredLeads(filtered);
  }, [searchQuery, selectedLeadType, savedLeads]);

  useEffect(() => {
    getLeads(1);
  }, []);

  const handleBuyClick = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const confirmBuy = async () => {
    setLoading(true);
    if (!selectedLead) return;

    if (wallet < selectedLead.cost) {
      alert("Insufficient wallet balance!");
      setShowModal(false);
      return;
    }

    try {
      const res = await api.post(
        "/api/leads/buyLead",
        { leadId: selectedLead.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      location.reload(true);
      setShowModal(false);
    } catch (error) {
      console.error("Buy Lead Error:", error.response?.data || error.message);
      setShowModal(false);
    } finally {
      setLoading(false);
    }
  };

  const cancelBuy = () => {
    setSelectedLead(null);
    setShowModal(false);
  };

  if (error) {
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="bg-white p-4 rounded shadow mt-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-lg text-gray-800">
              Search & Filters
            </h4>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <select
              value={selectedLeadType}
              onChange={(e) => setSelectedLeadType(e.target.value)}
              className="w-full sm:w-1/2 p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Lead Types</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>
      </div>
      <div className="min-h-screen relative bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-800/50 backdrop-blur-md z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="w-full bg-white/90 shadow-md backdrop-blur-lg overflow-x-auto">
            <table className="min-w-full table-auto text-sm border-0">
              <thead className="bg-blue-400 text-white text-xs sm:text-sm font-semibold">
                <tr>
                  <th className="px-4 py-4 text-left">Customer</th>
                  <th className="px-4 py-4 text-left">From City</th>
                  <th className="px-4 py-4 text-left">Destination</th>
                  <th className="px-4 py-4 text-left">Travel Date</th>
                  <th className="px-4 py-4 text-left">TravelTime</th>
                  <th className="px-4 py-4 text-left">Category</th>
                  <th className="px-4 py-4 text-left">Price</th>
                  <th className="px-4 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800 text-xs sm:text-sm">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-4 text-center text-gray-600"
                    >
                      No leads match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id || lead._id}
                      className="hover:bg-gray-50 border-b h-16"
                      style={{ height: "50px !important" }}
                    >
                      <td className="px-4 py-4">{lead.name}</td>
                      <td className="px-4 py-4">{lead.city}</td>
                      <td className="px-4 py-3">{lead.destination}</td>
                      <td className="px-4 py-3">{lead.travelDate}</td>
                      <td className="px-4 py-3">{lead.travelTime}</td>
                      <td className="px-4 py-3">{lead.leadType}</td>
                      <td className="px-4 py-3 font-semibold text-yellow-500">
                        ₹{lead.cost}
                      </td>
                      <td className="px-4 py-3">
                        {lead.satatus === "sold" ? (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                            Sold
                          </span>
                        ) : (
                          <button
                            disabled={loading}
                            onClick={() => handleBuyClick(lead)}
                            className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            {loading ? "Processing..." : "Buy Now"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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

      {/* Confirmation Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-6 w-11/12 max-w-md shadow-2xl border border-gray-300">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Purchase
            </h2>
            <p className="mb-2">Wallet Balance: ₹{currentUser?.wallet || 0}</p>
            <p className="mb-4">
              This lead costs ₹{selectedLead.cost}. Do you want to proceed?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelBuy}
                disabled={loading}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                {loading ? "Processing..." : "Cancel"}
              </button>
              <button
                onClick={confirmBuy}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Yes, Buy!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TravelTable;

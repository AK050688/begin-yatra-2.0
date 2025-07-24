import { BsArrowLeft } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import LeadsResults from "./LeadsResults";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../Api/ApiService";

const MyLeads = () => {
  const navigate = useNavigate();
  const [savedLeads, setSavedLeads] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    destination: "",
    city: "",
    tripType: "",
    satatus: "",
    leadType: "",
  });

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      const response = await api.get(`/api/leads?page=${page}&limit=${50}`);
      // console.log("re", response.data.data.leads);

      const { leads, ...paginate } = response.data.data;

      // console.log("my leads", leads);

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
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setSavedLeads([]);
    }
  };

  useEffect(() => {
    getLeads();
  }, []);

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

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex flex-col-reverse gap-4 sm:flex-row justify-between items-start mb-2 sm:mb-8">
        <div className="block">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            All Travel Leads
          </h1>
          <p className="text-gray-600">
            Browse and manage travel leads with advanced filtering
          </p>
        </div>
        <button
          onClick={handleGoToDashboard}
          className="flex items-center gap-2 border cursor-pointer border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-lg px-6 py-2 transition-colors duration-200"
        >
          <BsArrowLeft className="text-lg" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <div className="mt-2 sm:mt-8 w-full m-0 sm:m-4 p-4 shadow-md border rounded-lg">
        <h4 className="text-2xl mt-10 text-blue-400">Search & Filter</h4>
        <p className="text-gray-400">
          Refine your leads search with multiple advanced filters
        </p>

        <form className="mt-4 space-y-4">
          {/* Main Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
            <BiSearch className="text-2xl text-gray-500" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by Name, Email, Destination City, or Lead ID..."
              className="w-full border-0 outline-none"
            />
          </div>

          {/* Filter Inputs */}
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
              className="flex-1 min-w-[250px] h-10 p-4 border border-gray-300 rounded-lg"
              placeholder="Search by destination..."
            />
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="flex-1 min-w-[250px] h-10 p-4 border border-gray-300 rounded-lg"
              placeholder="Search by current city..."
            />
            <select
              name="tripType"
              value={filters.tripType}
              onChange={handleFilterChange}
              className="flex-1 min-w-[250px] p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Trip Types</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Couples">Couples</option>
              <option value="Senior_citizen">Senior Citizen</option>
              <option value="Others">Others</option>
              {/* Add more tripType options based on your API data */}
            </select>
          </div>

          {/* Additional Dropdowns */}
          <div className="flex flex-wrap gap-4">
            <select
              name="satatus" // Changed from status to satatus
              value={filters.satatus}
              onChange={handleFilterChange}
              className="flex-1 min-w-[250px] p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Choose Status--</option>
              <option value="buy">Buy</option>
              <option value="sold">Sold</option>
            </select>
            <select
              name="leadType"
              value={filters.leadType}
              onChange={handleFilterChange}
              className="flex-1 min-w-[250px] p-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Choose Lead Type--</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
        </form>
      </div>

      <LeadsResults
        filters={filters}
        leads={savedLeads}
        getLeads={getLeads}
        totalLeads={pagination.totalDocs}
      />
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
  );
};

export default MyLeads;

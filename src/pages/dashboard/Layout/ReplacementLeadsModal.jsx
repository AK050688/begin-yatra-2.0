import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../Api/ApiService";
import { selectAccessToken } from "../../../store/userSlice";
import { toast } from "react-toastify";

const ReplacementLeadsModal = ({ show, onClose, leads }) => {
  console.log("?????????", leads);

  const accessToken = useSelector(selectAccessToken);
  const [allLeads, setAllLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statusMap = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      badge: "bg-yellow-500",
    },
    approved: {
      bg: "bg-green-100",
      text: "text-green-800",
      badge: "bg-green-500",
    },
    rejected: {
      bg: "bg-red-100",
      text: "text-red-800",
      badge: "bg-red-500",
    },
  };

  const fetchReplacementLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        "/api/leadReplacement/getAllLeadReplacementRequests",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const leads = response?.data?.data?.docs;
      console.log("Leadssss", leads);

      setAllLeads(Array.isArray(leads) ? leads : []);
    } catch (error) {
      console.error("Error fetching replacement leads:", error);
      toast.error("Failed to fetch replacement leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleReplacementQuery = async (newStatus, id) => {
    try {
      setIsLoading(true);
      await api.post(
        "/api/leadReplacement/approveLeadReplacement",
        { requestId: id, action: newStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchReplacementLeads();
      toast.success(`Replacement request ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update replacement request.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (show) leads;
  }, [show]);

  useEffect(() => {
    setFilteredLeads(leads.filter((lead) => lead.status === statusFilter));
  }, [statusFilter, leads]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white w-[95%] sm:w-[90%] max-w-6xl max-h-[85vh] rounded-xl shadow-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
            Lead Replacement Requests
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                statusFilter === status
                  ? `${statusMap[status].bg} ${statusMap[status].text} shadow-md`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="text-gray-600 mt-2">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <p className="text-center text-gray-600 py-10">
              No {statusFilter} leads found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Requested Date & Time
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-4 py-3">
                      City
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Destination
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Travel Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Days
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Members
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Lead Type
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Trip Type
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Cost
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Reason
                    </th>

                    {statusFilter === "pending" && (
                      <th scope="col" className="px-4 py-3">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead?._id}
                      className="border-b hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 capitalize">
                        {lead?.createdAt.replace(
                          /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
                          "$3-$2-$1 $4:$5"
                        ) || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.email || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.phone || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.city || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.destination || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.travelDate.split("T")[0] || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.travelTime || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.totalMembers.adult +
                          lead?.lead?.totalMembers.children +
                          lead?.lead?.totalMembers.infant || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.leadType || "N/A"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {lead?.lead?.tripType || "N/A"}
                      </td>
                      <td className="px-4 py-3">{lead?.cost || "N/A"}</td>
                      <td className="px-4 py-3">{lead?.reason || "N/A"}</td>

                      {statusFilter === "pending" && (
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              disabled={isLoading}
                              onClick={() =>
                                handleReplacementQuery("approved", lead?._id)
                              }
                              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-xs font-medium transition-colors duration-200"
                            >
                              Approve
                            </button>
                            <button
                              disabled={isLoading}
                              onClick={() =>
                                handleReplacementQuery("rejected", lead?._id)
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-xs font-medium transition-colors duration-200"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplacementLeadsModal;

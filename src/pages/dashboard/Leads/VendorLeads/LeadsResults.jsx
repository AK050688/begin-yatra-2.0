import React, { useEffect, useState } from "react";
import api from "../../../../Api/ApiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../../../../store/userSlice";

const LeadsResults = ({ filters, leads, getLeads, totalLeads }) => {
  const token = useSelector((state) => state?.auth?.data?.accessToken);
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [userData, setUserData] = useState();
  const user = useSelector(selectUser);

  const leadsData = async () => {
    await leads;
    console.log("leads ❓❓❓❓❓", leads);

    setAllLeads(leads);
  };

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/auth/getUserById/${user._id}`);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    leadsData();
    getUserData();
  });

  const confirmBuy = async () => {
    setLoading(true);
    if (!selectedLead) return;

    if (userData.wallet < selectedLead.cost) {
      alert("Insufficient wallet balance!");
      setShowModal(false);
      return;
    }

    try {
      await api.post(
        "/api/leads/buyLead",
        { leadId: selectedLead.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await getLeads();
      toast.info("Lead Buy successfully...");
      // console.log("Response:", res.data);
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

  // const fetchLeads = async () => {
  //   try {
  //     const res = await api.get("/api/leads");
  //     console.log("???????????????",res);

  //     setAllLeads(res.data.data || []);
  //     console.log(res.data.data, ">>>>>>>>>>>>>>>>>");
  //   } catch (error) {
  //     console.error("Error fetching leads:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchLeads();
  // }, []);

  const handleBuyClick = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  // Apply filters to leads
  const filteredLeads = allLeads.filter((lead) => {
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      lead.name.toLowerCase().includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm) ||
      lead.destination.toLowerCase().includes(searchTerm) ||
      lead.leadId.toLowerCase().includes(searchTerm);

    const matchesDestination =
      !filters.destination ||
      lead.destination
        .toLowerCase()
        .includes(filters.destination.toLowerCase());

    const matchesCity =
      !filters.city ||
      lead.city.toLowerCase().includes(filters.city.toLowerCase());

    const matchesTripType =
      !filters.tripType || lead.tripType === filters.tripType;

    const matchesSatatus = !filters.satatus || lead.satatus === filters.satatus;

    const matchesLeadType =
      !filters.leadType || lead.leadType === filters.leadType;

    return (
      matchesSearch &&
      matchesDestination &&
      matchesCity &&
      matchesTripType &&
      matchesSatatus &&
      matchesLeadType
    );
  });

  // console.log("filteredLeads", filteredLeads);

  // if (loading) return <div className="text-center py-10">Loading leads...</div>;

  return (
    <div className="p-6">
      <h5 className="text-xl font-bold text-blue-400">Leads Results</h5>
      <p className="text-gray-400 mb-4">
        Showing {filteredLeads.length} of {totalLeads} leads
      </p>

      {filteredLeads.length === 0 ? (
        <p className="text-gray-500">No leads match the current filters.</p>
      ) : (
        filteredLeads.map((lead) => (
          <div
            key={lead._id}
            className="shadow-lg p-6 mb-6 bg-white rounded-lg border border-gray-100"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="border text-sm rounded-full px-3 py-1 bg-blue-100 text-blue-600 font-medium">
                  {lead.leadId}
                </span>
                <p className="font-bold text-gray-800 text-lg">{lead.name}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="border text-sm rounded-full px-3 py-1 bg-blue-100 text-blue-600 font-medium">
                  {lead.tripType}
                </span>
              </div>{" "}
              {/* Added missing closing tag */}
            </div>

            {/* Middle Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="grid gap-1">
                <label className="text-sm text-gray-500 font-medium">
                  Current City
                </label>
                <p className="text-gray-800">{lead.city}</p>
                <label className="text-sm text-gray-500 font-medium mt-2">
                  Travel Date
                </label>
                <p className="text-gray-800">
                  {new Date(lead.travelDate).toLocaleDateString()}
                </p>
                <label className="text-sm text-gray-500 font-medium mt-2">
                  Travel Time
                </label>
                <p className="text-gray-800">{lead.travelTime}</p>
                <label className="text-sm text-gray-500 font-medium mt-2">
                  Trip Type
                </label>
                <p className="text-gray-800">{lead.leadType}</p>
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-gray-500 font-medium">
                  Destination
                </label>
                <p className="text-gray-800">{lead.destination}</p>
                <label className="text-sm text-gray-500 font-medium mt-2">
                  Cost
                </label>
                <p className="text-gray-800">₹ {lead.cost} </p>
                <label className="text-sm text-gray-500 font-medium mt-2">
                  Status
                </label>
                <p>
                  <span
                    className={`text-sm font-semibold rounded-full px-3 py-1 ${
                      lead.satatus === "buy"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {lead.satatus}
                  </span>
                </p>
                <label className="text-sm text-gray-500 font-medium">
                  Total Members:
                </label>
                <div className="text-gray-800 flex gap-2 items-center">
                  <div className="flex flex-col items-center">
                    <label className="text-sm text-gray-500 font-medium">
                      Adults
                    </label>
                    <p>{lead?.totalMembers?.adult || "0"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-sm text-gray-500 font-medium">
                      Children
                    </label>
                    <p>{lead?.totalMembers?.children || "0"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <label className="text-sm text-gray-500 font-medium">
                      Infants
                    </label>
                    <p>{lead?.totalMembers?.infant || "0"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {lead.satatus === "buy" ? (
              <button
                onClick={() => handleBuyClick(lead)}
                className="w-full rounded-lg bg-green-500 text-white p-3 mt-4 hover:bg-green-600 transition-colors duration-200 font-medium"
              >
                Buy Now
              </button>
            ) : (
              <button
                disabled
                className="w-full rounded-lg bg-red-500 text-white p-3 mt-4 transition-colors duration-200 font-medium"
              >
                Sold
              </button>
            )}
          </div>
        ))
      )}
      {showModal && selectedLead && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg p-6 w-11/12 max-w-md shadow-2xl border border-gray-300">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Purchase
            </h2>
            <p className="mb-2">Wallet Balance: ₹{userData.wallet || 0}</p>
            <p className="mb-4">
              This lead costs ₹{selectedLead.cost}. Do you want to proceed?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelBuy}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={confirmBuy}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Yes, Buy Now!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsResults;

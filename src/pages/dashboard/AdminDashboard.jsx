import React, { useEffect, useState } from "react";
import api from "../../Api/ApiService";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const token = useSelector(selectAccessToken);
  const [recentLeads, setRecentLeads] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalLeads: 0,
    totalInternational: 0,
    totalDomestic: 0,
    totalUser: 0,
  });
  const navigate = useNavigate();

  const adminUser = useSelector(selectUser);

  const leadsh = [
    {
      category: "Total Leads",
      value: dashboard.totalLeads,
      color: "bg-blue-100 text-blue-600",
      border: "border-l-4 border-blue-500",
    },
    {
      category: "Internationals",
      value: dashboard.totalInternational,
      color: "bg-purple-100 text-purple-600",
      border: "border-l-4 border-purple-500",
    },
    {
      category: "Domestic",
      value: dashboard.totalDomestic,
      color: "bg-green-100 text-blue-600",
      border: "border-l-4 border-blue-500",
    },
    {
      category: "Total Users",
      value: dashboard.totalUser,
      color: "bg-orange-100 text-purple-600",
      border: "border-l-4 border-purple-500",
    },
  ];

  const topDestinations = [
    { name: "Paris", visits: 120 },
    { name: "New York", visits: 95 },
    { name: "Tokyo", visits: 80 },
    { name: "Sydney", visits: 65 },
  ];

  const maxVisits = Math.max(...topDestinations.map((dest) => dest.visits));

  const getDashboard = async () => {
    try {
      const response = await api.get("/api/auth/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLeads = async () => {
    try {
      const response = await api.get("/api/leads?limit=4", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecentLeads(response.data.data.leads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeads();
    getDashboard();
  }, []);
  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 ">
      {/* Total Leads Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Admin Dashboard{" "}
          </h1>
          <div className="flex justify-center align-middle">
            <p className="text-xl">Admin Name :</p>
            <span
              className="text-xl px-1 text-blue-400 underline cursor-pointer"
              onClick={() => navigate(`admin-profile`)}
            >
              {adminUser?.name}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {leadsh.map((lead, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 rounded shadow ${lead.color} ${lead.border}`}
            >
              <p className="text-gray-700 text-sm sm:text-base">
                {lead.category}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1">
                {lead.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                As of June 09, 2025
              </p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          Total leads in the system:{" "}
          <span className="font-semibold">{dashboard.totalLeads}</span>
        </p>
      </div>

      {/* Recent Leads Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Recent Leads
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recentLeads.map((lead, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-4 rounded-lg shadow border-l-4 border-blue-500"
            >
              <h2 className="text-lg capitalize sm:text-xl font-semibold text-gray-800">
                {lead.name || "N/A"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {lead.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {lead.city}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Destinations Section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Top Destinations
        </h1>
        <div className="space-y-3 sm:space-y-4">
          {topDestinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col gap-2 border-l-4 border-purple-500"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {destination.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Visited: {destination.visits} times
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <div
                  className="bg-orange-500 h-2 sm:h-3 rounded-full"
                  style={{
                    width: `${(destination.visits / maxVisits) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

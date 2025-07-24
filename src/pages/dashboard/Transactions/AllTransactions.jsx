// File: Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Search, RefreshCcw, Download } from "lucide-react";
import api from "../../../Api/ApiService";
import moment from "moment";
import { useDebounce } from "@uidotdev/usehooks";
// import ReplacementLeadsModal from "./layout/ReplacementLeadsModal";
// import { useSelector } from "react-redux";

const defaultPagination = {
  page: 1,
  limit: 10,
  totalDocs: 10,
};

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState("All");
  const [pagination, setPagination] = useState(defaultPagination);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // const token = useSelector((state) => state?.auth?.data?.accessToken);

  // const allTransactionsUser = async () => {
  //   console.log("😢😢😢😢", token);
  //   try {
  //     const response = await api.get("/api/transactions/all-tran-user", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   allTransactionsUser();
  // });

  const addQueryToUrl = (url = "") => {
    if (pagination.page) {
      url += `page=${pagination.page}&`;
    }
    if (pagination.limit) {
      url += `limit=${pagination.limit}&`;
    }
    if (selectedStatus !== "All") {
      url += `status=${selectedStatus}&`;
    }
    if (dateRange.startDate) {
      url += `startDate=${dateRange.startDate}&`;
    }
    if (dateRange.endDate) {
      url += `endDate=${dateRange.endDate}&`;
    }
    if (selectedMethod && selectedMethod !== "All") {
      url += `method=${selectedMethod}&`;
    }
    if (debouncedQuery) {
      url += `search=${debouncedQuery}&`;
    }

    return url.substring(0, url.length - 1);
  };

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        addQueryToUrl(`/api/transactions/all-transaction?`)
      );
      setTransactions(response.data.data.docs || []);
      setPagination({
        limit: response?.data?.data?.limit || 10,
        page: response?.data?.data?.page || 1,
        totalDocs: response?.data?.data?.totalDocs || 10,
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [
    pagination.page,
    pagination.limit,
    selectedStatus,
    dateRange,
    selectedMethod,
    debouncedQuery,
  ]);

  // const isWithinSelectedDate = (dateString) => {
  //   const transactionDate = new Date(dateString);
  //   const today = new Date();

  //   if (selectedDateRange === "All") return true;

  //   if (selectedDateRange === "Today") {
  //     return transactionDate.toDateString() === today.toDateString();
  //   }

  //   if (selectedDateRange === "This Week") {
  //     const startOfWeek = new Date(
  //       today.setDate(today.getDate() - today.getDay())
  //     );
  //     return transactionDate >= startOfWeek;
  //   }

  //   if (selectedDateRange === "This Month") {
  //     return (
  //       transactionDate.getMonth() === new Date().getMonth() &&
  //       transactionDate.getFullYear() === new Date().getFullYear()
  //     );
  //   }

  //   return true;
  // };

  // const filteredTransactions = transactions.filter((t) => {
  //   const matchesSearch =
  //     (t?.amount + "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     (t?.currency || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     (t?.paymentId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     (t?.method || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     (t?.planName || "").toLowerCase().includes(searchQuery.toLowerCase());

  //   const matchesStatus =
  //     selectedStatus === "All" ||
  //     (t?.status || "").toLowerCase() === selectedStatus.toLowerCase();
  //   const matchesMethod =
  //     selectedMethod === "All" ||
  //     (t?.method || "").toLowerCase() === selectedMethod.toLowerCase();
  //   const matchesDate = isWithinSelectedDate(t?.created);

  //   return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  // });

  // const handleClearFilters = () => {
  //   setSearchQuery("");
  //   setSelectedStatus("All");
  //   setSelectedMethod("All");
  //   setSelectedDateRange("All");
  //   setCurrentPage(1);
  // };

  const formatDateRange = (type) => {
    if (type === "All") {
      setDateRange({});
    }
    if (type === "today") {
      const now = moment().format("YYYY-MM-DD");
      setDateRange({
        startDate: now,
        endDate: now,
      });
    }
    if (type === "week") {
      const startDate = moment().startOf("week").format("YYYY-MM-DD");
      const endDate = moment().endOf("week").format("YYYY-MM-DD");
      setDateRange({
        startDate,
        endDate,
      });
    }
    if (type === "month") {
      const startDate = moment().startOf("month").format("YYYY-MM-DD");
      const endDate = moment().endOf("month").format("YYYY-MM-DD");
      setDateRange({
        startDate,
        endDate,
      });
    }
    if (type === "year") {
      const startDate = moment().startOf("year").format("YYYY-MM-DD");
      const endDate = moment().endOf("year").format("YYYY-MM-DD");
      setDateRange({
        startDate,
        endDate,
      });
    }
  };

  const statusMap = {
    captured: "bg-green-400",
    failed: "bg-red-400",
    lead_refund: "bg-yellow-400",
  };

  return (
    <div className="min-h-screen bg-[#f1f5ff] px-6 py-6 w-full">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Card title="Total Earnings" value="₹80,010" color="green" />
          <Card
            title="Total Transactions"
            value={transactions.length}
            color="blue"
          />
          <Card
            title="Average Transaction"
            value={`₹${calculateAverage(transactions)}`}
            color="purple"
          />
          <Card title="Success Rate" value="100.0%" color="orange" />
          <Card title="This Month" value="₹80,010" color="green" />
          <Card title="Unique Customers" value="3" color="cyan" />
          <Card
            title="Successful Payments"
            value={transactions.length}
            color="indigo"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex items-center border rounded px-2 py-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by amount, transaction id"
                className="outline-none text-sm w-full sm:w-72"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select
              className="border rounded px-2 py-2 text-sm w-full sm:w-auto"
              value={selectedStatus}
              onChange={(e) => {
                setPagination(defaultPagination);
                setSelectedStatus(e.target.value);
              }}
            >
              <option value="All">All Status</option>
              <option value="captured">Completed</option>
              <option value="failed">Failed</option>
            </select>

            {/* Method Filter */}
            <select
              className="border rounded px-2 py-2 text-sm w-full sm:w-auto"
              value={selectedMethod}
              onChange={(e) => {
                setPagination(defaultPagination);
                setSelectedMethod(e.target.value);
              }}
            >
              <option value="All">All Methods</option>
              <option value="lead_wallet">Lead Wallet</option>
              <option value="wallet_refund">Wallet Refund</option>
              <option value="cash">Cash</option>
              <option value="recharge_by_admin">Wallet recharge</option>
              <option value="Online">Online</option>
            </select>

            {/* Date Filter */}
            <select
              className="border rounded px-2 py-2 text-sm w-full sm:w-auto"
              value={selectedDateRange}
              onChange={(e) => {
                setPagination(defaultPagination);
                setSelectedDateRange(e.target.value);
                formatDateRange(e.target.value);
              }}
            >
              <option value="All">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            {/* Filter Admin Wallet*/}
            {/* <select
              className="border rounded px-2 py-2 text-sm w-full sm:w-auto"
              // value={}
              // onChange={(e) => }
            >
              <option value="all" selected>
                --Admin--
              </option>
              <option value="wallet">Wallet</option>
              <option value="plan">Plan</option>
            </select> */}
            {/*Filter  Lead */}
            {/* <select
              className="border rounded px-2 py-2 text-sm w-full sm:w-auto"
              // value={selectedDateRange}
              // onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option value="all" selected>
                --Lead--
              </option>
              <option value="buy">Buy</option>
              <option value="refund">Refund</option>
            </select> */}

            <button
              onClick={getAllTransactions}
              className={`flex items-center gap-1 text-sm px-4 py-2 rounded cursor-pointer ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              ) : (
                <>
                  <RefreshCcw className="w-4 h-4" /> Refresh
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transaction History</h2>
            {/* <button className="flex items-center text-green-600 text-sm border border-green-500 px-3 py-1.5 rounded hover:bg-green-100">
              <Download className="w-4 h-4 mr-1" /> Export Data
            </button> */}
          </div>

          {loading ? (
            <div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="border-t pt-4 pb-6 text-sm animate-pulse"
                >
                  <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No transactions found.
            </div>
          ) : (
            transactions.map((t) => (
              <div key={t._id || t.id} className="border-t pt-4 pb-6 text-sm">
                {/* <div className="font-medium text-base">
                  {t?.amount || "N/A"}
                </div>
                <div className="text-gray-500 text-xs mb-2">
                  {t?.currency || "N/A"}
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-semibold text-gray-600 mb-1">
                      Payment Info
                    </div>
                    <div>ID: {t?.paymentId || "N/A"}</div>
                    <div className="text-xs text-purple-600 capitalize mt-1">
                      {t?.method?.replaceAll("_", " ") || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600 mb-1">
                      Agent Info
                    </div>
                    <div>ID: {t?.user?.name || "N/A"}</div>
                    <div className="text-xs text-purple-600 mt-1">
                      {t?.user?.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600 mb-1">
                      Plan Info
                    </div>
                    <div>{t?.planName || "N/A"}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600 mb-1">
                      Date & Time
                    </div>
                    <div>
                      {moment(t?.createdAt).format("DD-MM-YYYY hh:mm A") ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600 mb-1">
                      Details
                    </div>
                    <div>Currency: {t?.currency || "N/A"}</div>
                    <div className="truncate">
                      Transaction ID: {t?._id || t?.id}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600 mb-1">
                      Status
                    </div>
                    <div
                      className={`flex items-center justify-start w-fit uppercase px-2 py-1 rounded-full text-white font-medium ${
                        statusMap[t?.status]
                      }`}
                    >
                      {t?.status || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="text-right text-lg font-semibold mt-4">
                  ₹{Number(t?.amount).toLocaleString() || 0}{" "}
                  {/* <span className="text-xs">({t?.status || "N/A"})</span> */}
                </div>
              </div>
            ))
          )}
        </div>

        {transactions.length > 0 && (
          <div className="flex justify-end gap-5 items-center mt-4">
            <button
              onClick={() =>
                setPagination({
                  ...pagination,
                  page: pagination.page - 1,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {pagination.page} of{" "}
              {Math.ceil(pagination.totalDocs / pagination.limit)}
            </span>
            <button
              onClick={() =>
                setPagination({
                  ...pagination,
                  page: pagination.page + 1,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
              disabled={
                pagination.page ===
                Math.ceil(pagination.totalDocs / pagination.limit)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const calculateAverage = (transactions) => {
  if (transactions.length === 0) return 0;
  const total = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  return Math.round(total / transactions.length);
};

const Card = ({ title, value, color }) => {
  const colorMap = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    cyan: "bg-cyan-100 text-cyan-800",
    indigo: "bg-indigo-100 text-indigo-800",
  };

  return (
    <div
      className={`${
        colorMap[color] || "bg-gray-100 text-gray-800"
      } rounded-lg p-4 shadow-sm`}
    >
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
};

export default AllTransactions;

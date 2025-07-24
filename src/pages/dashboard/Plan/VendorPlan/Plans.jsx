import api from "../../../../Api/ApiService";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import getEnv from "../../../../lib/getEnv";
import { toast } from "react-toastify";
import { cn } from "../../../../lib/cn";

const Plans = () => {
  const setTitle = useOutletContext();
  const token = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const [plans, setPlans] = useState([]);
  const [leadsCosts, setLeadsCosts] = useState([]);
  const [newPlanShowModal, setNewPlanShowModal] = useState(false);
  const [leadsCostShowModal, setLeadsCostShowModal] = useState(false);
  const [buyPlanShowModal, setBuyPlanShowModal] = useState(false);
  const [viewPlanShowModal, setViewPlanShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const { Razorpay } = useRazorpay();

  const lowToHighPlan = (plans) => {
    return plans.sort((a, b) => {
      return a.price - b.price;
    });
  };

  const allFilteredPlans = lowToHighPlan(plans);

  const [newPlan, setNewPlan] = useState({
    planId: "",
    planName: "",
    price: "",
    description: "",
    validity: "",
    planType: "domestic",
  });
  const [leadsCost, setLeadsCost] = useState({
    price: "",
    type: "international",
  });
  const [error, setError] = useState("");

  // Pagination state for plans
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter plans based on selected filter
  const filteredPlans = allFilteredPlans.filter((plan) => {
    if (filter === "all") return true;
    if (filter === "domestic") return plan.planType === "domestic";
    if (filter === "international") return plan.planType === "international";
    if (filter === "both") return plan.planType === "both";
    // if (filter === "price") return plan.planType === "price";

    return true;
  });

  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const currentPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paymentSuccessHandler = async (response) => {
    try {
      await api.post(
        "/api/razorPay/paymentVerification",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast("Successfully purchased the plan!");
      setIsLoadingPayment(false);
      handleBuyPlanCloseModal();
    } catch (error) {
      console.error("Payment verification failed:", error);
    } finally {
      setIsLoadingPayment(false);
    }
  };

  const handlePayment = async (planId) => {
    try {
      setIsLoadingPayment(true);
      const keyResponse = await api.post(
        "/api/razorPay/createorderPlan",
        {
          planId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!keyResponse || keyResponse.status !== 200) {
        throw new Error("Failed to fetch order-info.");
      }

      if (keyResponse.data.data === false) {
        setIsLoadingPayment(false);
        return toast(keyResponse.data.message);
      }

      const order = keyResponse.data.data;

      const options = {
        key: getEnv("VITE_APP_RAZOR_PAY_KEY_ID"),
        amount: order.amount,
        currency: "INR",
        name: "Begin-Yatra-Plan",
        order_id: order.orderId,
        handler: paymentSuccessHandler,

        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#121212" },
        modal: {
          escape: false,
        },
      };

      const razorpayInstance = new Razorpay(options);

      razorpayInstance.on("payment.failed", function () {
        setIsLoadingPayment(false);
      });

      razorpayInstance.open();
      setIsLoadingPayment(false);
    } catch (error) {
      setIsLoadingPayment(false);
      toast("Failed to initiate payment");
      console.error("Payment error:", error);
    }
  };

  // Fetch plans and leads costs
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/api/plan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setPlans(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Failed to fetch plans.");
      }
    };

    const fetchLeadsCosts = async () => {
      try {
        const res = await api.get("/api/leadCost", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setLeadsCosts(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching leads costs:", error);
        setError("Failed to fetch leads costs.");
      }
    };

    fetchPlans();
    fetchLeadsCosts();
  }, [token]);

  useEffect(() => {
    setTitle("Plan Management");
  }, [setTitle]);

  const handleNewPlanInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadsCostInputChange = (e) => {
    const { name, value } = e.target;
    setLeadsCost((prev) => ({ ...prev, [name]: value }));
  };

  const createPlan = async (payload) => {
    try {
      const res = await api.post("/api/plan", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", res.data);
      return res;
    } catch (error) {
      console.error("Error creating plan:", error);
      setError("Failed to create plan.");
      return null;
    }
  };

  const createLeadCost = async (payload) => {
    try {
      const res = await api.post("/api/leadCost", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", res.data);
      return res;
    } catch (error) {
      console.error("Error creating lead cost:", error);
      setError("Failed to create lead cost.");
      return null;
    }
  };

  // const purchasePlan = async (planId) => {
  //   try {
  //     const res = await api.post(
  //       "/api/plan/purchase",
  //       { planId },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     console.log("Purchase API Response:", res.data);
  //     return res;
  //   } catch (error) {
  //     console.error("Error purchasing plan:", error);
  //     setError("Failed to purchase plan.");
  //     return null;
  //   }
  // };

  // const handleConfirmPurchase = async () => {
  //   if (!selectedPlan?._id) {
  //     setError("No plan selected for purchase.");
  //     return;
  //   }
  //   const res = await purchasePlan(selectedPlan._id);
  //   if (res && res.status === 200 && res.data.success) {
  //     handleBuyPlanCloseModal();
  //     alert("Plan purchased successfully!");
  //   } else {
  //     setError("Failed to purchase plan.");
  //   }
  // };

  const handleNewPlanCloseModal = () => {
    setNewPlanShowModal(false);
    setNewPlan({
      planId: "",
      planName: "",
      price: "",
      description: "",
      validity: "",
      planType: "domestic",
    });
    setError("");
  };

  const handleLeadsCostCloseModal = () => {
    setLeadsCostShowModal(false);
    setLeadsCost({ price: "", type: "international" });
    setError("");
  };

  const handleBuyPlanOpenModal = () => setBuyPlanShowModal(true);

  const handleBuyPlanCloseModal = () => {
    setBuyPlanShowModal(false);
    setSelectedPlan(null);
    setError("");
  };

  const handleViewPlanOpenModal = (plan) => {
    setSelectedPlan(plan);
    setViewPlanShowModal(true);
  };

  const handleViewPlanCloseModal = () => {
    setViewPlanShowModal(false);
    setSelectedPlan(null);
    setError("");
  };

  const handleBuyPlan = (id) => {
    const plan = plans.find((p) => p._id === id);
    if (plan) {
      setSelectedPlan(plan);
      handleBuyPlanOpenModal();
    } else {
      setError("Selected plan not found.");
    }
  };

  const handleAddPlan = async () => {
    if (!newPlan.planId) {
      setError("Plan ID is required.");
      return;
    }
    const planPayload = {
      ...newPlan,
      price: parseFloat(newPlan.price),
    };
    const res = await createPlan(planPayload);

    if (res && res.status === 200 && res.data.success) {
      const addedPlan = res.data.data;
      setPlans((prev) => [...prev, addedPlan]);
      handleNewPlanCloseModal();
    } else {
      setError("Failed to add plan.");
    }
  };

  const handleAddLeadsCost = async () => {
    const leadCostPayload = {
      ...leadsCost,
      price: parseFloat(leadsCost.price),
    };
    const res = await createLeadCost(leadCostPayload);

    if (res && res.status === 200 && res.data.success) {
      const addedLeadCost = res.data.data;
      setLeadsCosts((prev) => [...prev, addedLeadCost]);
      handleLeadsCostCloseModal();
    } else {
      setError("Failed to add lead cost.");
    }
  };

  const gradientClasses = {
    0: "red-gradient",
    1: "purple-gradient",
    2: "green-gradient",
  };

  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-xl font-bold">Plan Management</h1>
        <div className="flex gap-2">
          {/* <button
            onClick={handleNewPlanOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm">
            Add New Plan
          </button>
          <button
            onClick={handleLeadsCostOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm">
            Set Leads Cost
          </button> */}
          <Link
            to="/"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Available Plans Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h1 className="text-xl font-bold">Available Plans</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded text-sm ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("domestic")}
              className={`px-4 py-2 rounded text-sm ${
                filter === "domestic"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              Domestic
            </button>
            <button
              onClick={() => setFilter("international")}
              className={`px-4 py-2 rounded text-sm ${
                filter === "international"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              International
            </button>
            <button
              onClick={() => setFilter("both")}
              className={`px-4 py-2 rounded text-sm ${
                filter === "both"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              Both
            </button>
          </div>
        </div>
        {/* Plans Cards */}
        {/* card-style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-4">
          {currentPlans.length > 0 ? (
            currentPlans.map((plan, index) => (
              <div
                key={plan._id || index}
                className={
                  "bg-white overflow-hidden rounded-3xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                }
              >
                <div className={`space-y-2 min-h-[450px]`}>
                  <div
                    className={cn(
                      `text-center py-10 mt-[-20px]`,
                      gradientClasses[index % 3]
                    )}
                  >
                    <div className="text-3xl font-semibold text-white uppercase my-4">
                      {plan.planName}
                    </div>
                    <div className="text-3xl font-extrabold text-shadow-2xs ">
                      ₹{plan.price}
                    </div>
                  </div>
                  <div className="text-sm block my-1 px-2">
                    <p className="font-semibold text-white-700 text-center  py-1">
                      Plan ID
                    </p>
                    <p className="ml-1 text-gray-600 break-all text-center  py-1">
                      {plan.planId}
                    </p>
                  </div>
                  {/* <div className="text-sm">
                    <span className="font-semibold text-gray-700">
                      Plan Name:
                    </span>
                    <span className="ml-1 text-gray-600">{plan.planName}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-700">Price:</span>
                    <span className="ml-1 text-green-600 font-medium">
                      ₹{plan.price}
                    </span>
                  </div> */}
                  <div className="text-sm block justify-items-center align-middle m-3 border-t  px-2 my-1">
                    <p className="font-semibold text-gray-700 text-center  py-1">
                      Description
                    </p>
                    <p className="ml-1 text-center text-gray-600 line-clamp-2 py-1">
                      {plan.description}
                    </p>
                  </div>
                  <div className="text-sm block justify-items-center align-middle m-3 border-t  px-2 my-1">
                    <p className="font-semibold text-gray-700 text-center py-1">
                      Validity
                    </p>
                    <p className="ml-1 text-gray-600 text-center py-1">
                      {plan.validity}
                    </p>
                  </div>
                  <div className="text-sm block justify-items-center align-middle m-3 border-t px-2  my-1">
                    <p className="font-semibold text-center text-gray-700 py-1">
                      Plan Type
                    </p>
                    <p className="ml-1 text-gray-600 text-center py-1">
                      {plan.planType}
                    </p>
                  </div>
                  <div className="text-sm block justify-items-center align-middle m-3 border-t  px-2 my-1">
                    <p className="font-semibold text-gray-700 text-center py-1">
                      Leads
                    </p>
                    <p className="ml-1 text-gray-600 text-center py-1">
                      {plan.numberOfLeads || "N/A"}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-center justify-center min-h-[100px]",
                    gradientClasses[index % 3]
                  )}
                >
                  <div className="flex w-full justify-self-center align-middle space-x-2">
                    {/* <button
                      onClick={() => handleViewPlanOpenModal(plan)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg transition"
                    >
                      View
                    </button> */}
                    <button
                      onClick={() => handleBuyPlan(plan._id)}
                      className="text-white w-full min-h-[100px] text-2xl font-medium px-8 py-1.5 uppercase rounded-lg transition"
                    >
                      Buy Plan
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-sm py-6">
              No plans available for the selected filter.
            </div>
          )}
        </div>
        {/* Pagination */}
        {filteredPlans.length > itemsPerPage && (
          <div className="flex items-center justify-end mt-4 space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ←
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* New Plan Modal */}
      {newPlanShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
            onClick={handleNewPlanCloseModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-50">
            <h2 className="text-xl font-bold mb-4">Add New Plan</h2>
            <button
              onClick={handleNewPlanCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Plan ID
                </label>
                <input
                  type="text"
                  name="planId"
                  value={newPlan.planId}
                  onChange={handleNewPlanInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Plan Name
                </label>
                <input
                  type="text"
                  name="planName"
                  value={newPlan.planName}
                  onChange={handleNewPlanInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={newPlan.price}
                  onChange={handleNewPlanInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newPlan.description}
                  onChange={handleNewPlanInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Validity
                </label>
                <input
                  type="text"
                  name="validity"
                  value={newPlan.validity}
                  onChange={handleNewPlanInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 30 days"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Plan Type
                </label>
                <select
                  name="planType"
                  value={newPlan.planType}
                  onChange={handleNewPlanInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleNewPlanCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlan}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300 text-sm"
                  disabled={
                    !newPlan.planId ||
                    !newPlan.planName ||
                    !newPlan.price ||
                    !newPlan.description ||
                    !newPlan.validity
                  }
                >
                  Add Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Plan Modal */}
      {viewPlanShowModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
            onClick={handleViewPlanCloseModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-50">
            <h2 className="text-xl font-bold mb-4">Plan Details</h2>
            <button
              onClick={handleViewPlanCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <div className="space-y-4">
              <div>
                <span className="font-bold text-sm">Plan ID:</span>
                <span className="ml-2 text-sm">{selectedPlan.planId}</span>
              </div>
              <div>
                <span className="font-bold text-sm">Plan Name:</span>
                <span className="ml-2 text-sm">{selectedPlan.planName}</span>
              </div>
              <div>
                <span className="font-bold text-sm">Price:</span>
                <span className="ml-2 text-sm">₹{selectedPlan.price}</span>
              </div>
              <div>
                <span className="font-bold text-sm">Description:</span>
                <span className="ml-2 text-sm">{selectedPlan.description}</span>
              </div>
              <div>
                <span className="font-bold text-sm">Validity:</span>
                <span className="ml-2 text-sm">{selectedPlan.validity}</span>
              </div>
              <div>
                <span className="font-bold text-sm">Plan Type:</span>
                <span className="ml-2 text-sm">{selectedPlan.planType}</span>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleViewPlanCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleViewPlanCloseModal();
                    handleBuyPlan(selectedPlan._id);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
                >
                  Buy Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy Plan Confirmation Modal */}
      {buyPlanShowModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
            onClick={handleBuyPlanCloseModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-50">
            <h2 className="text-xl font-bold mb-4">Confirm Plan Purchase</h2>
            <button
              onClick={handleBuyPlanCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <div className="space-y-4">
              <p className="text-sm">
                Are you sure you want to purchase the following plan?
              </p>
              <div className="border p-3 rounded-lg bg-gray-50">
                <div className="mb-2">
                  <span className="font-bold text-sm">Plan Name:</span>
                  <span className="ml-2 text-sm">{selectedPlan.planName}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold text-sm">Price:</span>
                  <span className="ml-2 text-sm">₹{selectedPlan.price}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold text-sm">Description:</span>
                  <span className="ml-2 text-sm">
                    {selectedPlan.description}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-bold text-sm">Validity:</span>
                  <span className="ml-2 text-sm">{selectedPlan.validity}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold text-sm">Plan Type:</span>
                  <span className="ml-2 text-sm">{selectedPlan.planType}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleBuyPlanCloseModal}
                  disabled={isLoadingPayment}
                  className="bg-gray-500 text-white disabled:opacity-80 disabled:cursor-not-allowed px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  disabled={isLoadingPayment}
                  onClick={() => handlePayment(selectedPlan._id)}
                  className="bg-green-500 text-white px-4 disabled:opacity-80 disabled:cursor-not-allowed py-2 rounded hover:bg-green-600 transition-colors text-sm"
                >
                  {isLoadingPayment ? "Processing.." : "Buy Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leads Cost Modal */}
      {leadsCostShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40"
            onClick={handleLeadsCostCloseModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-50">
            <h2 className="text-xl font-bold mb-4">Set Leads Cost</h2>
            <button
              onClick={handleLeadsCostCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={leadsCost.price}
                  onChange={handleLeadsCostInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-sm">
                  Plan Type
                </label>
                <select
                  name="type"
                  value={leadsCost.type}
                  onChange={handleLeadsCostInputChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div className="bg-white p-4 rounded-lg shadow max-h-[40vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-3">Leads Costs</h2>
                {leadsCosts.map((cost, index) => (
                  <div
                    key={cost._id || index}
                    className="bg-gray-50 p-3 rounded-lg shadow mb-3 border"
                  >
                    <div className="mb-2">
                      <span className="font-bold text-sm">Plan Type:</span>
                      <span className="ml-2 text-sm">{cost.type}</span>
                    </div>
                    <div>
                      <span className="font-bold text-sm">Price:</span>
                      <span className="ml-2 text-sm">₹{cost.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleLeadsCostCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLeadsCost}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300 text-sm"
                  disabled={!leadsCost.price}
                >
                  Save Leads Cost
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;

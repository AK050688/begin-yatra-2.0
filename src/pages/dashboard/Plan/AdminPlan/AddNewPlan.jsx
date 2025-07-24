import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../../store/userSlice";
import api from "../../../../Api/ApiService";
import EditPlanModal from "../../Layout/EditPlanModal";
import { toast } from "react-toastify";

const AddNewPlan = () => {
  const token = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const [plans, setPlans] = useState([]);
  const [leadsCosts, setLeadsCosts] = useState([]);
  const [newPlanShowModal, setNewPlanShowModal] = useState(false);
  const [leadsCostShowModal, setLeadsCostShowModal] = useState(false);
  const [buyPlanShowModal, setBuyPlanShowModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState("");

  const [newPlan, setNewPlan] = useState({
    planName: "",
    price: "",
    description: "",
    validity: "",
    numberOfLeads: "",
    planType: "domestic",
  });
  const [leadsCost, setLeadsCost] = useState({
    price: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Pagination state for plans
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(plans.length / itemsPerPage);
  const currentPlans = plans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function fetchLeadsCosts() {
    try {
      const res = await api.get(`/api/leadCost`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setLeadsCosts(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching leads costs:", error);
      setError("Failed to fetch leads costs.");
    }
  }
  // Fetch plans and leads costs

    const fetchPlans = async () => {
      try {
        const res = await api.get("/api/plan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          console.log("Fetched plans:", res.data.data);
          setPlans(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Failed to fetch plans.");
      }
    };
  useEffect(() => {
    fetchPlans();
    fetchLeadsCosts();
  }, [token]);

  const handleNewPlanInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadsCostInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "plan_type") {
      const foundLead = leadsCosts.find((lc) => lc._id === value);
      setLeadsCost({
        ...leadsCost,
        price: foundLead.price?.toString(),
        plan_type: value,
      });
      return;
    }
    setLeadsCost({ ...leadsCost, [name]: value });
  };

  const createPlan = async (payload) => {
    try {
      const res = await api.post(
        "/api/plan",
        {
          ...payload,
          planId: plans.length + 1, // Temporary; replace with backend-generated ID
          price: parseFloat(payload.price),
          validity: parseInt(payload.validity, 10),
          numberOfLeads: parseInt(payload.numberOfLeads, 10),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("API Response:", res.data);
      return res;
    } catch (error) {
      console.error("Error creating plan:", error);
      setError("Failed to create plan.");
      return null;
    }
  };

  // const createLeadCost = async (payload) => {
  //   try {
  //     const res = await api.post(
  //       "/api/leadCost",
  //       {
  //         ...payload,
  //         price: parseFloat(payload.price),
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     console.log("API Response:", res.data);
  //     return res;
  //   } catch (error) {
  //     console.error("Error creating lead cost:", error);
  //     setError("Failed to create lead cost.");
  //     return null;
  //   }
  // };

  const updateLeadCost = async () => {
    try {
      setIsLoading(true);
      if (!leadsCost.plan_type || !leadsCost.price) {
        return toast("Fill the form.");
      }
      await api.put(
        `/api/leadCost/${leadsCost.plan_type}`,
        {
          price: leadsCost.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchLeadsCosts();
      return toast("Successfully updated lead cost.");
    } catch (error) {
      toast(`Failed to update lead cost: ${error?.message}`);
    } finally {
      handleLeadsCostCloseModal();
      setIsLoading(false);
    }
  };

  const purchasePlan = async (planId) => {
    try {
      const res = await api.post(
        "/api/plan/purchase",
        { planId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Purchase API Response:", res.data);
      return res;
    } catch (error) {
      console.error("Error purchasing plan:", error);
      setError("Failed to purchase plan.");
      return null;
    }
  };

  const handleAddPlan = async () => {
    if (
      !newPlan.planName ||
      !newPlan.price ||
      !newPlan.validity ||
      !newPlan.numberOfLeads
    ) {
      setError("Please fill in all required fields");
      return;
    }
    const planPayload = {
      ...newPlan,
      price: parseFloat(newPlan.price),
      validity: parseInt(newPlan.validity, 10),
      numberOfLeads: parseInt(newPlan.numberOfLeads, 10),
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

  // const handleAddLeadsCost = async () => {
  //   if (!leadsCost.price) {
  //     setError("Please provide a price for the lead cost");
  //     return;
  //   }
  //   const leadCostPayload = {
  //     ...leadsCost,
  //     price: parseFloat(leadsCost.price),
  //   };
  //   const res = await createLeadCost(leadCostPayload);

  //   if (res && res.status === 200 && res.data.success) {
  //     const addedLeadCost = res.data.data;
  //     setLeadsCosts((prev) => [...prev, addedLeadCost]);
  //     handleLeadsCostCloseModal();
  //   } else {
  //     setError("Failed to add lead cost.");
  //   }
  // };

  const handleEditPlan = (plan) => {
    if (!plan?.planId && !plan?._id) {
      console.error("Invalid plan object:", plan);
      setError("Invalid plan ID");
      return;
    }
    console.log("Selected Plan for Edit:", plan);
    setSelectedPlan(plan);
    setShowEditPlanModal(true);
  };

  const handleUpdatePlan = async(updatedPlan) => {
    setPlans(
      plans.map((plan) =>
        (plan.planId || plan._id) === (updatedPlan.planId || updatedPlan._id)
          ? updatedPlan
          : plan
      )
    );
    setShowEditPlanModal(false);
    setSelectedPlan(null);
    await fetchPlans();
  };

  const handleDeletePlan = async (id) => {
    if (!id) {
      setError("Invalid plan ID");
      return;
    }
    try {
      const res = await api.delete(`/api/plan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setPlans(plans.filter((plan) => (plan.planId || plan._id) !== id));
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      setError("Failed to delete plan.");
    }
  };

  const handleNewPlanOpenModal = () => setNewPlanShowModal(true);
  const handleNewPlanCloseModal = () => {
    setNewPlanShowModal(false);
    setNewPlan({
      planName: "",
      price: "",
      description: "",
      validity: "",
      numberOfLeads: "",
      planType: "domestic",
    });
    setError("");
  };

  const handleLeadsCostOpenModal = () => setLeadsCostShowModal(true);
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

  const handleBuyPlan = (id) => {
    console.log("Plan ID:", id);
    const plan = plans.find((p) => p._id === id);
    if (plan) {
      setSelectedPlan(plan);
      handleBuyPlanOpenModal();
    } else {
      setError("Selected plan not found.");
    }
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPlan) {
      setError("No plan selected");
      return;
    }
    try {
      const res = await api.post(
        "/api/razorPay/createorderPlan",
        {
          planId: selectedPlan.planId || selectedPlan._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data && res.data.success) {
        const { order, key } = res.data;

        const options = {
          key,
          amount: order.amount,
          currency: order.currency,
          name: "BeginYatra",
          description: selectedPlan.description,
          order_id: order.id,
          handler: function (response) {
            alert(
              "Payment successful! Payment ID: " + response.razorpay_payment_id
            );
            purchasePlan(selectedPlan.planId || selectedPlan._id);
          },
          prefill: {
            name: user?.name || "Guest",
            email: user?.email || "guest@example.com",
          },
          theme: {
            color: "#6366f1",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        setError("Failed to initiate Razorpay order.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong with payment.");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-2 w-full sm:p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Header Section */}
      {/* <div className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-xl font-bold">Plan Management</h1>
        <Link
          to="/"
          className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          Back to Dashboard
        </Link>
      </div> */}

      {/* Available Plans Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-end items-center mb-3 sm:mb-4 gap-3 sm:gap-5">
          <h1 className="text-xl sm:text-xl font-bold w-full sm:w-auto text-left sm:mr-auto">
            Available Plans
          </h1>
          <button
            onClick={handleLeadsCostOpenModal}
            className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600 transition-colors text-sm sm:text-base cursor-pointer"
          >
            Leads Cost
          </button>
          <button
            onClick={handleNewPlanOpenModal}
            className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600 transition-colors text-sm sm:text-base cursor-pointer"
          >
            Add New Plan
          </button>
        </div>

        {/* Plans Table */}
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 md:p-3">Plan ID</th>
                  <th className="p-2 md:p-3">Plan Name</th>
                  <th className="p-2 md:p-3">Price</th>
                  <th className="p-2 md:p-3">Description</th>
                  <th className="p-2 md:p-3">Validity</th>
                  <th className="p-2 md:p-3">Plan Type</th>
                  <th className="p-2 md:p-3">No. Of Leads</th>
                  <th className="p-2 md:p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((plan, index) => (
                  <tr
                    key={plan._id || plan.planId || index}
                    className="border-b"
                  >
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                      {plan.planId || plan._id}
                    </td>
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                      {plan.planName}
                    </td>
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                      ₹{plan.price}
                    </td>
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px] ">
                      {plan.description}
                    </td>
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                      {plan.validity}
                    </td>
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                      {plan.planType}
                    </td>
                    <td className="p-2 md:p-3 truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                      {plan.numberOfLeads}
                    </td>
                    <td className="p-2 md:p-3">
                      <button
                        onClick={() => handleEditPlan(plan)}
                        className="bg-blue-500 text-white px-2 mr-0.5 py-1 rounded hover:bg-blue-600 text-xs md:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeletePlan(plan.planId || plan._id)
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          </div>

          {/* Mobile View: Stacked Cards */}
          <div className="block md:hidden">
            {currentPlans.map((plan, index) => (
              <div
                key={plan._id || plan.planId || index}
                className="bg-white p-3 rounded-lg shadow mb-3 border"
              >
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">Plan ID:</span>
                  <span>{plan.planId || plan._id}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">Plan Name:</span>
                  <span>{plan.planName}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">Price:</span>
                  <span>₹{plan.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">Description:</span>
                  <span>{plan.description}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">Validity:</span>
                  <span>{plan.validity}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">No. Of Leads:</span>
                  <span>{plan.numberOfLeads}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="font-bold">Plan Type:</span>
                  <span>{plan.planType}</span>
                </div>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => handleEditPlan(plan)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleBuyPlan(plan._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                  >
                    Buy Plan
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.planId || plan._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
          </div>
        </div>
      </div>

      {/* Edit Plan Modal */}
      <EditPlanModal
        isOpen={showEditPlanModal}
        onClose={() => {
          setShowEditPlanModal(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onUpdate={handleUpdatePlan}
      />

      {/* New Plan Modal */}
      {newPlanShowModal && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
            onClick={handleNewPlanCloseModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Add New Plan
              </h2>
              <button
                onClick={handleNewPlanCloseModal}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base"
              >
                ✕
              </button>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="planName"
                    value={newPlan.planName}
                    onChange={handleNewPlanInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newPlan.price}
                    onChange={handleNewPlanInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newPlan.description}
                    onChange={handleNewPlanInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Validity (days)
                  </label>
                  <input
                    type="number"
                    name="validity"
                    value={newPlan.validity}
                    onChange={handleNewPlanInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    No. of Leads
                  </label>
                  <input
                    type="number"
                    name="numberOfLeads"
                    value={newPlan.numberOfLeads}
                    onChange={handleNewPlanInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Plan Type
                  </label>
                  <select
                    name="planType"
                    value={newPlan.planType}
                    onChange={handleNewPlanInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 flex-col sm:flex-row gap-2 sm:gap-0">
                  <button
                    onClick={handleNewPlanCloseModal}
                    className="bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPlan}
                    className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300 text-sm sm:text-base w-full sm:w-auto"
                    disabled={
                      !newPlan.planName ||
                      !newPlan.price ||
                      !newPlan.description ||
                      !newPlan.validity ||
                      !newPlan.numberOfLeads
                    }
                  >
                    Add Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Buy Plan Confirmation Modal */}
      {buyPlanShowModal && selectedPlan && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40"
            onClick={handleBuyPlanCloseModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg m-4 sm:max-w-lg p-4 sm:p-6 relative">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Confirm Plan Purchase
              </h2>
              <button
                onClick={handleBuyPlanCloseModal}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-gray-700 text-sm sm:text-base"
              >
                ✕
              </button>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base">
                  Are you sure you want to purchase the following plan?
                </p>
                <div className="border p-3 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                    <span className="font-bold">Plan Name:</span>
                    <span>{selectedPlan.planName}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                    <span className="font-bold">Price:</span>
                    <span>₹{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                    <span className="font-bold">Description:</span>
                    <span>{selectedPlan.description}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                    <span className="font-bold">Validity:</span>
                    <span>{selectedPlan.validity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                    <span className="font-bold">Plan Type:</span>
                    <span>{selectedPlan.planType}</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 flex-col sm:flex-row gap-2 sm:gap-0">
                  <button
                    onClick={handleBuyPlanCloseModal}
                    className="bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPurchase}
                    className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    Confirm Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Leads Cost Modal */}
      {leadsCostShowModal && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40"
            onClick={handleLeadsCostCloseModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[90vw] sm:max-w-lg md:max-w-xl p-4 sm:p-6 relative min-h-[30vh] max-h-[70vh] overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-bold mb-4">
                Set Leads Cost
              </h2>
              <button
                onClick={handleLeadsCostCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={leadsCost.price}
                    onChange={handleLeadsCostInputChange}
                    className="w-full p-2 border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-sm sm:text-base">
                    Plan Type
                  </label>
                  <select
                    name="plan_type"
                    // value={leadsCost.type}
                    onChange={handleLeadsCostInputChange}
                    className="w-full p-2 capitalize border rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option className="capitalize" value={""}>
                      Select type
                    </option>
                    {leadsCosts.map((lc) => (
                      <option
                        className="capitalize"
                        key={lc._id}
                        value={lc._id}
                      >
                        {lc.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2 flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleLeadsCostCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateLeadCost}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-green-300 text-sm w-full sm:w-auto"
                    disabled={!leadsCost.price || isLoading}
                  >
                    {isLoading ? "Processing.." : "Save Leads Cost"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewPlan;

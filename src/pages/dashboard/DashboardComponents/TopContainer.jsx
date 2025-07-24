import React, { useCallback, useEffect, useState } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import api from "../../../Api/ApiService";
import { useNavigate } from "react-router-dom";
import ShimmerCard from "./TopContainerShimmerCard";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../../store/userSlice";
import moment from "moment/moment";

const TopContainer = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [currentUserPlan, setCurrentUserPlan] = useState([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [premiumPlanDetails, setPremiumPlanDetails] = useState({
    endDate: "",
    startDate: "",
    status: "",
  });

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  // console.log("dfghjkfd",token);

  const getPlanStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/plan/getAllPlansOfUser?userId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.data) {
        return;
      }

      setPremiumPlanDetails(response?.data?.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  function calculateDays(endDate) {
    const date1 = moment(endDate);
    const date2 = moment();

    return date1.diff(date2, "days");
  }

  const fetchCurrentUser = useCallback(async () => {
    if (!user?._id) return;

    try {
      const res = await api.get(`/api/auth/getUserById/${user?._id}`);
      setCurrentUser(res.data?.data || null);
    } catch (err) {
      console.error("Failed to fetch user by ID", err);
    }
  }, [user?._id]);

  const handleToCheckOut = async () => {
    try {
      setPlanLoading(true);
      const res = await api.get(`/api/plan/getAllPlansOfUser`);

      console.log(res.data.data, "MMMMMMMMMMMMMMMMM");

      setCurrentUserPlan(res.data.data || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setCurrentUserPlan([]);
    } finally {
      setPlanLoading(false);
    }
  };

  useEffect(() => {
    getPlanStatus();
  }, [getPlanStatus]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-700">
            Agent Dashboard
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Welcome back,{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate(`user-profile`)}
            >
              {currentUser?.name || "Vendor"}
            </span>
          </p>
        </div>
      </div>

      {/* Loading or Error */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-6">
          {/* Wallet and Plan Section */}
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 bg-orange-50 p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            {/* Wallet */}
            <div className="grid">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 flex justify-center p-2 rounded-full">
                  <IoMdTrendingUp size={28} className="text-orange-600" />
                </div>
                <h4 className="text-base font-semibold text-gray-700">
                  Wallet
                </h4>
              </div>
              <h3 className="text-3xl font-bold text-orange-700 mt-3">
                ₹{currentUser?.wallet || 0}
              </h3>
              <p className="text-sm text-gray-500">Your Wallet Balance</p>
            </div>

            {/* Plan Section */}
            <div className="grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
              <div className="left-plan my-1.5 flex justify-end items-center">
                {!premiumPlanDetails?.status ? (
                  <button
                    onClick={() => {
                      handleToCheckOut();
                      setShowModal(true);
                    }}
                    className="text-white bg-purple-700 hover:text-white hover:bg-purple-500 sm:px-4 sm:py-2 rounded-lg text-center flex items-center cursor-pointer shadow-lg text-sm sm:text-base"
                  >
                    Get Plan
                  </button>
                ) : (
                  <div className="inline-flex bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg text-sm sm:text-base">
                    Premium Active -{" "}
                    <span className="font-semibold ml-1">
                      {calculateDays(premiumPlanDetails.endDate)} days left
                    </span>
                  </div>
                )}
              </div>

              <div className="getOrShowPlan flex justify-end items-center w-auto mt-3">
                {planLoading ? (
                  <p className="text-gray-500">Fetching your plans...</p>
                ) : currentUserPlan?.length > 0 ? (
                  <ul className="mb-4 space-y-2">
                    {currentUserPlan.map((plan, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {plan.name} — {plan.daysLeft || "N/A"} days left
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {/* {premiumPlanDetails.status === "active" ? (
                      ""
                    ) : (
                    )} */}

                    {/* Modal */}
                    {showModal && (
                      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
                          <h2 className="text-xl font-bold mb-4">
                            Confirm to get plan
                          </h2>

                          <div className="flex justify-end gap-4 mt-4">
                            <button
                              onClick={() => setShowModal(false)}
                              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                navigate("/dashboard/plans");
                                setShowModal(false);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopContainer;

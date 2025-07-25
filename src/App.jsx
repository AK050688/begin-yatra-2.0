import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Routes/Home";
import Navbar from "./HaderFooter/Navbar";
import Footer from "./HaderFooter/Footer";
import Contactus from "./Routes/Contactus";
import Aboutus from "./Routes/Aboutus";
import Review from "./Routes/Review";
import TermsAndConditions from "./Routes/TermsAndCondtions";
import PrivacyPolicy from "./Routes/PrivacyPolicy";
import LoginPage from "./LoginAndSignup/Login";
import Registration from "./LoginAndSignup/Registration";
import Agent from "./Agent/Agent";
import Wheredoyouwant from "./components/Booking/Wheredoyouwant";
import SelectDate from "./components/Booking/SelectDate";
import WhoIsComeingWithYou from "./components/Booking/WhoIsComeingWithYou";
import SpendTime from "./components/Booking/SpendTime";
import TripItinerary from "./components/Booking/TripItinerary";
import WnatToGOForm from "./components/WnatToGOForm";
import AboutDestination from "./Routes/HomeSection/AboutDestination";
import BackgroundImg from "./components/BackgroundImg";
import ScrollToTop from "./components/ScrollToTop";
import AllPackages from "./pages/AllPackages";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ChangePassword from "./pages/Auth/ChangePassword";
import AdminProfile from "./pages/dashboard/AdminProfile";
import AddLeads from "./pages/dashboard/Leads/AdminLeads/AddLeads";
import LeadCost from "./pages/dashboard/Leads/AdminLeads/LeadCost";
import AllTransactions from "./pages/dashboard/Transactions/AllTransactions";
import AddNewPlan from "./pages/dashboard/Plan/AdminPlan/AddNewPlan";
import AdminReviews from "./pages/dashboard/websites/AdminReviews";
import Destinations from "./pages/dashboard/websites/Destinations/Destinations";
import AdminPackages from "./pages/dashboard/websites/Destinations/AdminPackages";
import MyLeads from "./pages/dashboard/Leads/VendorLeads/MyLeads";
import UserProfile from "./pages/dashboard/Leads/VendorLeads/UserProfile";
import PurchaseLeads from "./pages/dashboard/Leads/VendorLeads/PurchasedLeads";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Plans from "./pages/dashboard/Plan/VendorPlan/Plans";
import CheckAuth from "./components/auth/CheckAuth";
import Users from "./pages/dashboard/Users";
import PublicHomeLayout from "./components/PublicHomeLayout";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
const adminUser = ["admin"];
const vendorUser = ["user"];
function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicHomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/terms&condition" element={<TermsAndConditions />} />
          <Route path="/privacy&policy" element={<PrivacyPolicy />} />
          <Route path="/agent/login-agent" element={<LoginPage />} />
          <Route path="/all-packages" element={<AllPackages />} />

          <Route path="/agent/registration" element={<Registration />} />
          <Route path="/agent/forgot-password" element={<ForgotPassword />} />
          <Route path="/agent/verify-otp" element={<VerifyOTP />} />
          <Route path="/agent/add-new-password" element={<ChangePassword />} />
          <Route
            path="/get-qurey"
            element={
              <div>
                <BackgroundImg contact={{ title: "Get Quotes" }} />
                <WnatToGOForm />
              </div>
            }
          />
          <Route
            path="/destination/:id"
            element={
              <div>
                <BackgroundImg contact={{ title: "Get Ready for Trip" }} />
                <AboutDestination />
              </div>
            }
          />
          <Route
            path="/countries/:name"
            element={
              <div>
                <BackgroundImg contact={{ title: "Get Ready for Trip" }} />
                <AboutDestination />
              </div>
            }
          />

          {/*Booking Routes */}
          <Route path="/*location" element={<Wheredoyouwant />} />
          <Route path="/*select-date" element={<SelectDate />} />
          <Route path="/*peoples" element={<WhoIsComeingWithYou />} />
          <Route path="/*spend-time" element={<SpendTime />} />
          <Route path="/*trip-itinerary" element={<TripItinerary />} />
          <Route path="/get-quote" element={<WnatToGOForm />} />

          {/*Agent*/}
          <Route path="/agent" element={<Agent />} />
          {/* Unauthorized route for public layout */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/*Dashboard Routes*/}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route element={<CheckAuth roles={adminUser} />}>
            <Route path="users" element={<Users />} />
            <Route path={"admin-profile"} element={<AdminProfile />} />
            <Route path="add-leads" element={<AddLeads />} />
            <Route path="lead-cost" element={<LeadCost />} />
            <Route path="transactions" element={<AllTransactions />} />
            <Route path="add-new-plans" element={<AddNewPlan />} />
            <Route path="website/reviews" element={<AdminReviews />} />
            <Route path="website/destinations/*">
              <Route index element={<Destinations />} />
              <Route path="packages" element={<AdminPackages />} />
            </Route>
          </Route>
          <Route element={<CheckAuth roles={vendorUser} />}>
            <Route path="my-leads" element={<MyLeads />} />
            <Route path={`user-profile`} element={<UserProfile />} />
            <Route path="purchased-leads" element={<PurchaseLeads />} />
            <Route path="plans" element={<Plans />} />
          </Route>
          {/* Unauthorized route for dashboard layout */}
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        {/* Catch-all NotFound route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

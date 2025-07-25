import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../HaderFooter/Navbar";
import Footer from "../HaderFooter/Footer";

const PublicHomeLayout = () => {
  const location = useLocation();

  const shouldHideNavbarFooter =
    location.pathname.startsWith("/agent") ||
    location.pathname.startsWith("/*");

  return (
    <div>
      {!shouldHideNavbarFooter && <Navbar />}
      <div>
        <Outlet />
      </div>
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

export default PublicHomeLayout;

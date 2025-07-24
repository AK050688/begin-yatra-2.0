import SideBar from "./SideBar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import React from "react";
type Props = {};

const DashboardLayout = (props: Props) => {
  const location = useLocation();

  // Get the last non-empty segment of the path
  const lastSegment = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "Dashboard";
  }, [location.pathname]);

  // Capitalize the first letter
  const pageTitle = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <div className="flex">
      <SideBar />
      <main className="p-4 flex-1">
          {/* Header Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-xl font-bold">{pageTitle}</h1>
        <Link
          to="/"
          className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          Back to Dashboard
        </Link>
      </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

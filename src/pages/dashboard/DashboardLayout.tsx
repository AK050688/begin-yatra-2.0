import SideBar from "./SideBar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen, selectSidebar } from "../../store/sidebar";
import useIsMobile from "../../lib/useMobile";
type Props = {};

const DashboardLayout = (props: Props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectSidebar);
  const [title, setTitle] = useState("");
  const isMobile = useIsMobile();

  // Get the last non-empty segment of the path
  const lastSegment = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "Dashboard";
  }, [location.pathname]);

  // Capitalize the first letter
  const pageTitle =
    title || (lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1));

  return (
    <div className="flex relative">
      {/* Sidebar and overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 bg-opacity-30"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
      {(isSidebarOpen || !isMobile) && (
        <SideBar />
      )}
      <main className="p-4 flex-1">
          {/* Header Section */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow flex  justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 w-full">
          {isMobile && (
            <button
              className="mr-2 p-2 rounded hover:bg-gray-200"
              onClick={() => dispatch(setSidebarOpen(true))}
            >
              <span className="block w-6 h-0.5 bg-gray-700 mb-1" />
              <span className="block w-6 h-0.5 bg-gray-700 mb-1" />
              <span className="block w-6 h-0.5 bg-gray-700" />
            </button>
          )}
          <h1 className="text-xl sm:text-xl font-bold">{pageTitle}</h1>
        </div>
        <Link
          to="/"
          className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          Back to Dashboard
        </Link>
      </div>
        <Outlet context={setTitle} />
      </main>
    </div>
  );
};

export default DashboardLayout;

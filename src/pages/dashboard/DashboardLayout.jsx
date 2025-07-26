import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen, selectSidebar } from "../../store/sidebar";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectSidebar);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to get page name from pathname
  const getPageName = (pathname) => {
    const path = pathname.split('/').filter(Boolean);
    if (path.length >= 2) {
      const page = path[path.length - 1];
      // Convert kebab-case or camelCase to Title Case
      return page
        .replace(/([A-Z])/g, ' $1')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();
    }
    return 'Dashboard';
  };

  // Function to handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!isSidebarOpen));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
              >
                {isSidebarOpen ? (
                  <FaTimes className="text-gray-600 text-lg" />
                ) : (
                  <FaBars className="text-gray-600 text-lg" />
                )}
              </button>
            )}
            
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
              {getPageName(location.pathname)}
            </h1>
          </div>
          
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm font-medium"
          >
            <FaHome className="text-xs sm:text-sm" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </button>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
    </div>
  );
};

export default DashboardLayout; 
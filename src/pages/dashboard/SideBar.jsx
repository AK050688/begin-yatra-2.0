import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../store/userSlice";
import { setSidebarOpen, selectSidebar } from "../../store/sidebar";
import { useState } from "react";
import { StepBack } from "lucide-react";

const SideBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState({});
  const isSidebarOpen = useSelector(selectSidebar);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  // Helper to generate a unique key for each dropdown based on its path
  const getDropdownKey = (parentKey, label) => (parentKey ? `${parentKey} > ${label}` : label);

  const handleDropdownToggle = (dropdownKey) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }));
  };

  const adminLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/users", label: "Users" },
    { to: "/dashboard/add-leads", label: "Add Leads" },
    { to: "/dashboard/add-new-plans", label: "Add New Plans" },
    // { to: "/dashboard/lead-cost", label: "Lead Cost" },
    { to: "/dashboard/transactions", label: "All Transactions" },
    {
      label: "Website Management",
      subLinks: [
        { to: "/dashboard/website/reviews", label: "Reviews" },
        {
          label: "Destinations",
          subLinks: [
            { to: "/dashboard/website/destinations", label: "Destinations" },
            { to: "/dashboard/website/destinations/Packages", label: "Packages" },
          ],
        },
      
      ],
    },
  ];


  const vendorLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/my-leads", label: "My Leads" },
    { to: "/dashboard/plans", label: "Plans" },
    { to: "/dashboard/purchased-leads", label: "Purchased Leads" },
  ];

  const roleLinkMap = {
    admin: adminLinks,
    user: vendorLinks,
  };

  const navLinks = roleLinkMap[user.role];

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  // Recursive navigation renderer
  const renderNavLinks = (links, parentKey = "") => {
    return links.map((link) => {
      if (link.subLinks) {
        const dropdownKey = getDropdownKey(parentKey, link.label);
        return (
          <div key={dropdownKey} className="">
            <button
              type="button"
              className="flex items-center justify-between w-full font-semibold px-4 py-2 text-gray-700 focus:outline-none"
              onClick={() => handleDropdownToggle(dropdownKey)}
            >
              <span>{link.label}</span>
              <span className={`transition-transform duration-200 ${openDropdown[dropdownKey] ? "rotate-90" : "rotate-0"}`}>
                ▶
              </span>
            </button>
            {openDropdown[dropdownKey] && (
              <div className="pl-4 space-y-1">
                {renderNavLinks(link.subLinks, dropdownKey)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block w-full cursor-pointer text-left px-4 py-2 rounded ${
                isActive ? "bg-blue-400 text-white" : "hover:bg-gray-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        );
      }
    });
  };

  if (isMobile && !isSidebarOpen) return null;

  return (
    <aside
      className={`${
        isMobile
          ? "fixed inset-0 z-50 bg-white w-64 h-full shadow-lg"
          : "w-64 h-full relative scroll-y-auto"
      }`}
    >
      <div className="flex flex-col justify-between h-full border-r border-slate-200">
        <div>
          <div className="flex justify-between items-center p-4 h-20">
            <h1 className="text-2xl font-bold text-blue-400">
              <Link to="/">Begin Yatra</Link>
            </h1>
            {isMobile ? (
              <button
                onClick={() => dispatch(setSidebarOpen(false))}
                className="flex items-center"
              >
                <StepBack className="text-blue-400" />
              </button>
            ) : null}
          </div>
          <nav className="space-y-2 px-3">
            {renderNavLinks(navLinks)}
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

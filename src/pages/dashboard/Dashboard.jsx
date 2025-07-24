import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const user = useSelector(selectUser);

  const dashboardToRoleMap = {
    admin: <AdminDashboard />,
    user: <UserDashboard />,
  };

  return dashboardToRoleMap[user.role];
};

export default Dashboard;

import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";

export default function CheckAuth({ roles }) {
  const location = useLocation();
  const user = useSelector(selectUser);
  const context = useOutletContext(); // Forward context from parent

  if (!user) {
    return <Navigate to={"/agent/login-agent"} state={location} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={"/auth/unauthorized"} state={location} />;
  }

  return <Outlet context={context} />;
}

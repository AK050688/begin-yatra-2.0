import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function CheckAuth({ roles }) {
  const location = useLocation();
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={"/auth/login"} state={location} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={"/auth/unauthorized"} state={location} />;
  }

  return <Outlet />;
}

import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { GlobalContext } from "~/context/GlobalProvider";

const AuthRequired = ({ allowRole }) => {
  const { user } = useContext(GlobalContext);
  let location = useLocation();

  return allowRole.includes(Number(user?.role_id)) ? (
    <Outlet />
  ) : user?.name ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
};

export default AuthRequired;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./contexts/AuthContext";

function PrivateRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location.pathname }} />
  );
}

export default PrivateRoute;

import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router";

function Layout() {
  const location = useLocation();
  return (
    <div className="w-full h-full min-h-screen bg-white">
      {location.pathname !== "/" ? <Navbar /> : null}
      <Outlet />
    </div>
  );
}

export default Layout;

import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react"
const UserPanelMain = () => {
  const { user } = useAuth();   
  const location = useLocation();

 
  if (!user || (user.role !== "user" && user.role !== "manager")) {
    return <Navigate to="/login" replace />;
  }

  // 🔁 If path is exactly "/user" redirect to "/user/home"
  if (location.pathname === "/user" || location.pathname === "/manager") {
    return <Navigate to="home" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          {user.role === "manager" ? "Manager Panel" : "User Panel"}
        </h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="home"
            className={({ isActive }) =>
              `p-3 rounded-lg font-medium ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="complains"
            className={({ isActive }) =>
              `p-3 rounded-lg font-medium ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`
            }
          >
            Complains
          </NavLink>

        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default UserPanelMain;

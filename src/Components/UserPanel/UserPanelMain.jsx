// import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import React from "react"
// const UserPanelMain = () => {
//   const { user } = useAuth();   
//   const location = useLocation();

 
//   if (!user || (user.role !== "user" && user.role !== "manager")) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🔁 If path is exactly "/user" redirect to "/user/home"
//   if (location.pathname === "/user" || location.pathname === "/manager") {
//     return <Navigate to="home" replace />;
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg p-5">
//         <h2 className="text-2xl font-bold text-blue-600 mb-8">
//           {user.role === "manager" ? "Manager Panel" : "User Panel"}
//         </h2>

//         <nav className="flex flex-col gap-3">

//           <NavLink
//             to="home"
//             className={({ isActive }) =>
//               `p-3 rounded-lg font-medium ${
//                 isActive
//                   ? "bg-blue-500 text-white"
//                   : "hover:bg-blue-100 text-gray-700"
//               }`
//             }
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="complains"
//             className={({ isActive }) =>
//               `p-3 rounded-lg font-medium ${
//                 isActive
//                   ? "bg-blue-500 text-white"
//                   : "hover:bg-blue-100 text-gray-700"
//               }`
//             }
//           >
//             Complains
//           </NavLink>

//         </nav>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <Outlet />
//       </div>

//     </div>
//   );
// };

// export default UserPanelMain;

import { NavLink, Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import {
  Home,
  MessageSquare,
  LogOut,
  User,
  ChevronRight,
  Menu,
  X,
  Shield,
} from "lucide-react";

const UserPanelMain = () => {
  const { user, logout } = useAuth();
  const location         = useLocation();
  const navigate         = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Auth guard ─────────────────────────────────────────────────────────
  if (!user || (user.role !== "user" && user.role !== "manager")) {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === "/user" || location.pathname === "/manager") {
    return <Navigate to="home" replace />;
  }

  // ── How to show user name ──────────────────────────────────────────────
  // We check multiple field names because different backends use different keys.
  // user.username → if your backend returns { username: "Rahul" }
  // user.name     → if your backend returns { name: "Rahul" }
  // user.customerName → if your backend returns { customerName: "Rahul" }
  // user.email    → fallback if no name field exists
  const displayName =
    user.username     ||   // most common
    user.name         ||   // alternative
    user.customerName ||   // your project's field
    user.email        ||   // fallback to email
    "User";                // last resort default

  // ── First letter avatar ────────────────────────────────────────────────
  // Takes first character of name to show in avatar circle
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const isManager = user.role === "manager";

  // ── Logout handler ─────────────────────────────────────────────────────
  // How it works:
  // 1. If your AuthContext has a logout() function → call it (it clears token + user state)
  // 2. If no logout() in context → manually clear token from localStorage
  // 3. Navigate to login page either way
  const handleLogout = () => {
    if (typeof logout === "function") {
      // Your AuthContext has logout() → use it
      logout();
    } else {
      // Fallback: manually clear token if no logout function in context
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login", { replace: true });
  };

  // ── Nav items ──────────────────────────────────────────────────────────
  const navItems = [
    { to: "home",      label: "Home",       icon: Home          },
    { to: "complains", label: "Complaints", icon: MessageSquare },
  ];

  // ── Sidebar content (reused for mobile + desktop) ──────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Brand / Panel title */}
      <div className="px-5 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isManager ? "bg-purple-100" : "bg-blue-100"
          }`}>
            <Shield className={`w-4 h-4 ${isManager ? "text-purple-600" : "text-blue-600"}`} />
          </div>
          <div>
            <p className="text-xs text-gray-400 leading-none">Portal</p>
            <h2 className={`text-sm font-bold leading-tight ${
              isManager ? "text-purple-700" : "text-blue-700"
            }`}>
              {isManager ? "Manager Panel" : "User Panel"}
            </h2>
          </div>
        </div>
      </div>

      {/* ── User profile card ──────────────────────────────────────────
          Displays the logged-in user's name, role, and avatar.
          displayName reads from user.username / user.name / user.customerName
      ── */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          {/* Avatar circle with first letter of name */}
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${
            isManager ? "bg-purple-500" : "bg-blue-500"
          }`}>
            {avatarLetter}
          </div>
          <div className="flex-1 min-w-0">
            {/* ✅ Shows user's name — reads user.username or user.name or user.customerName */}
            <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
            {/* ✅ Shows role with capital first letter */}
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
          <User className="w-4 h-4 text-gray-300 flex-shrink-0" />
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? isManager
                    ? "bg-purple-500 text-white shadow-sm shadow-purple-200"
                    : "bg-blue-500 text-white shadow-sm shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Logout button ──────────────────────────────────────────────
          Calls handleLogout() which:
          1. Calls logout() from AuthContext if it exists
          2. OR clears localStorage token manually
          3. Then navigates to /login
      ── */}
      <div className="px-3 pb-5 pt-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 shadow-sm flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative z-10 w-64 bg-white h-full shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h2 className={`text-sm font-bold ${isManager ? "text-purple-700" : "text-blue-700"}`}>
            {isManager ? "Manager Panel" : "User Panel"}
          </h2>

          {/* Mini avatar on mobile */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
            isManager ? "bg-purple-500" : "bg-blue-500"
          }`}>
            {avatarLetter}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default UserPanelMain;
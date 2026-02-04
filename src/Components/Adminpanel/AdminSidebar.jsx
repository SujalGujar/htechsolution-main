import React, { useState } from "react";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiMail,
  FiUserPlus,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiGrid,
  FiLayers,
  FiBook,
  FiPhone,
  FiTool,
  FiCode,
  FiUser,
} from "react-icons/fi";

const SidebarItem = ({ item, active, onClick, icon: Icon, depth = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);

  const itemClass = `
    flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
    ${active === item.id 
      ? "bg-blue-600 text-white shadow-md" 
      : "hover:bg-gray-800 hover:text-white"
    }
    ${depth > 0 ? "ml-2" : ""}
  `;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      onClick(item.id);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={itemClass}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4" />}
          <span className="text-sm font-medium">{item.label}</span>
        </div>
        {hasChildren && (
          <span className="text-gray-400">
            {isOpen ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="mt-1 ml-2 border-l border-gray-700">
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              active={active}
              onClick={onClick}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 px-3 py-2 mb-2 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
    {Icon && <Icon className="w-3 h-3" />}
    <span>{title}</span>
  </div>
);

const AdminSidebar = ({ active, setActive }) => {
  const [expandedSections, setExpandedSections] = useState({
    pages: true,
    htech: true,
  });

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const menuStructure = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: FiGrid,
      items: [
        { id: "analytics", label: "Analytics", icon: FiLayers },
        { id: "reports", label: "Reports", icon: FiBook },
      ],
    },
    {
      id: "pages",
      label: "Page Management",
      icon: FiFileText,
      isSection: true,
      items: [
        {
          id: "home",
          label: "Home Page",
          icon: FiHome,
          children: [
            { id: "hero-home", label: "Hero Section" },
            { id: "about-home", label: "About Preview" },
            { id: "hardware", label: "Hardware Solutions" },
            { id: "software", label: "Software Projects" },
            // { id: "services", label: "Services Showcase" },
            { id: "project-deliverables", label: "Project Deliverables" },
            { id: "trending-topics", label: "Trending Topics" },
            { id: "achievements", label: "Our Achievements" },
            { id: "partners", label: "Our Partners" },
            { id: "clientExperience", label: "Client Experience" },
          ],
        },
        {
          id: "about",
          label: "About Page",
          icon: FiUsers,
          children: [
            { id: "about-main", label: "Main Content" },
            { id: "mission", label: "Mission & Vision" },
            { id: "whatWeAre", label: "What We Are" },
            { id: "team", label: "Team Members" },
            { id: "OurServices", label: "Our Services" },
          ],
        },
        {
          id: "blog",
          label: "Blog Management",
          icon: FiBook,
          children: [
            { id: "blog-hero", label: "Blog Hero" },
            { id: "blogs", label: "All Blog Posts" },
            { id: "categories", label: "Categories" },
            { id: "tags", label: "Tags" },
          ],
        },
        {
          id: "contact",
          label: "Contact Page",
          icon: FiMail,
          children: [
            { id: "contact-hero", label: "Contact Hero" },
            { id: "support", label: "Support Features" },
            { id: "contact-types", label: "Contact Types" },
            { id: "email", label: "Email Settings" },
          ],
        },
      ],
    },
    {
      id: "user-management",
      label: "User Management",
      icon: FiUserPlus,
      isSection: true,
      items: [
        {
          id: "users",
          label: "Users",
          icon: FiUsers,
          children: [
            { id: "customerForm", label: "Customer Forms" },
            { id: "create-form", label: "Create New User" },
            { id: "update-form", label: "Update Users" },
            { id: "roles", label: "User Roles" },
          ],
        },
        {
          id: "permissions",
          label: "Permissions",
          icon: FiSettings,
          children: [
            { id: "access-control", label: "Access Control" },
            { id: "module-access", label: "Module Access" },
          ],
        },
      ],
    },
    {
      id: "h-tech",
      label: "H-Tech Portal",
      icon: FiTool,
      isSection: true,
      items: [
        {
          id: "htech-pages",
          label: "H-Tech Pages",
          icon: FiCode,
          children: [
            { id: "htech-home", label: "Homepage", icon: FiHome },
            { id: "htech-about", label: "About", icon: FiUsers },
            { id: "htech-blogs", label: "Blogs", icon: FiBook },
            { id: "htech-contact", label: "Contact", icon: FiPhone },
          ],
        },
        {
          id: "htech-settings",
          label: "H-Tech Settings",
          icon: FiSettings,
          children: [
            { id: "theme", label: "Theme Settings" },
            { id: "integration", label: "Integrations" },
          ],
        },
      ],
    },
    {
      id: "system",
      label: "System Settings",
      icon: FiSettings,
      items: [
        { id: "general", label: "General Settings", icon: FiSettings },
        { id: "backup", label: "Backup & Restore", icon: FiTool },
      ],
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Logo/Header */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-gray-800">
        <div className="p-2 bg-blue-600 rounded-lg">
          <FiSettings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Admin Console</h2>
          <p className="text-xs text-gray-400">Dashboard v2.0</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-2 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-2.5">
            <FiChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="space-y-1">
        {menuStructure.map((section) => (
          <div key={section.id} className="mb-4">
            {section.isSection ? (
              <>
                <SectionHeader title={section.label} icon={section.icon} />
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      active={active}
                      onClick={setActive}
                      icon={item.icon}
                    />
                  ))}
                </div>
              </>
            ) : (
              <SidebarItem
                item={section}
                active={active}
                onClick={setActive}
                icon={section.icon}
              />
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
        <h3 className="text-xs uppercase text-gray-400 mb-3 font-semibold">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActive("create-form")}
            className="flex flex-col items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <FiUserPlus className="w-4 h-4 mb-1" />
            <span className="text-xs">Add User</span>
          </button>
          <button
            onClick={() => setActive("blogs")}
            className="flex flex-col items-center justify-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <FiBook className="w-4 h-4 mb-1" />
            <span className="text-xs">New Post</span>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-4 left-4 right-4 p-3 bg-gray-800/30 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-gray-400">Super Administrator</p>
          </div>
          <button className="p-1 hover:bg-gray-700 rounded">
            <FiSettings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../icons/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "About",
      path: "/aboutus",
      // children: [
      //   { name: "Our Software", path: "/aboutus/software" },
      //   { name: "Our Hardware", path: "/aboutus/hardware" },
      // ],
    },
    { name: "Service", path: "/service" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    {name:"Adminpanel", path:"admin-panel"}
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 mb-16 transition-all duration-300 bg-white ${
        scrolled ? "shadow-lg" : "shadow-sm" 
      }`}
    >
      <div
        className={`transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-3">
  <img
    src={logo}
    alt="H-Tech Solution"
    className="h-14 w-auto object-contain bg-white rounded-lg p-2 shadow"
  />

  <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide 
                 bg-gradient-to-r from-blue-600 to-cyan-500 
                 bg-clip-text text-transparent">
    H-Tech Solutions <span className="text-sm md:text-base font-semibold text-gray-500">Pvt. Ltd.</span>
  </h1>
</Link>


            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                // 🔹 NORMAL LINKS
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-lg font-semibold transition
          ${
            isActive
              ? "bg-[#1F6E8C] text-white"
              : "text-gray-800 hover:bg-[#1F6E8C] hover:text-white"
          }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="h-7 w-7 text-gray-800" />
              ) : (
                <Menu className="h-7 w-7 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-inner">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all
                      ${
                        isActive
                          ? "bg-[#1F6E8C] text-white"
                          : "text-gray-800 hover:bg-[#1F6E8C] hover:text-white"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 px-6 py-3 bg-[#1F6E8C] text-white font-bold rounded-lg text-center shadow hover:opacity-90 transition"
              >
                Start Your Project
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

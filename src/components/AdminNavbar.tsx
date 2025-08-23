import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "./AuthContext";

const AdminNavbar = () => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Services",
      subItems: [
        { name: "Upload Service Img/vid", path: "/admin/upload" },
        { name: "Manage Service Img", path: "/admin/ManageServicesMedia" },
        
      ],
    },
    {
      name: "Outdoor",
      subItems: [
        { name: "Add New Img/Vid", path: "/admin/OutdoorImageUploadPage" },
        { name: "Manage Images Order", path: "/admin/OutdoorOrderManagement" },
        { name: "View Images", path: "/admin/outdoorDisplay" },
      ],
    },
    {
      name: "Market News",
      subItems: [
        { name: "Add Market News", path: "/admin/CreateMarketNews" },
        { name: "Manage Market News", path: "/admin/ManageMarketNews" },
      ],
    },
    { name: "Logout", path: null },
  ];

  const isActive = (path: string | null) => (path ? location.pathname === path : false);

  async function handleSignOut() {
    try {
      await signOut();
    } finally {
      setIsMenuOpen(false);
      setOpenSubmenu(null);
      nav("/admin/login");
    }
  }

  const handleSubItemClick = () => {
    // close submenu and mobile menu
    setOpenSubmenu(null);
    setIsMenuOpen(false);
  };

  const renderNavItem = (item: any, isMobile = false) => {
    if (item.subItems) {
      const isOpen = openSubmenu === item.name;

      return (
        <div key={item.name} className="relative">
          <button
            type="button"
            onClick={() => setOpenSubmenu(isOpen ? null : item.name)}
            className={`flex items-center text-sm font-medium transition-colors duration-200 ${
              isOpen || item.subItems.some((sub: any) => isActive(sub.path))
                ? "text-[#C30010]"
                : "text-gray-700 hover:text-[#C30010]"
            }`}
          >
            {item.name}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div
              className={`${
                isMobile ? "pl-4 space-y-1" : "absolute left-0 mt-2 w-48 bg-white border shadow-md rounded-md"
              }`}
            >
              {item.subItems.map((sub: any) => (
                <Link
                  key={sub.name}
                  to={sub.path}
                  onClick={handleSubItemClick}
                  className={`block text-sm px-3 py-1 transition-colors duration-200 ${
                    isActive(sub.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
                  }`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.name === "Logout") {
      return (
        <button
          key={item.name}
          onClick={handleSignOut}
          className={`text-sm font-medium transition-colors duration-200 ${
            isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
          }`}
        >
          {item.name}
        </button>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.path!}
        onClick={() => { setIsMenuOpen(false); setOpenSubmenu(null); }}
        className={`text-sm font-medium transition-colors duration-200 ${
          isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
        }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {isMenuOpen && (
        <div
          className="sticky inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => { setIsMenuOpen(false); setOpenSubmenu(null); }}
        />
      )}

      <nav
        className={`sticky bg-black flex justify-between items-center
         py-1 px-5 left-0 right-0 top-0 backdrop-blur-md
        bg-opacity-10 text-white shadow-lg z-10 w-full transition-all duration-300
        ${isMenuOpen ? '!top-0 !rounded-b-none !max-w-full' : ''}
        ${isScrolled ? '!top-0' : ''}`}
      >
        <img src="/Opz-logo.png" alt="Admin Logo" className="w-35 h-16" />

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8 px-8">
          {navItems.map((item) => renderNavItem(item))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#C30010]"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sticky top-0 left-0 w-fit z-50 pt-[90px] md:hidden">
          <div className="px-5 pb-5 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item) => renderNavItem(item, true))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;

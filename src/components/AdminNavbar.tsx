import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "./AuthContext";


const AdminNavbar = () => {
  const { isAdmin, loading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const nav = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Upload Service Img/vid", path: "/admin/upload" },
    { name: "Outdoor Img Upload", path: "/admin/OutdoorImageUploadPage" },
    { name: "Outdoor Order Management", path: "/admin/OutdoorOrderManagement" },
    { name: "Outdoor Display", path: "/admin/outdoorDisplay" },
    { name: "Add Market News", path: "/admin/CreateMarketNews" },
    { name: "Manage Market News", path: "/admin/ManageMarketNews" },
    { name: "Logout", path: null },
  ];

  const isActive = (path: string | null) => {
    return path ? location.pathname === path : false;
  };

  async function handleSignOut() {
    try {
      await signOut();        // from AuthProvider -> calls supabase.auth.signOut()
    } finally {
      setIsMenuOpen(false);
      nav("/admin/login");    // redirect to login
    }
  }

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="sticky  inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className={`sticky bg-black flex justify-between items-center
         py-1 px-5 left-0 right-0 top-0 backdrop-blur-md
        bg-opacity-10 text-white shadow-lg z-10 w-full  transition-all duration-300
        ${isMenuOpen ? '!top-0 !rounded-b-none !max-w-full' : ''}
        ${isScrolled ? '!top-0' : ''}`}>

        {/* Logo */}
          <img src="/Opz-logo.png" alt="Admin Logo" className="w-35 h-16" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 px-8">
          {navItems.map((item) =>
          item.name === "Logout" ? (
            <button
              key={item.name}
              onClick={handleSignOut}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
              }`}
            >
              {item.name}
            </button>
          ) : (
            <Link
              key={item.name}
              to={item.path!}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
              }`}
            >
              {item.name}
            </Link>
          ))}
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
        <div className="sticky  top-0 left-0 w-fit z-50 pt-[90px] md:hidden">
          <div className="px-5 pb-5 space-y-1 bg-white border-t border-gray-200 shadow-lg">
          {navItems.map((item) =>
          item.name === "Logout" ? (
            <button
              key={item.name}
              onClick={handleSignOut}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
              }`}
            >
              {item.name}
            </button>
          ) : (
            <Link
              key={item.name}
              to={item.path!}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
              }`}
            >
              {item.name}
            </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;

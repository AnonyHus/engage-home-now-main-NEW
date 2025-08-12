import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { fetchServices } from "../services/fetchServices";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [services, setServices] = useState([]);
  useEffect(() => {
    fetchServices().then((data) => setServices(Array.isArray(data) ? data : []));
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Clients", path: "/clients" },
    { name: "About Us", path: "/about" },
    { name: "Market News", path: "/MarketNews" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav className={`fixed bg-black flex justify-between items-center
        py-1 px-5 left-1/2 translate-x-[-50%] top-[20px] rounded-full backdrop-blur-md
        bg-opacity-10 text-white shadow-lg z-50 w-full max-w-[95vw] transition-all duration-300
        ${isMenuOpen ? '!top-0 !rounded-b-none !max-w-full' : ''}
        ${isScrolled ? '!top-0' : ''}`}>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 px-4 md:px-10">
          <img src="/Opz-logo.png" alt="Opz Logo" className="w-35 h-16" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 px-8">
          {navItems.map((item) =>
            item.name === "Services" ? (
              <div 
                className="relative" 
                key={item.name}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="flex items-center">
                  <Link
                    to="/services"
                    className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                      isActive(item.path) ? "text-[#C30010]" : "text-gray-700 hover:text-[#C30010]"
                    }`}
                  >
                    Services
                  </Link>
                  <span className="text-gray-700">
                    <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </span>
                </div>
                {/* Dropdown */}
                {servicesOpen && (
                  <div className="backdrop-blur-md bg-opacity-70 absolute left-0 mt-0 min-w-[16rem] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <ul>
                      {services.map((service) => (
                        <li key={service.name}>
                          <Link
                            to={`/services/${service.slug}`}
                            className="block px-5 py-3 text-gray-700 hover:bg-[#F6F6F6] hover:text-[#C30010] rounded-lg transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-[#C30010]"
                    : "text-gray-700 hover:text-[#C30010]"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // prevent backdrop click from reopening
              setIsMenuOpen(!isMenuOpen)
              setMobileServicesOpen(false);
            }}

            className="p-2 text-gray-700 hover:text-[#C30010]"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full z-50 pt-[90px] md:hidden">
          <div className="px-5 pb-5 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {navItems.map((item) =>
              item.name === "Services" ? (
                <div key={item.name}>
                <div
  className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
    isActive(item.path)
      ? "text-[#C30010] bg-[#C30010]/10"
      : "text-gray-700 hover:text-[#C30010] hover:bg-gray-100"
  }`}
>
  {/* Clicking text navigates to /services */}
  <Link
    to="/services"
    className="flex-1"
    onClick={() => {
      setIsMenuOpen(false);
      setMobileServicesOpen(false);
    }}
  >
    Services
  </Link>

  {/* Clicking arrow toggles submenu */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setMobileServicesOpen(!mobileServicesOpen);
    }}
    type="button"
    className="p-1"
  >
    <ChevronDown className={`h-4 w-4 transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
  </button>
</div>

                  {mobileServicesOpen && (
                    <ul className="pl-4 space-y-1 mt-1">
                      {services.map((service) => (
                        <li key={service.name}>
                          <Link
                            to={`/services/${service.slug}`}
                            className="block w-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#C30010] rounded-md transition-colors"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-[#C30010] bg-[#C30010]/10"
                      : "text-gray-700 hover:text-[#C30010] hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
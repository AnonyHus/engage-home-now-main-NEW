import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Clients", path: "/clients" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  const services = [
    { name: "Web Development", path: "/services#web-development" },
    { name: "Mobile App Development", path: "/services#mobile-development" },
    { name: "UI/UX Design", path: "/services#ui-ux-design" },
    { name: "Digital Marketing", path: "/services#digital-marketing" },
    { name: "SEO Optimization", path: "/services#seo" },
    { name: "E-commerce Solutions", path: "/services#ecommerce" },
    { name: "Cloud Services", path: "/services#cloud" },
    { name: "Consulting", path: "/services#consulting" },
  ];

  const socialMedia = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com", color: "hover:text-[#C30010]" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "hover:text-[#D40011]" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", color: "hover:text-[#E50012]" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "hover:text-[#F60013]" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com", color: "hover:text-[#FF0014]" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#C30010] to-[#D40011] bg-clip-text text-transparent">
                EngageHome
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We create exceptional digital experiences that drive growth and engage your audience with cutting-edge solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-[#C30010]" />
                <span>hello@engagehome.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-[#C30010]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-[#C30010]" />
                <span>123 Innovation Drive, Tech City</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-gray-300 hover:text-[#C30010] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-gray-300 hover:text-[#C30010] transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 transition-all duration-200 ${social.color} hover:bg-gray-700`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-[#C30010]"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white rounded-r-md transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 EngageHome. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-[#C30010] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#C30010] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-[#C30010] text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
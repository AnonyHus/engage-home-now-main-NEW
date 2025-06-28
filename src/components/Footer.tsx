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
    <footer className="bg-background text-foreground border-t">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EngageHome
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We create exceptional digital experiences that drive growth and engage your audience with cutting-edge solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@engagehome.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Innovation Drive, Tech City</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-accent`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">Stay Updated</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-input border border-border rounded-l-md text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-md transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 EngageHome. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
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
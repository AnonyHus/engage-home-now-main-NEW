import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, AlertTriangle, Sparkles, Rocket, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[#FFF5F5] to-[#FDF6F6] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.01,
            y: -mousePosition.y * 0.01,
          }}
          transition={{ type: "spring", stiffness: 30 }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-[#D40011]/10 to-[#E50012]/10 rounded-full blur-xl"
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[Sparkles, Rocket, Target, Zap].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="absolute"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + (index % 2) * 40}%`,
            }}
          >
            <Icon className="h-8 w-8 text-[#C30010]/30" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Animated 404 with Glitch Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent leading-none relative">
              404
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent"
              >
                404
              </motion.span>
            </h1>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="h-8 w-8 text-[#C30010]" />
            </motion.div>
          </motion.div>

          {/* Animated Icon with Pulse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 relative"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 rounded-full border-2 border-[#C30010]/20"
            >
              <AlertTriangle className="h-12 w-12 text-[#C30010]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-[#C30010]/20 to-[#D40011]/20 rounded-full"
            />
          </motion.div>

          {/* Main Heading with Typewriter Effect */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Oops! Page Not Found
            </motion.span>
          </motion.h2>

          {/* Inspiring Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Don't worry! Even the best explorers sometimes take a wrong turn. 
            Let's discover something amazing together instead.
          </motion.p>

          {/* Animated Stats with Hover Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mb-12"
          >
            {[
              { number: "500+", label: "Projects Delivered", icon: Rocket },
              { number: "50+", label: "Happy Clients", icon: Target },
              { number: "5+", label: "Years Experience", icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 rounded-full mb-3 group-hover:from-[#C30010]/20 group-hover:to-[#D40011]/20 transition-all duration-300"
                >
                  <stat.icon className="h-6 w-6 text-[#C30010]" />
                </motion.div>
                <div className="text-2xl font-bold text-[#C30010] mb-1">{stat.number}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons with Enhanced Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white px-10 py-5 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Home className="mr-3 h-6 w-6" />
                  Back to Home
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#C30010] text-[#C30010] hover:bg-[#C30010] hover:text-white px-10 py-5 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Search className="mr-3 h-6 w-6" />
                  Explore Services
                </Button>
              </motion.div>
            </Link>
          </motion.div>
         
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Globe, Palette, BarChart3, Smartphone, ShoppingCart, Cloud, Users, ArrowRight, Sparkles, Zap, Target, Rocket, Code, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchServices } from "../services/fetchServices";
import LoadingComp from "../components/Loading"
import Breadcrumb from "../components/Breadcrumb";
import ContactSection from "../components/ContactSection";


const Services = () => {
  const [showContact, setShowContact] = useState(false);
  const [allServices, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        console.log("Starting to load services..."); // Debug log
        const data = await fetchServices();
        console.log("Fetched services data:", data); // Debug log
        console.log("Data type:", typeof data); // Debug log
        console.log("Is array:", Array.isArray(data)); // Debug log
        console.log("Data length:", data?.length); // Debug log
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading services:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Better icon mapping with more relevant icons
  const serviceIcons = {
   // Default fallback
    'default': Sparkles
  };


  return (
    <div className="min-h-screen bg-white">

        <Breadcrumb 
        items={[
          { label: "Home", to: "/" },
          { label: "Services" }, // no "to" means it's the current page
        ]}
      />
      {/* Header with Icon */}
      <section className="relative py-0 mt-0 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F5] to-[#FDF6F6]">
        {/* Abstract SVG or Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full opacity-30">
            <path fill="#C30010" fillOpacity="0.07" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 pb[4px] bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-5 py-2 mb-7 shadow-md animate-pulse">
              <Sparkles className="h-5 w-5 text-[#C30010] drop-shadow" />
              <span className="text-base font-semibold text-[#C30010] tracking-wide">Our Services</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-7 leading-tight drop-shadow-lg">
            Our Services
            </h1>
            <p className="text-2xl text-gray-800 max-w-full mx-auto leading-relaxed font-medium">
            We deliver strategic digital experiences that elevate brands, fuel innovation, and drive measurable business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Modern Design */}
      <section className="py-5 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
            All-in-One Digital Growth Partner
            </h2>
            <p className="text-xl text-gray-700 max-w-full mx-auto">
            From idea to execution, we provide end-to-end digital services designed to grow your brand and outpace the competition.            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-10">
                 <LoadingComp/>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-10">
                <p className="text-red-500">Error loading services: {error}</p>
              </div>
            ) : allServices.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No services found</p>
              </div>
            ) : (
              allServices.map((service, idx) => {
                console.log("Service object:", service); // Debug log to see all properties
                const IconComponent = serviceIcons[service.id] || serviceIcons.default;
                return (
                  <motion.div
                    key={service.id || idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <Card className="group relative h-full overflow-hidden border-0 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                    <Link to={`/services/${service.slug}`}>
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Top Section - Icon & Title */}
                        <div className="p-8 pb-2">
                        <div className="flex items-center space-x-4 mb-4 group">
                          {/* Icon beside Title */}
                          <div className="w-14 h-14 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#C30010] transition-colors duration-300">
                            {service.name || "No Title"}
                          </h3>
                        </div>
                      </div>

                        {/* Divider Line */}
                        <div className="px-2">
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        </div>
                        
                        {/* Middle Section - Description */}
                        <div className="p-8 pt-3 pb-4">
                          <p className="text-gray-600 leading-relaxed text-base">
                            {service.Services_page_desc || "No Description"}
                          </p>
                        </div>
                        
                        {/* Divider Line */}
                        <div className="px-8">
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                        </div>
                        
                        {/* Bottom Section - Features & Button */}
                        <div className="p-8 pt-4 flex flex-col flex-grow">
                          {/* Features */}
                          <div className="space-y-3 mb-6">
                            {service.features?.map((feature, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">{feature}</span>
                              </div>
                            )) || <p className="text-gray-400 text-sm">No features available</p>}
                          </div>
                          
                          {/* Explore More Button */}
                          <div className="mt-auto">
                            <Link to={`/services/${service.slug}`}>
                              <Button 
                                className="w-full bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border-0 group-hover:scale-105"
                              >
                                <span>Explore More</span>
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Dark Process Section */}
      <section className="py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-[#C30010]/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C30010]/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#C30010]/10 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Our Process</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that delivers exceptional results for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg backdrop-blur-sm">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#D40011] to-[#E50012] rounded-full flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Discovery</h3>
              <p className="text-gray-300 leading-relaxed">We start by understanding your business goals, target audience, and project requirements.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#D40011] to-[#E50012] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg backdrop-blur-sm">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#E50012] to-[#F60013] rounded-full flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Planning</h3>
              <p className="text-gray-300 leading-relaxed">We create a detailed roadmap and strategy to achieve your objectives effectively.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#E50012] to-[#F60013] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg backdrop-blur-sm">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#F60013] to-[#FF0014] rounded-full flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Development</h3>
              <p className="text-gray-300 leading-relaxed">Our expert team builds your solution using the latest technologies and best practices.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#F60013] to-[#FF0014] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg backdrop-blur-sm">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-full flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                  4
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Launch</h3>
              <p className="text-gray-300 leading-relaxed">We deploy your solution and provide ongoing support to ensure continued success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-red-100 mb-12 leading-relaxed">
            Let's discuss your project and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
              onClick={() => setShowContact(true)}
                size="lg" 
                className="bg-white text-[#C30010] hover:bg-gray-100 px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold border border-[#C30010]/30"
              >
                Contact Us   
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {showContact && (
            <div className="modal-backdrop">
              <div className="modal-content">
                <button className="modal-close" onClick={() => setShowContact(false)}>×</button>
                <ContactSection hideVisitCard onSuccess={() => setShowContact(false)} />
              </div>
            </div>      )}
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-[#C30010] hover:bg-[#C30010] hover:text-white px-10 py-4 text-lg rounded-full transition-all duration-300 font-semibold "
              >
                Learn About Us
                <ArrowRight></ArrowRight>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

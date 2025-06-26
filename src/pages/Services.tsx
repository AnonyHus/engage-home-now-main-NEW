import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Globe, Palette, BarChart3, Smartphone, ShoppingCart, Cloud, Users, ArrowRight, Sparkles, Zap, Target, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Services = () => {
  const allServices = [
    {
      id: "web-development",
      title: "Web Development",
      subtitle: "Custom Websites & Applications",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
      icon: Globe,
      color: "from-[#C30010] via-[#D40011] to-[#E50012]",
      bgColor: "from-[#C30010]/20 via-[#D40011]/20 to-[#E50012]/20",
      path: "/services/web-development",
      features: ["Responsive Design", "Modern Technologies", "SEO Optimization"],
      gradient: "from-[#C30010] to-[#D40011]"
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      subtitle: "User-Centered Design Solutions",
      description: "Intuitive and engaging user interfaces designed to enhance user experience and drive conversions across all platforms.",
      icon: Palette,
      color: "from-[#D40011] via-[#E50012] to-[#F60013]",
      bgColor: "from-[#D40011]/20 via-[#E50012]/20 to-[#F60013]/20",
      path: "/services/ui-ux-design",
      features: ["User Research", "Wireframing", "Prototyping"],
      gradient: "from-[#D40011] to-[#E50012]"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      subtitle: "Growth & Engagement Strategies",
      description: "Comprehensive digital marketing solutions that increase brand visibility, drive traffic, and generate measurable business results.",
      icon: BarChart3,
      color: "from-[#E50012] via-[#F60013] to-[#FF0014]",
      bgColor: "from-[#E50012]/20 via-[#F60013]/20 to-[#FF0014]/20",
      path: "/services/digital-marketing",
      features: ["SEO & SEM", "Social Media", "Content Marketing"],
      gradient: "from-[#E50012] to-[#F60013]"
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      subtitle: "Native & Cross-Platform Apps",
      description: "Native and cross-platform mobile applications for iOS and Android devices with seamless user experiences.",
      icon: Smartphone,
      color: "from-[#B2000F] via-[#C30010] to-[#D40011]",
      bgColor: "from-[#B2000F]/20 via-[#C30010]/20 to-[#D40011]/20",
      path: "/services/mobile-development",
      features: ["iOS Development", "Android Development", "Cross-Platform"],
      gradient: "from-[#B2000F] to-[#C30010]"
    },
    {
      id: "ecommerce",
      title: "E-commerce Solutions",
      subtitle: "Complete Online Stores",
      description: "Complete online store solutions with payment processing, inventory management, and customer experience optimization.",
      icon: ShoppingCart,
      color: "from-[#A1000E] via-[#B2000F] to-[#C30010]",
      bgColor: "from-[#A1000E]/20 via-[#B2000F]/20 to-[#C30010]/20",
      path: "/services/ecommerce",
      features: ["Payment Integration", "Inventory Management", "Analytics"],
      gradient: "from-[#A1000E] to-[#B2000F]"
    },
    {
      id: "cloud-services",
      title: "Cloud Services",
      subtitle: "Scalable Infrastructure",
      description: "Scalable cloud infrastructure and hosting solutions for modern applications with high availability and security.",
      icon: Cloud,
      color: "from-[#90000D] via-[#A1000E] to-[#B2000F]",
      bgColor: "from-[#90000D]/20 via-[#A1000E]/20 to-[#B2000F]/20",
      path: "/services/cloud-services",
      features: ["AWS/Azure", "DevOps", "Security"],
      gradient: "from-[#90000D] to-[#A1000E]"
    },
    {
      id: "consulting",
      title: "Digital Consulting",
      subtitle: "Strategic Transformation",
      description: "Strategic digital transformation consulting to help businesses optimize their digital presence and technology stack.",
      icon: Users,
      color: "from-[#7F000C] via-[#90000D] to-[#A1000E]",
      bgColor: "from-[#7F000C]/20 via-[#90000D]/20 to-[#A1000E]/20",
      path: "/services/consulting",
      features: ["Strategy Planning", "Technology Audit", "Implementation"],
      gradient: "from-[#7F000C] to-[#90000D]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Icon */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F5] to-[#FDF6F6]">
        {/* Abstract SVG or Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full opacity-30">
            <path fill="#C30010" fillOpacity="0.07" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-8 group text-gray-600 hover:text-[#C30010]"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-5 py-2 mb-7 shadow-md animate-pulse">
              <Sparkles className="h-5 w-5 text-[#C30010] drop-shadow" />
              <span className="text-base font-semibold text-[#C30010] tracking-wide">Our Services</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-7 leading-tight drop-shadow-lg">
              Digital Solutions
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              We craft exceptional digital experiences that drive growth and innovation for forward-thinking businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Modern Design */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Complete Digital Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end digital services that transform your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="group relative h-full overflow-hidden border border-gray-200 bg-white hover:bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Header with Icon */}
                    <div className={`relative p-8 bg-gradient-to-br ${service.bgColor} border-b border-gray-100 rounded-t-2xl`}>
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C30010]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      {/* Icon */}
                      <div className="relative z-10">
                        <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                          <service.icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#C30010] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-600 font-medium">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-gray-700 leading-relaxed mb-8 text-base">
                        {service.description}
                      </p>
                      {/* Features */}
                      <div className="space-y-4 mb-8">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                            <span className="text-sm text-gray-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      {/* Explore More Button */}
                      <div className="mt-auto">
                        <Link to={service.path}>
                          <Button 
                            className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group-hover:scale-105 border-0`}
                          >
                            <span>Explore More</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-[#C30010]/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C30010]/10 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#C30010]/10 backdrop-blur-sm border border-[#C30010]/20 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-[#C30010]" />
              <span className="text-sm font-medium text-[#C30010]">Our Process</span>
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
                <div className="w-20 h-20 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#D40011] to-[#E50012] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Discovery</h3>
              <p className="text-gray-300 leading-relaxed">We start by understanding your business goals, target audience, and project requirements.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#D40011] to-[#E50012] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#E50012] to-[#F60013] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Planning</h3>
              <p className="text-gray-300 leading-relaxed">We create a detailed roadmap and strategy to achieve your objectives effectively.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#E50012] to-[#F60013] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#F60013] to-[#FF0014] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Development</h3>
              <p className="text-gray-300 leading-relaxed">Our expert team builds your solution using the latest technologies and best practices.</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#F60013] to-[#FF0014] rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#C30010] to-[#D40011] rounded-full flex items-center justify-center text-white font-bold text-sm">
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
      <section className="py-24 relative overflow-hidden">
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
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-900 px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold border border-[#C30010]/30"
              >
                Start Your Project
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-10 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
              >
                Learn About Us
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

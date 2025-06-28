import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Globe, Code, Smartphone, Database, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const WebDevelopment = () => {
  const features = [
    {
      icon: Globe,
      title: "Responsive Design",
      description: "Websites that look and work perfectly on all devices, from desktop to mobile.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      icon: Code,
      title: "Modern Technologies",
      description: "Built with the latest frameworks and technologies for optimal performance.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Approach",
      description: "Optimized for mobile devices with touch-friendly interfaces and fast loading.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "Robust backend systems with secure data management and API development.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      icon: Shield,
      title: "Security & Performance",
      description: "Enterprise-grade security measures and optimized performance for your users.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      icon: Zap,
      title: "SEO Optimization",
      description: "Search engine optimized websites that rank well and drive organic traffic.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const webDevelopmentImages = [
    {
      id: 1,
      title: "Modern E-commerce Platform",
      description: "Full-featured online store with payment processing",
      gradient: "from-[#C30010] to-[#D40011]"
    },
    {
      id: 2,
      title: "Corporate Website",
      description: "Professional business website with modern design",
      gradient: "from-[#D40011] to-[#E50012]"
    },
    {
      id: 3,
      title: "Mobile App Dashboard",
      description: "Responsive admin dashboard for mobile applications",
      gradient: "from-[#E50012] to-[#F60013]"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Creative portfolio showcasing work and skills",
      gradient: "from-[#F60013] to-[#FF0014]"
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "Content management system for blogs and articles",
      gradient: "from-[#B2000F] to-[#C30010]"
    },
    {
      id: 6,
      title: "Landing Page",
      description: "High-converting landing page for marketing campaigns",
      gradient: "from-[#A1000E] to-[#B2000F]"
    },
    {
      id: 7,
      title: "Web Application",
      description: "Complex web application with advanced features",
      gradient: "from-[#90000D] to-[#A1000E]"
    },
    {
      id: 8,
      title: "Restaurant Website",
      description: "Beautiful website for restaurants and food services",
      gradient: "from-[#7F000C] to-[#90000D]"
    },
    {
      id: 9,
      title: "Educational Platform",
      description: "Learning management system for online education",
      gradient: "from-[#C30010] to-[#D40011]"
    },
    {
      id: 10,
      title: "Real Estate Website",
      description: "Property listing and management platform",
      gradient: "from-[#D40011] to-[#E50012]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Link to="/services">
              <Button variant="ghost" className="mb-6 text-gray-700 hover:text-[#C30010]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-block bg-[#C30010]/20 text-[#C30010] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#C30010]/30">
              Web Development
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#C30010] to-[#D40011] bg-clip-text text-transparent mb-6">
              Web Development Services
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We create exceptional web experiences that drive growth and engage your audience with cutting-edge technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="aspect-video bg-gradient-to-br from-[#C30010] to-[#D40011] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play className="h-8 w-8 ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Web Development Overview</h3>
                  <p className="text-lg opacity-90">Watch our comprehensive guide to modern web development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Web Development?</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our web development services combine cutting-edge technology with proven methodologies to deliver 
              websites and web applications that not only look stunning but also perform exceptionally well. 
              We focus on creating user-centered experiences that drive engagement and achieve your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
              <p className="text-gray-700 leading-relaxed">
                Every project is unique, and we believe in creating custom solutions tailored to your specific needs. 
                From simple landing pages to complex web applications, we build solutions that scale with your business.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Technologies</h3>
              <p className="text-gray-700 leading-relaxed">
                We use the latest technologies and frameworks including React, Vue.js, Node.js, and more to ensure 
                your website is fast, secure, and future-proof. Our development process follows industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 10 Pictures Section - Full Width */}
      <section className="py-20 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Web Development Portfolio</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our diverse collection of web development projects showcasing different industries and technologies.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {webDevelopmentImages.map((image) => (
              <Card key={image.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 bg-gray-900/50">
                <CardContent className="p-0">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${image.gradient} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <div className="text-3xl font-bold mb-3">{image.title}</div>
                      <div className="text-lg opacity-90">{image.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Features & Technologies</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We leverage cutting-edge technologies and best practices to deliver exceptional web solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:shadow-[#C30010]/20 border border-gray-200 bg-white/50"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#C30010] to-[#D40011]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Next Web Project?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Let's discuss your web development needs and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-[#C30010] hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold"
              >
                Start Your Project
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebDevelopment; ;
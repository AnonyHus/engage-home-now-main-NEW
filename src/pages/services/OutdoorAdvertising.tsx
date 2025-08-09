import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, BarChart3, Target, TrendingUp, Users, Megaphone, Zap, Monitor, Smartphone, Globe, ArrowRight, MonitorPlay } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useState } from "react";
import ContactSection from "../../components/ContactSection";
import '../../styles/globals.css';
import Breadcrumb from "../../components/Breadcrumb";



const OutdoorAdvertising = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showContact, setShowContact] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marketingImages = [
    {
      id: 1,
      title: "Social Media Campaign",
      description: "Engaging social media campaigns across multiple platforms",
      gradient: "from-[#C30010] to-[#D40011]"
    },
    {
      id: 2,
      title: "Email Marketing",
      description: "Automated email marketing sequences and newsletters",
      gradient: "from-[#D40011] to-[#E50012]"
    },
    {
      id: 3,
      title: "PPC Advertising",
      description: "Pay-per-click advertising on Google and social platforms",
      gradient: "from-[#E50012] to-[#F60013]"
    },
    {
      id: 4,
      title: "Content Marketing",
      description: "Blog posts, articles, and educational content",
      gradient: "from-[#F60013] to-[#FF0014]"
    },
    {
      id: 5,
      title: "SEO Optimization",
      description: "Search engine optimization for better rankings",
      gradient: "from-[#B2000F] to-[#C30010]"
    },
    {
      id: 6,
      title: "Influencer Marketing",
      description: "Strategic partnerships with industry influencers",
      gradient: "from-[#A1000E] to-[#B2000F]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-10 mt-0 bg-gradient-to-br from-white via-[#FFF5F5] to-[#e3b7b7]">
        <Breadcrumb 
        items={[
          { label: "Home", to: "/" },
          { label: "Services", to:"/services" }, 
          { label: "Outdoor Advertising" }, 
        ]}
      />
          
          <div className="text-center mb-8">
            <div className="inline-block bg-[#C30010] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            Outdoor Advertising
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Outdoor Advertising Solutions
            </h1>
            <p className="text-xl text-gray-700 max-w-full mx-auto">
            We create impactful outdoor campaigns with strategic placement and creative visuals to ensure your brand stands out. 
            </p>
          </div>
      </section>

      {/* Two Clickable Squares Section */}
      <section className="py-5 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Perfect Option</h2>
            <p className="text-xl text-gray-700 max-w-full mx-auto">
            Pick the advertising type that suits your brand best, with options designed to maximize impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {/* first Square - Static */}
               <Card 
              className=" aspect[3/2] group cursor-pointer overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D40011]/20"
              onClick={() => scrollToSection('static-section')}
            >
              <CardContent className="p-0">
                <div className=" relative overflow-hidden group rounded-3xl">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ce414d] via-[#E50012] to-[#fbb034] transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 rounded-3xl"></div>
                  {/* SVG Pattern Overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-10 rounded-3xl" viewBox="0 0 100 100" fill="none">
                    <circle cx="20" cy="20" r="10" fill="#fff" />
                    <circle cx="80" cy="80" r="10" fill="#fff" />
                    <circle cx="50" cy="50" r="8" fill="#fff" />
                  </svg>
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-gray-900 p-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img src="/icons/Static-Icon.png" alt="Billboard Icon" className="h-10 w-10" />
                    </div>
                    <h3 className="text-4xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                      Static
                    </h3>
                    <p className="text-lg  opacity-90 leading-relaxed max-w-full">
                    Fixed billboards strategically placed to capture daily traffic and ensure long-lasting brand exposure. 
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xl opacity-90 font-bold">
                      <span className="font-bold">Click to explore</span>
                      <ArrowLeft className="h-4 w-4 rotate-180 font-bold" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* second Square - Screens */}
            <Card 
              className="group cursor-pointer overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C30010]/20"
              onClick={() => scrollToSection('screens-section')}
            >
              <CardContent className="p-0">
                <div className=" relative overflow-hidden group rounded-3xl">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#C30010] via-[#D40011] to-[#ffb347] transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 rounded-3xl"></div>
                  {/* SVG Pattern Overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-10 rounded-3xl" viewBox="0 0 100 100" fill="none">
                    <circle cx="20" cy="20" r="10" fill="#fff" />
                    <circle cx="80" cy="80" r="10" fill="#fff" />
                    <circle cx="50" cy="50" r="8" fill="#fff" />
                  </svg>
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-gray-900 p-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img src="/icons/screen-billboard-icon.png" alt="Screen Icon" className="h-10 w-10" />
                    </div>
                    <h3 className="text-4xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                      Screens
                    </h3>
                    <p className="text-lg opacity-90 leading-relaxed max-w-full">
                    Dynamic screens with eye-catching motion content to keep your brand ahead of the competition. 
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xl opacity-90 font-bold">
                    <span className="font-bold">Click to explore</span>
                    <ArrowLeft className="h-4 w-4 rotate-180 font-bold" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

         
          </div>
        </div>
      </section>

    {/* Static Section */}
    <section id="static-section" className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block bg-[#D40011] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Static
                  </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Static Billboard Advertising</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Create a lasting impression with strategically placed static billboards. 
            </p>
              </div>

              {/* Video Section */}
              <div className="mb-10">
                <div className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    {/* Video Section */}
                      <video
                      className=""
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/videos/outdoor-static-opzoptimize.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                </div>
              </div>

              {/* Description */}
              <div className="text-center mb-10">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Static Billboards</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Our static billboards ensure your message is prominently displayed, offering continuous exposure in high-traffic areas. Designed for maximum visibility, these billboards are customized to fit different locations and audience needs. 
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#D40011] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Megaphone className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Prime Locations</h4>
                      <p className="text-sm text-gray-600">Placed on top-tier roads.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#D40011] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Multiple Sizes</h4>
                      <p className="text-sm text-gray-600">Available in various billboard dimensions.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#D40011] rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">High Visibility</h4>
                      <p className="text-sm text-gray-600">Captures attention of daily traffic.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Static Portfolio */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Static Billboard Portfolio</h3>
                <p className="text-lg text-gray-600">Examples of our Static Billboards</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketingImages.slice(3, 6).map((image) => (
                  <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-50">
                    <CardContent className="p-0">
                      <div className={`aspect-[4/3] bg-gradient-to-br ${image.gradient} flex items-center justify-center`}>
                        <div className="text-center text-gray-900">
                          <div className="text-2xl font-bold mb-2">{image.title}</div>
                          <div className="text-sm opacity-90">{image.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Navigation Button for Static Section */}
              <div className="text-center mt-12">
              <Link to="/our-locations">
                  <Button 
                    size="lg" 
                    className="bg-[#D40011] hover:bg-[#E50012] text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold group"
                  >
                    <Globe className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Discover  Static Billboards 
                    <ArrowLeft className="h-5 w-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
    </section>




      {/* Screens Section */}
      <section id="screens-section" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#C30010] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Screens
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Digital Screen Advertising</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Showcase your brand with vibrant, dynamic screens for maximum attention. 
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-10">
                <div className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

          <video
          className=""
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/outdoor-screen-opzoptimize.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
        </div>

          {/* Description */}
          <div className="text-center mb-10">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Digital Screens</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our digital screen solutions combine cutting-edge visuals with strategic placements to ensure your message is both dynamic and impactful. We create motion-based ads that keep your audience engaged while delivering your brand’s story with creativity and clarity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">High Visibility</h4>
                  <p className="text-sm text-gray-700">Always visible in busy spots.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-3">
                    <MonitorPlay className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dynamic Content</h4>
                  <p className="text-sm text-gray-700">Supports animated graphics.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Exposure</h4>
                  <p className="text-sm text-gray-700">Ads running day and night.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Screens Portfolio */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Screens Marketing Portfolio</h3>
            <p className="text-lg text-gray-700">Examples of our Digital Screens campaigns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingImages.slice(0, 3).map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-0">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${image.gradient} flex items-center justify-center`}>
                    <div className="text-center text-gray-900">
                      <div className="text-2xl font-bold mb-2">{image.title}</div>
                      <div className="text-sm opacity-90">{image.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Button for Screens Section */}
          <div className="text-center mt-12">
            <Link to="/our-locations">
              <Button 
                size="lg" 
                className="bg-[#C30010] hover:bg-[#D40011] text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold group"
              >
                <Globe className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Explore Screens Locations
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
     
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#C30010] to-[#D40011]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Let's discuss your marketing goals and create a strategy that drives real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Button 
    onClick={() => setShowContact(true)}
    size="lg" 
    className="bg-white text-[#C30010] hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold"
  >
    Start Your Campaign
  </Button>
  
  {showContact && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="w-full h-full sm:w-auto sm:h-auto sm:max-w-3xl sm:max-h-[90vh] bg-white sm:rounded-xl overflow-auto relative">
        <button 
          className="sticky top-4 right-4 ml-auto text-3xl text-gray-600 hover:text-gray-900 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={() => setShowContact(false)}
        >
          ×
        </button>
        <div className="p-4 sm:p-6">
          <ContactSection hideVisitCard onSuccess={() => setShowContact(false)} />
        </div>
      </div>
    </div>
  )}
  
  <Link to="/services">
    <Button 
      size="lg" 
      variant="outline"
      className="bg-white text-[#C30010] hover:bg-[#C30010] hover:text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 font-semibold"
    >
      View All Services
      <ArrowRight className="ml-2" />
    </Button>
  </Link>
</div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OutdoorAdvertising; 
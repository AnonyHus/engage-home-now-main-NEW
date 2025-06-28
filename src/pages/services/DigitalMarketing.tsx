import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, BarChart3, Target, TrendingUp, Users, Megaphone, Zap, Monitor, Smartphone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useState } from "react";

const DigitalMarketing = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Link to="/services">
              <Button variant="ghost" className="mb-6 text-gray-700 hover:text-[#C30010] bg-white/10 hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-block bg-[#C30010] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Digital Marketing
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Digital Marketing Services
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We create data-driven digital marketing strategies that drive growth, increase brand awareness, and deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Two Clickable Squares Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Marketing Focus</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our two main digital marketing approaches - each designed to achieve specific business objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* First Square - Screens */}
            <Card 
              className="group cursor-pointer overflow-hidden border-2 border-gray-200 bg-white hover:border-[#C30010] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C30010]/20"
              onClick={() => scrollToSection('screens-section')}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-[#C30010] to-[#D40011] relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-8 right-8 w-24 h-24 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-gray-900 p-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Monitor className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                      Screens
                    </h3>
                    <p className="text-lg opacity-90 leading-relaxed max-w-sm">
                      Multi-screen digital marketing campaigns that engage your audience across all devices and platforms.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm opacity-80">
                      <span>Click to explore</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second Square - Static */}
            <Card 
              className="group cursor-pointer overflow-hidden border-2 border-gray-200 bg-white hover:border-[#D40011] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D40011]/20"
              onClick={() => scrollToSection('static-section')}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-[#D40011] to-[#E50012] relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-8 left-8 w-20 h-20 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-8 right-8 w-28 h-28 bg-white/30 rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/20 rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-gray-900 p-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">
                      Static
                    </h3>
                    <p className="text-lg opacity-90 leading-relaxed max-w-sm">
                      Static content marketing strategies that build authority and drive long-term organic growth.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm opacity-80">
                      <span>Click to explore</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Screens Section */}
      <section id="screens-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#C30010] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Multi-Screen Marketing
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Screens Marketing Strategy</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Engage your audience across all devices and platforms with our comprehensive multi-screen marketing approach.
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-[#C30010] to-[#D40011] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Screens Marketing Overview</h3>
                    <p className="text-lg opacity-90">Watch our comprehensive guide to multi-screen marketing strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Multi-Screen Approach</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our screens marketing strategy focuses on creating seamless experiences across all devices and platforms. 
                We develop targeted campaigns that engage your audience whether they're on mobile, tablet, desktop, or smart TV. 
                This approach ensures maximum reach and engagement through consistent messaging and optimized content delivery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cross-Platform</h4>
                  <p className="text-sm text-gray-700">Seamless experience across all devices</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
                  <p className="text-sm text-gray-700">Optimized for each platform's strengths</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#C30010] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Engagement</h4>
                  <p className="text-sm text-gray-700">Interactive content that converts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Screens Portfolio */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Screens Marketing Portfolio</h3>
            <p className="text-lg text-gray-700">Examples of our multi-screen marketing campaigns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingImages.slice(0, 3).map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-white">
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
                Explore Our Screens Locations
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Static Section */}
      <section id="static-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-[#D40011] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Content Marketing
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Static Marketing Strategy</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Build lasting authority and drive sustainable growth with our static content marketing strategies.
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-[#D40011] to-[#E50012] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Static Marketing Overview</h3>
                    <p className="text-lg opacity-90">Watch our comprehensive guide to content marketing strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Content Marketing</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our static marketing strategy focuses on creating valuable, evergreen content that builds authority and drives 
                long-term organic growth. We develop comprehensive content plans that educate your audience, improve search rankings, 
                and establish your brand as a thought leader in your industry.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D40011] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Megaphone className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content Creation</h4>
                  <p className="text-sm text-gray-600">High-quality, engaging content</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D40011] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">SEO Optimization</h4>
                  <p className="text-sm text-gray-600">Search engine visibility</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#D40011] rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
                  <p className="text-sm text-gray-600">Data-driven optimization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Static Portfolio */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Static Marketing Portfolio</h3>
            <p className="text-lg text-gray-600">Examples of our content marketing strategies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingImages.slice(3, 6).map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-gray-50">
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
                Discover Our Screens Network
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
            Ready to Transform Your Digital Marketing?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Let's discuss your marketing goals and create a strategy that drives real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-[#C30010] hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold"
              >
                Start Your Campaign
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#C30010] px-8 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
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

export default DigitalMarketing; 
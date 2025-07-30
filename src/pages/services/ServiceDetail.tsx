import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Globe, Code, Smartphone, Database, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import webDevLocations from "../../data/Static-locations.json";
import { useEffect, useState } from "react";
import { getServiceById } from "../../services/fetchServices";
import { useParams } from "react-router-dom";


const ServiceDetail  = () => {
  const [locations, setLocations] = useState([]);
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    setLocations(webDevLocations);

    // Fetch service data by ID (you'll need to specify the correct ID for Web Development)
    const loadServiceData = async () => {
      try {
        setLoading(true);
        console.log("🔍 Starting to fetch service data for slug:",{slug});
        if (!slug) return;

        const data = await getServiceById(slug);
        console.log("📦 Received service data:", data);
        setServiceData(data);
      } catch (error) {
        console.error("❌ Error loading service data:", error);
      } finally {
        setLoading(false);
        console.log("✅ Loading finished");
      }
    };

    loadServiceData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C30010] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service information...</p>
        </div>
      </div>
    );
  }

  // Debug section - remove this after fixing
  console.log("🔍 Current serviceData:", serviceData);
  console.log("🔍 Service name:", serviceData?.name);
  console.log("🔍 Service headline:", serviceData?.headline);

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
          
          <div className="text-center mb-6">
          <div className="inline-block bg-[#C30010] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
             {serviceData?.name || "  "}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
               {serviceData?.headline || ""}
            </h1>
            <p className="text-xl text-gray-700 max-w-6xl mx-auto">
              {serviceData?.headline_desc ||"" }
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-1">
        <div className="max-w-full mx-auto px-4">
          <div className="bg-white/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="aspect-video bg-gradient-to-br from-[#d35c66] to-[#a5646a] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Play className="h-8 w-8 ml-1" />
                  </div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{serviceData?.headline1 || "Why Choose Our Web Development?"}</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {serviceData?.headline1_desc || "Our web development services combine cutting-edge technology with proven methodologies to deliver websites and web applications that not only look stunning but also perform exceptionally well. We focus on creating user-centered experiences that drive engagement and achieve your business goals."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{serviceData?.headline1 || "Custom Solutions"}</h3>
              <p className="text-gray-700 leading-relaxed">
                {serviceData?.headline1_desc || "Every project is unique, and we believe in creating custom solutions tailored to your specific needs. From simple landing pages to complex web applications, we build solutions that scale with your business."}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{serviceData?.headline2 || "Modern Technologies"}</h3>
              <p className="text-gray-700 leading-relaxed">
                {serviceData?.headline2_desc || "We use the latest technologies and frameworks including React, Vue.js, Node.js, and more to ensure your website is fast, secure, and future-proof. Our development process follows industry best practices."}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 10 Pictures Section */}
      <section className="py-20 bg-white">
     <h1 className="text-lg font-extrabold-bold text-center">Service Images</h1>
      </section>

    
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#C30010] to-[#D40011]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Your Next Campaign?
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
                className="border-white text-[#C30010] bg-white hover:bg-[#C30010] hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
              >
                View All Services
              <ArrowRight> </ArrowRight>

              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail ;
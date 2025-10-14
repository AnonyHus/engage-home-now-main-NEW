import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Globe, Code, Smartphone, Database, Shield, Zap, ArrowRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getServiceById } from "../../services/fetchServices";
import { useParams } from "react-router-dom";
import fetchImagesByService from "../../services/fetchImagesByService";
import LoadingComp from "../../components/Loading"
import Breadcrumb from "../../components/Breadcrumb";

const ServiceDetail  = () => {
  const [serviceData, setServiceData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const [Images, setImages] = useState([]);

  

  useEffect(() => {
  
    const loadAllData = async () => {
      try {
        setLoading(true);
  
        if (!slug) return;
    
        // 1. Get service data (including id)
        const serviceData = await getServiceById(slug);
        if (serviceData) {
          setServiceData(serviceData);
        } else {
          setServiceData(null);
        } 
  
        console.log("✅ Service ID: ", serviceData?.id);

        // 2. Then fetch images using service ID
        if (serviceData?.id) {
          const Images = await fetchImagesByService(serviceData.id);
          console.log("✅ Images fetched: ", Images);

          setImages(Images);
        }
  
      } catch (error) {
        console.error("❌ Error loading data:", error);
        setServiceData(null);
      } finally {
        setLoading(false);
        console.log("✅ Loading finished");
      }
    };
  
    loadAllData();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C30010] mx-auto mb-4"></div>
         <LoadingComp/>
        </div>
      </div>
    );
  }

  // Debug section - remove this after fixing
  console.log("🔍 Current serviceData:", serviceData);
  console.log("🔍 Service name:", serviceData?.name);
  console.log("🔍 Service headline:", serviceData?.headline);

  if (!serviceData) return <Navigate to="/notfound" replace />;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-0 mt-0 bg-white">      
        <Breadcrumb 
        items={[
          { label: "Home", to: "/" },
          { label: "Services", to:"/services" }, 
          { label: serviceData?.name  }, 
        ]}
      />
          
          <div className="text-center mb-2">
          <div className="inline-block bg-[#C30010] text-white px-4 py-2 rounded-full text-sm font-medium ">
             {serviceData?.name || "  "}
            </div>
            <h1 className="pt-5 text-5xl md:text-6xl sm:text-md font-bold text-gray-900 mb-1">
               {serviceData?.headline || ""}
            </h1>
          </div>
      </section>


      {/* Video Section */}
      {serviceData?.video_url?.trim() && ( 
      <section className="py-1">
        <div className="max-w-full mx-auto px-4">
          <div className="bg-white/50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <video   className="w-full"
                  autoPlay
                  muted
                  loop
                  playsInline 
                  >
                    <source src={serviceData.video_url}  type="video/mp4" /> 
                    Your browser does not support the video tag.
                    </video> 
            </div>
        </div>
      </section>
     )}

      {/* Description Section */}
      <section className="py-16 bg-white">

      <div className="w-full px-10 text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Service Descreption</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-full px-10">
              {serviceData?.headline_desc || "" }
               </p>
          </div>


        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-3xl font-bold text-gray-900 mb-4 text-center">{serviceData?.headline1 || "Custom Solutions"}</h4>
              <p className="text-gray-700 leading-relaxed">
                {serviceData?.headline1_desc || "Every project is unique, and we believe in creating custom solutions tailored to your specific needs. From simple landing pages to complex web applications, we build solutions that scale with your business."}
              </p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-gray-900 mb-4 text-center">{serviceData?.headline2 || "Modern Technologies"}</h4>
              <p className="text-gray-700 leading-relaxed ">
                {serviceData?.headline2_desc || "We use the latest technologies and frameworks including React, Vue.js, Node.js, and more to ensure your website is fast, secure, and future-proof. Our development process follows industry best practices."}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 10 Pictures Section */}
      {Images?.length > 0 && Images.some(img => img?.image_url?.trim()) && (
      <section className="py-20 items-center justify-center">
        <div className="space-y-0 px-4">
      {Images.map((img, index) => (
        <img className="w-full max-w-full mx-auto rounded shadow-md" key={index} 
        src={img.image_url} 
        alt={`Service Image ${index + 1}`} />
      ))}
      </div>
      </section>
      )}

    
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
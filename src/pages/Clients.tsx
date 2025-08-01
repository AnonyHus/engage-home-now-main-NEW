import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactSection from "../components/ContactSection";
import '../styles/globals.css';

const Clients = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Icon */}
      <section className="relative pt-10 mt-20 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F5] to-[#FDF6F6]">
        {/* Abstract SVG or Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full opacity-30">
            <path fill="#C30010" fillOpacity="0.07" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-5 py-2 mb-7 shadow-md animate-bounce">
              <Sparkles className="h-5 w-5 text-[#C30010] drop-shadow" />
              <span className="text-base font-semibold text-[#C30010] tracking-wide">Our Clients</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-7 leading-tight drop-shadow-lg">
              Our Clients
            </h1>
            <p className="text-2xl text-gray-800 max-w-full mx-auto leading-relaxed font-medium">
              We've had the privilege of working with amazing clients across various industries, helping them achieve their digital goals and drive business growth.
            </p>
          </div>
        </div>
      </section>
      {/* Modern Intro Text */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-full mx-auto mb-16"
          >
            <div className=" inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/20 rounded-full px-6 py-3 mb-6">
              <span className="text-sm font-semibold text-[#C30010] tracking-wide">Our Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl  text-gray-600 leading-relaxed">
              We've partnered with innovative companies across industries, delivering exceptional results that drive growth and success.
            </p>
          </motion.div>

          {/* Modern Clients Grid */}
          <div className="w-full max-w-none px-0 mb-16">
            <img src="/Our-Clients-1.png" alt="Client 1" className="w-full h-auto" />
            <img src="/Our-Clients-2.png" alt="Client 2" className="w-full h-auto" />
            <img src="/Our-Clients-3.png" alt="Client 3" className="w-full h-auto" />
            <img src="/Our-Clients-5.png" alt="Client 4" className="w-full h-auto" />
          </div>

          {/* Modern Bold Text After Images */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-r from-[#C30010]/5 to-[#D40011]/5 border border-[#C30010]/10 rounded-3xl p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium mb-8">
                Let's create something extraordinary together. Our team is ready to transform your vision into reality with cutting-edge solutions and proven results.
              </p>
              <Button 
              onClick={() => setShowContact(true)}
                size="lg" 
                className="bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
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

            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Clients; 
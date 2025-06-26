import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const Clients = () => {
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-5 py-2 mb-7 shadow-md animate-pulse">
              <Sparkles className="h-5 w-5 text-[#C30010] drop-shadow" />
              <span className="text-base font-semibold text-[#C30010] tracking-wide">Our Clients</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-7 leading-tight drop-shadow-lg">
              Our Clients
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              We've had the privilege of working with amazing clients across various industries. Our partnerships have helped us grow and deliver exceptional results while building lasting relationships based on trust, innovation, and mutual success.
            </p>
          </div>
        </div>
      </section>
      {/* Clients Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="w-full">
            <div className="grid grid-cols-1 gap-10 max-w-4xl mx-auto">
              {/* Client Cards with Animation */}
              {[{
                name: "TechCorp",
                subtitle: "Technology Solutions",
                gradient: "from-[#C30010] to-[#D40011]"
              }, {
                name: "EcoLife",
                subtitle: "Sustainable Living",
                gradient: "from-[#D40011] to-[#E50012]"
              }, {
                name: "FinFlow",
                subtitle: "Financial Services",
                gradient: "from-[#E50012] to-[#F60013]"
              }].map((client, idx) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-2 border border-gray-200 bg-white rounded-2xl">
                    <CardContent className="p-0">
                      <div className={`aspect-[4/3] bg-gradient-to-br ${client.gradient} flex items-center justify-center rounded-t-2xl`}>
                        <div className="text-center text-white drop-shadow-lg">
                          <div className="text-5xl font-bold mb-3">{client.name}</div>
                          <div className="text-lg opacity-90">{client.subtitle}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Each client represents a unique challenge and opportunity for us to demonstrate our expertise and commitment to excellence. We're proud of the work we've done together and excited about future collaborations.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Clients; 
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const Clients = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header with Icon */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C30010]/20 via-black to-[#A1000E]/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#D40011]/10 to-[#E50012]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/20 to-[#D40011]/20 border border-[#C30010]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#C30010]" />
              <span className="text-sm font-medium text-[#C30010]">Our Clients</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-8 leading-tight">
              Our Clients
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We've had the privilege of working with amazing clients across various industries. 
              Our partnerships have helped us grow and deliver exceptional results while building 
              lasting relationships based on trust, innovation, and mutual success.
            </p>
          </div>
        </div>
      </section>

      {/* Clients Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* 3 Pictures Grid - Full Width */}
          <div className="w-full">
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {/* Client 1 - Top */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 bg-gray-900/50">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#C30010] to-[#D40011] flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl font-bold mb-3">TechCorp</div>
                      <div className="text-lg opacity-90">Technology Solutions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client 2 - Middle */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 bg-gray-900/50">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#D40011] to-[#E50012] flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl font-bold mb-3">EcoLife</div>
                      <div className="text-lg opacity-90">Sustainable Living</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client 3 - Bottom */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 bg-gray-900/50">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#E50012] to-[#F60013] flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-5xl font-bold mb-3">FinFlow</div>
                      <div className="text-lg opacity-90">Financial Services</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Each client represents a unique challenge and opportunity for us to demonstrate 
              our expertise and commitment to excellence. We're proud of the work we've done 
              together and excited about future collaborations.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Clients; 
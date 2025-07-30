import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Award, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Icon */}
      <section className="relative py-10 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F5] to-[#FDF6F6]">
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
              <span className="text-base font-semibold text-[#C30010] tracking-wide">About Us</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-7 leading-tight drop-shadow-lg">
              About Us
            </h1>
            {/* Who We Are Section  */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-stretch justify-center w-full max-w-[1600px] mx-auto bg-transparent rounded-2xl overflow-hidden my-8"
            >
              {/* Image Side */}
              <div className="w-full lg:w-2/5 flex justify-center items-stretch p-0">
                <img
                  src="\AboutUs\Who-We-are-rebg.png"
                  alt="Opz Team"
                  className="w-full h-full object-cover object-center rounded-xl lg:rounded-l-2xl lg:rounded-r-none border-0 shadow-none"
                />
              </div>
              {/* Text Side */}
              <div className="flex-1 p-8 flex flex-col justify-center bg-transparent">
                <span className="inline-block bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 text-[#C30010] font-semibold px-4 py-2 rounded-full text-sm tracking-wider border border-[#C30010]/20 mb-4">
                  Since 2018
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Building Brands, Creating Impact
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700 text-base leading-relaxed">
                    Since 2018, Opz has proven its solid position in the market, led by our CEO and Marketing Team. Hard work and proven results are what helped Opz craft its way through the advertising and marketing world, creating a loyal and steady clients' platform.
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Opz specializes in outdoor advertising and activation (road shows, events and production & media buying TV Ad & Radio Ad strategic planning, Marketing strategy).
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Our company continues to grow and expand successfully, providing clients throughout Egypt with quality service. We've continued to think unconventionally about advertising to unlock the potential of our clients' brands.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-[#C30010]/5 to-[#D40011]/5 border-l-4 border-[#C30010] rounded-lg text-gray-700 text-sm">
                  <strong>Founded in 2014:</strong> By a team with 20+ years of experience in the media & advertising field. Our team has a variety of media experience, and each member comes from a different background.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0 }}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our mission is to based on garnering the most credibility and value of any marketing agency by 2024. We aim to establish valuable long-lasting relationships  within the market so as to be able to create inspired content and  hand  client’s work in a way that best suits their needs
              </p>
         
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gradient-to-br from-[#C30010] to-[#D40011] rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg opacity-90 leading-relaxed">
              Our vision is to incorporate well-established ideas with the products/services of our clientele and take them to the cybertronic for  marketing world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <p className="text-lg opacity-90 leading-relaxed">
          We value creative inspiration, innovation and viga-lance as these are the 3 key pillars in our work ethic overall. Our team thrives in high intensity situations and we do our absolute best to equal the value present in the work our clients do, with the value present  in the work we present to maintain (or gain) a level of credibility and respect needed.
          </p>
        </div>
      </section>
    
      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[{
              value: "500+",
              label: "Projects Completed"
            }, {
              value: "150+",
              label: "Happy Clients"
            }, {
              value: "4+",
              label: "Years Experience"
            }, {
              value: "24/7",
              label: "Support Available"
            }].map((stat, idx) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="text-gray-900">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs; 
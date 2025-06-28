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
              className="mb-8 group text-gray-700 hover:text-[#C30010]"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-5 py-2 mb-7 shadow-md animate-pulse">
              <Sparkles className="h-5 w-5 text-[#C30010] drop-shadow" />
              <span className="text-base font-semibold text-[#C30010] tracking-wide">About Us</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-7 leading-tight drop-shadow-lg">
              About Us
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              We are passionate about creating exceptional digital experiences that drive growth and innovation.
            </p>
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
                To empower businesses with cutting-edge digital solutions that transform their online presence and drive measurable results. We believe in creating meaningful connections between brands and their audiences through innovative technology and exceptional design.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team combines creativity with technical expertise to deliver solutions that not only meet today's needs but anticipate tomorrow's challenges.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gradient-to-br from-[#C30010] to-[#D40011] rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                To be the leading force in digital transformation, helping businesses thrive in the ever-evolving digital landscape while maintaining the highest standards of quality and innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
              icon: Heart,
              color: "bg-[#C30010]/20",
              iconColor: "text-[#C30010]",
              title: "Passion",
              desc: "We're passionate about what we do and it shows in every project we deliver."
            }, {
              icon: Target,
              color: "bg-[#D40011]/20",
              iconColor: "text-[#D40011]",
              title: "Excellence",
              desc: "We strive for excellence in every detail, from concept to final delivery."
            }, {
              icon: Users,
              color: "bg-[#E50012]/20",
              iconColor: "text-[#E50012]",
              title: "Collaboration",
              desc: "We believe in the power of teamwork and close collaboration with our clients."
            }, {
              icon: Award,
              color: "bg-[#F60013]/20",
              iconColor: "text-[#F60013]",
              title: "Innovation",
              desc: "We constantly explore new technologies and creative solutions."
            }].map((val, idx) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: idx * 0.08 }}>
                <Card className="text-center p-8 hover:shadow-2xl transition-shadow border border-gray-200 bg-white rounded-2xl">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${val.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <val.icon className={`h-8 w-8 ${val.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                    <p className="text-gray-700">{val.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              name: "Sarah Chen",
              role: "Creative Director",
              gradient: "from-[#C30010] to-[#D40011]"
            }, {
              name: "Mike Johnson",
              role: "Lead Developer",
              gradient: "from-[#D40011] to-[#E50012]"
            }, {
              name: "Emma Davis",
              role: "UX Designer",
              gradient: "from-[#E50012] to-[#F60013]"
            }].map((member, idx) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow border border-gray-200 bg-white rounded-2xl">
                  <CardContent className="p-0">
                    <div className={`aspect-square bg-gradient-to-br ${member.gradient} flex items-center justify-center rounded-t-2xl`}>
                      <div className="text-center text-white drop-shadow-lg">
                        <div className="text-3xl font-bold mb-2">{member.name}</div>
                        <div className="text-sm opacity-90">{member.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              value: "50+",
              label: "Happy Clients"
            }, {
              value: "5+",
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
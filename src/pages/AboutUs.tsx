import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Award, Heart, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

const AboutUs = () => {
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
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-8 group text-gray-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/20 to-[#D40011]/20 border border-[#C30010]/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#C30010]" />
              <span className="text-sm font-medium text-[#C30010]">About Us</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-8 leading-tight">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We are passionate about creating exceptional digital experiences that drive growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                To empower businesses with cutting-edge digital solutions that transform their online presence 
                and drive measurable results. We believe in creating meaningful connections between brands 
                and their audiences through innovative technology and exceptional design.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team combines creativity with technical expertise to deliver solutions that not only 
                meet today's needs but anticipate tomorrow's challenges.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#C30010] to-[#D40011] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                To be the leading force in digital transformation, helping businesses thrive in the 
                ever-evolving digital landscape while maintaining the highest standards of quality 
                and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-800 bg-gray-800/50">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#C30010]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-[#C30010]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Passion</h3>
                <p className="text-gray-300">We're passionate about what we do and it shows in every project we deliver.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-800 bg-gray-800/50">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#D40011]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-[#D40011]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
                <p className="text-gray-300">We strive for excellence in every detail, from concept to final delivery.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-800 bg-gray-800/50">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#E50012]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#E50012]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Collaboration</h3>
                <p className="text-gray-300">We believe in the power of teamwork and close collaboration with our clients.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border border-gray-800 bg-gray-800/50">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#F60013]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#F60013]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                <p className="text-gray-300">We constantly explore new technologies and creative solutions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-800 bg-gray-900/50">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-[#C30010] to-[#D40011] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-2">Sarah Chen</div>
                    <div className="text-sm opacity-90">Creative Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-800 bg-gray-900/50">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-[#D40011] to-[#E50012] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-2">Mike Johnson</div>
                    <div className="text-sm opacity-90">Lead Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-800 bg-gray-900/50">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-[#E50012] to-[#F60013] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-2">Emma Davis</div>
                    <div className="text-sm opacity-90">UX Designer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-[#C30010] to-[#D40011]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-red-100">Projects Completed</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-red-100">Happy Clients</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-red-100">Years Experience</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs; 
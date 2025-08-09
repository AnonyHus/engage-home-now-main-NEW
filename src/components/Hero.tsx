import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Animated background elements */}
          <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/HOME-PAGE-FINAL.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <Button 
          size="lg" 
          className="bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-fade-in delay-400"
        >
          Get Started Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
  </div>
      {/* Content */}
      {/*  
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#C30010] to-[#D40011] bg-clip-text text-transparent mb-6 animate-fade-in">
          Transform Your
          <br />
          Digital Future
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
          We create exceptional digital experiences that drive growth and engage your audience with cutting-edge solutions.
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-fade-in delay-400"
        >
          Get Started Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      */}
    </section>
  );
};

export default Hero;

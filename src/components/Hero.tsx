import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated background elements */}
          <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/Home-Page-opzoptimize-agency.mp4" type="video/mp4" />
          <source src="/path/to/video.webm" type="video/webm" />
          <source src="/videos/Home-Page-opzoptimize-agency.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-[#C30010] px-4 text-center">
    <h1 className="text-3xl sm:text-5xl font-bold">Transform Your
          <br />
          Digital Future
          </h1>
    <p className="text-base text-white sm:text-xl my-4  animate-fade-in ">  We create exceptional digital experiences that drive growth and engage your audience with cutting-edge solutions.
    </p>
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

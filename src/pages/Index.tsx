import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import Gallery from "@/components/Gallery";
import MetricsPanel from "@/components/MetricsPanel";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogoCarousel />
      <ServicesGrid />
      <Gallery />
      <MetricsPanel />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

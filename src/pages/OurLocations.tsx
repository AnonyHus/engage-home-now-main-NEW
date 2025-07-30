import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Monitor, Smartphone, Tv, Building2, ArrowRightToLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import locationsData from "../data/our-locations.json";
import Footer from "@/components/Footer";


export default function OurLocations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(locationsData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Link to="/services/digital-marketing">
              <Button variant="ghost" className="mb-6 text-white hover:text-primary-foreground bg-white/10 hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Digital Marketing
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              Digital Screens Network
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Screens Locations
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover our global network of digital screens and billboards strategically positioned in high-traffic locations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Digital Screens</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Cities Worldwide</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">2M+</div>
              <div className="text-sm text-muted-foreground">Daily Impressions</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Live Broadcasting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Screens Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Global Screens Network</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From iconic billboards to interactive kiosks, our digital screens are strategically placed in high-traffic locations to maximize your brand's visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {locations.map((loc, idx) => (
    <Card
      key={idx}
      className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative">
        <img
          src={loc.photo}
          alt={loc.location}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          {loc.type}
        </div>
      </div>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">{loc.location}</h3>
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            <strong>Size:</strong> {loc.size}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            <strong>Pixel:</strong> {loc.pixel}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            <strong>Duration:</strong> {loc.duration}
          </span>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Advertise on Our Screens?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Reach millions of potential customers through our strategically placed digital screens and billboards worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold"
              >
                Book Your Screen Space
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
              >
                View All Services
                <ArrowRightToLine></ArrowRightToLine>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </div>
    
  );
} 
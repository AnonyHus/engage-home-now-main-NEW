import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Monitor, Smartphone, Tv, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const OurLocations = () => {
  const screens = [
    {
      id: 1,
      name: "Times Square Digital Billboard",
      location: "Times Square, Manhattan, NY",
      street: "Broadway & 7th Avenue",
      type: "Large LED Display",
      description: "Massive 4K digital billboard in the heart of Times Square, reaching millions of daily commuters and tourists.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      specs: "50ft x 30ft, 4K Resolution"
    },
    {
      id: 2,
      name: "Silicon Valley Tech Hub Screen",
      location: "Palo Alto, CA",
      street: "University Avenue & High Street",
      type: "Interactive Touch Screen",
      description: "Interactive digital kiosk serving the tech community with real-time updates and local business information.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      specs: "8ft x 5ft, Touch Enabled"
    },
    {
      id: 3,
      name: "London Underground Digital Network",
      location: "London, UK",
      street: "Oxford Circus Station",
      type: "Subway Display Network",
      description: "Network of digital screens throughout the London Underground, providing real-time updates and advertising.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      specs: "Multiple 4K Screens"
    },
    {
      id: 4,
      name: "Toronto Financial District LED",
      location: "Toronto, ON",
      street: "Bay Street & King Street",
      type: "Financial District Display",
      description: "High-resolution LED display in Toronto's financial district, targeting business professionals and commuters.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      specs: "40ft x 25ft, HD+ Resolution"
    },
    {
      id: 5,
      name: "Sydney Harbour Bridge Screen",
      location: "Sydney, NSW",
      street: "Harbour Bridge Approach",
      type: "Iconic Landmark Display",
      description: "Spectacular digital screen integrated into the Sydney Harbour Bridge, visible from across the harbor.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      specs: "60ft x 35ft, Ultra HD"
    },
    {
      id: 6,
      name: "Berlin Startup District Kiosk",
      location: "Berlin, Germany",
      street: "Kreuzberg District",
      type: "Startup Community Screen",
      description: "Community-focused digital kiosk in Berlin's vibrant startup district, connecting local entrepreneurs.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      specs: "6ft x 4ft, Interactive"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'large led display':
      case 'billboard':
        return <Building2 className="h-5 w-5" />;
      case 'interactive touch screen':
      case 'kiosk':
        return <Monitor className="h-5 w-5" />;
      case 'subway display network':
      case 'network':
        return <Tv className="h-5 w-5" />;
      default:
        return <Smartphone className="h-5 w-5" />;
    }
  };

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
            {screens.map((screen) => (
              <Card 
                key={screen.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card shadow-lg hover:shadow-primary/20"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={screen.image} 
                      alt={screen.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{screen.name}</h3>
                      <p className="text-white/90 text-sm">{screen.type}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{screen.location}</p>
                        <p className="text-xs text-muted-foreground">{screen.street}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {getTypeIcon(screen.type)}
                      </div>
                      <p className="text-sm text-muted-foreground">{screen.type}</p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {screen.description}
                    </p>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-medium text-primary">{screen.specs}</p>
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group-hover:shadow-lg"
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      View Screen Details
                    </Button>
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
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurLocations; 

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { Link, useLocation, useParams,useNavigate } from "react-router-dom";
import { act, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { supabase } from "@/services/supabaseClient";
import Breadcrumb from "@/components/Breadcrumb";

interface OutdoorLocation {
  id: number;
  img_url: string;
  location: string;
  size: string;
  duration?: string;
  pixel?: string; 
  type: string;
  outdoor_slug: "static" | "screen";
  img_order: number;
}

type TabType = "static" | "screen";

export default function OurLocations() {
  const { type } = useParams(); // static or screen

  const locationHook = useLocation();
const pathTab = locationHook.pathname.split("/").pop() as TabType;
const defaultTab = pathTab || "static";

  
  const [locations, setLocations] = useState<OutdoorLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const navigate = useNavigate();


  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("outdoor_locations")
        .select("*")
        .eq("outdoor_slug", activeTab) // Only fetch the category we want
        .order("img_order", { ascending: true });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error loading locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refetch if tab changes
  useEffect(() => {
    fetchLocations();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-full mx-auto px-4">
        <div className="mt-0">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                {
                  label: "Outdoor Advertising",
                  to: "/services/outdoor-advertising",
                },
                { label: activeTab },
              ]}
            />
          </div>
          <div className="text-center mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              {activeTab === "screen" ? "Digital Screens Network" : "Static Billboards Network"}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {activeTab === "screen" ? "Our Screens Locations" : "Our Static Locations"}
            </h1>
            <p className="text-xl text-white/90 max-w-fit mx-auto">
              {activeTab === "screen"
                ? "Discover our global network of digital screens and billboards strategically positioned in high-traffic locations worldwide."
                : "Explore our premium static billboards located in prime spots for maximum exposure."}
            </p>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center gap-4">
        <Button
          variant={activeTab === "static" ? "default" : "outline"}
          onClick={() => {
          setActiveTab("static")
          navigate("/our-locations/static");
        }
        }
        >
          Static Locations
        </Button>
        <Button
          variant={activeTab === "screen" ? "default" : "outline"}
          onClick={() => {
            setActiveTab("screen")
            navigate("/our-locations/screen");
          }
          }
        >
          Screen Locations
        </Button>
      </div>

      {/* Screens Grid */}
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center text-lg text-muted-foreground">Loading locations...</div>
          ) : locations.length === 0 ? (
            <div className="text-center text-lg text-muted-foreground">No locations found.</div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  {activeTab === "screen" ? "Global Screens Network" : "Global Static Billboard Network"}
                </h2>
                <p className="text-xl text-muted-foreground max-w-fit mx-auto">
                  {activeTab === "screen"
                    ? "From iconic billboards to interactive kiosks, our digital screens are strategically placed in high-traffic locations."
                    : "Our static billboards are strategically placed to ensure maximum visibility and lasting impact."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((loc) => (
                  <Card
                    key={loc.id}
                    className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="relative">
                      <img
                        src={loc.img_url}
                        alt={loc.location}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                        {loc.type}
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <h3 className="text-2xl font-bold text-primary mb-2">{loc.location}</h3>
                      
                      <div className="flex flex-wrap gap-2 justify-center mb-3">
                        {loc.size && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            <strong>Size:</strong> {loc.size}
                          </span>
                        )}
                        {activeTab === "screen" && loc.pixel && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            <strong>Pixel:</strong> {loc.pixel}
                          </span>
                        )}
                        
                        {loc.duration && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            <strong>Duration:</strong> {loc.duration}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            {activeTab === "screen"
              ? "Ready to Advertise on Our Screens?"
              : "Ready to Advertise on Our Billboards?"}
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Reach millions of potential customers through our strategically placed {activeTab === "screen" ? "digital screens" : "static billboards"} worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold"
              >
                Book Your {activeTab === "screen" ? "Screen" : "Billboard"} Space
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 font-semibold"
              >
                View All Services
                <ArrowRightToLine />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

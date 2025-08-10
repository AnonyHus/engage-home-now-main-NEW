import { useEffect, useState } from "react";
import { fetchServices } from "../services/fetchServices";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

const ServicesGrid = () => {

 
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetchServices().then((data) => {
      const filtered = Array.isArray(data)  
      ? data.filter(s => s.show_home_page)
      : [];
      setServices(filtered);
    });
  }, []);

  return (
    <section className="py-10 bg-background">
      <div className="max-w-100% mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive Advertise solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.id} to={`/services/${service.slug}`}>
            <Card 
              key={index} 
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-card hover:bg-accent hover:shadow-primary/20"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="h-8 w-8 text-[#FF0014] flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M7 5v-2h10v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M7 19v2h10v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 9h8v6H8z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.Home_Desc}
                </p>
              </CardContent>
            </Card>
            </Link>))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

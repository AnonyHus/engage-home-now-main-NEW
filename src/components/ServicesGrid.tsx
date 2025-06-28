import { 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ServicesGrid = () => {
  const services = [
    {
      icon: <ArrowUp className="h-8 w-8 text-[#C30010]" />,
      title: "Web Development",
      description: "Custom websites built with modern technologies and best practices."
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-[#D40011]" />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android."
    },
    {
      icon: <ArrowDown className="h-8 w-8 text-[#E50012]" />,
      title: "UI/UX Design",
      description: "Beautiful, user-centered designs that convert and engage."
    },
    {
      icon: <ArrowLeft className="h-8 w-8 text-[#F60013]" />,
      title: "E-commerce",
      description: "Scalable online stores with seamless shopping experiences."
    },
    {
      icon: <ArrowUp className="h-8 w-8 text-[#FF0014]" />,
      title: "Cloud Solutions",
      description: "Secure and scalable cloud infrastructure for your business."
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-[#B2000F]" />,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that drive real results."
    },
    {
      icon: <ArrowDown className="h-8 w-8 text-[#A1000E]" />,
      title: "Analytics",
      description: "Deep insights into your business performance and user behavior."
    },
    {
      icon: <ArrowLeft className="h-8 w-8 text-[#90000D]" />,
      title: "Consulting",
      description: "Strategic guidance to help your business grow and succeed."
    },
    {
      icon: <ArrowUp className="h-8 w-8 text-[#7F000C]" />,
      title: "Support",
      description: "24/7 technical support and maintenance for peace of mind."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-card hover:bg-accent hover:shadow-primary/20"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

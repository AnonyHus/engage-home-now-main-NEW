
import { useEffect, useState, useRef } from "react";

const MetricsPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    years: 0
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const finalCounts = {
    projects: 500,
    clients: 150,
    years:4
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCounting();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startCounting = () => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      setCounts({
        projects: Math.floor(finalCounts.projects * progress),
        clients: Math.floor(finalCounts.clients * progress),
        years: Math.floor(finalCounts.years * progress)  
          });

      if (progress < 1) {

        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const metrics = [
    {
      number: counts.projects,
      suffix: "+",
      label: "Projects Delivered",
      description: "Successfully completed projects"
    },
    {
      number: counts.clients,
      suffix: "+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide"
    },
    {
      number: counts.years,
      suffix: "+",
      label: "Years Experience",
      description: "In the digital industry"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-gradient-to-r from-[#ffb88e] to-[#ea5753] bg-opacity-50 py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="text-center text-white transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">
                <span className="text-5xl md:text-6xl font-bold">
                  {metric.number.toLocaleString()}
                </span>
                <span className="text-3xl font-bold">
                  {metric.suffix}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {metric.label}
              </h3>
              <p className="text-blue-100 opacity-90">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsPanel;

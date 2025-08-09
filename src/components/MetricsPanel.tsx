
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
    <section ref={sectionRef} className="bg-gradient-to-r from-[#ffb88e] to-[#ea5753] bg-opacity-50 py-12">
  <div className="max-w-7xl mx-auto px-2">
    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="text-center text-white transform hover:scale-105 transition-transform duration-300 px-1"
        >
          <div className="mb-2 sm:mb-3">
            <span className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ">
              {metric.number.toLocaleString()}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              {metric.suffix}
            </span>
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">
            {metric.label}
          </h3>

        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default MetricsPanel;

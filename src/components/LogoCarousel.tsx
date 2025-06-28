const LogoCarousel = () => {
  const logos = [
    "Google", "Microsoft", "Apple", "Amazon", "Netflix", 
    "Spotify", "Adobe", "Tesla", "Meta", "Salesforce"
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-gray-700 text-lg mb-12 font-medium">
          Trusted by leading brands worldwide
        </h2>
        
        {/* Infinite scroll container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll hover:pause-animation">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-300">
                  {logo}
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center">
                <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-300">
                  {logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;

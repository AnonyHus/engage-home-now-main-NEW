const LogoCarousel = () => {
  const logos = [
    { src: "/Homelogos/bahya.png", alt: "Bahya" },
    { src: "/Homelogos/dice.png", alt: "Dice" },
    { src: "/Homelogos/indrive.png", alt: "Indrive" },
    { src: "/Homelogos/manaj.png", alt: "Manaj" },
    { src: "/Homelogos/max.png", alt: "MAX" },
    { src: "/Homelogos/nbe.png", alt: "NBE" },
    { src: "/Homelogos/schwarz.png", alt: "Schwarz" },
    { src: "/Homelogos/skoda.png", alt: "Skoda" },
    { src: "/Homelogos/tajmisr.png", alt: "TajMisr" }
  ];

  return (
    <section className="py-10 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center pb-10">
                  Trusted by leading brands worldwide
        </h2>
        </div>
        
        {/* Infinite scroll container */}
        <div className="relative overflow-hidden w-full">
          <div
            className="flex animate-scroll"
            style={{ width: 'max-content' }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-4 flex items-center justify-center">
                <div className="w-40 h-24 bg-gray-100 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <img src={logo.src} alt={logo.alt} className="h-20 object-contain" />
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};


export default LogoCarousel;

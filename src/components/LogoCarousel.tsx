const LogoCarousel = () => {
  const logos = [
    { src: "public/homelogos/bahya.png", alt: "Bahya" },
    { src: "public/homelogos/dice.png", alt: "Dice" },
    { src: "public/homelogos/indrive.png", alt: "Indrive" },
    { src: "public/homelogos/manaj.png", alt: "Manaj" },
    { src: "public/homelogos/max.png", alt: "MAX" },
    { src: "public/homelogos/nbe.png", alt: "NBE" },
    { src: "public/homelogos/schwarz.png", alt: "Schwarz" },
    { src: "public/homelogos/skoda.png", alt: "Skoda" },
    { src: "public/homelogos/tajmisr.png", alt: "TajMisr" }
  ];

  return (
    <section className="py-10 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-gray-700 text-lg mb-12 font-medium">
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

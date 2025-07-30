import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      alt: "Woman working on laptop"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      alt: "Gray laptop computer"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      alt: "Circuit board technology"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      alt: "Java programming monitor"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      alt: "Person using MacBook Pro"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      alt: "Woman using laptop computer"
    }
  ];

  const handleImageClick = () => {
    window.location.href = '/services';
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-100% mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Work Gallery
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore our portfolio of successful projects and creative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {images.map((image) => (
            <div 
              key={image.id}
              onClick={handleImageClick}
              className="group cursor-pointer overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <AspectRatio ratio={4/3}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <p className="text-sm font-medium">View Services →</p>
                  </div>
                </div>
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

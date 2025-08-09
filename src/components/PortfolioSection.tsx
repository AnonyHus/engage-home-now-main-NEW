import React from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  description?: string;
  image: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  return (
    <div className="group rounded-lg overflow-hidden relative h-72 md:h-80 bg-gray-100 shadow-md hover:shadow-xl transition-shadow">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-2xl font-medium mb-1 group-hover:text-furniture-accent transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-white text-sm opacity-90">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;

import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.isPopular && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
          <p className="font-bold text-amber-600">${item.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
            {item.category}
          </span>
          <button className="p-2 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
            <ShoppingBasket className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
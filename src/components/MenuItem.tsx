import React from 'react';
import { Eye } from 'lucide-react';
import { MenuItemType } from '../types';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './Cart/AddToCartButton';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/menu/item/${item.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-48 cursor-pointer" onClick={handleViewDetails}>
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.isPopular && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">
            ⭐ Popular
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-amber-900 cursor-pointer hover:text-amber-700 transition-colors" onClick={handleViewDetails}>
            {item.name}
          </h3>
          <span className="font-bold text-amber-600 text-lg">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
            {item.category}
          </span>
          
          <div className="flex gap-2">
            <button 
              onClick={handleViewDetails}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-all duration-200"
              title="Ver detalhes"
            >
              <Eye size={18} />
            </button>
            <AddToCartButton 
              item={item} 
              className="p-2 rounded-full font-bold transition-all duration-200 hover:scale-110"
              showText={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MenuItemType } from '../types';

interface QuickAddToCartProps {
  item: MenuItemType;
  className?: string;
}

const QuickAddToCart: React.FC<QuickAddToCartProps> = ({ item, className = '' }) => {
  const { addItem, updateQuantity, items } = useCart();
  const [localQuantity, setLocalQuantity] = useState(1);
  
  const itemInCart = items.find(cartItem => cartItem.id === item.id);
  const currentQuantity = itemInCart?.quantity || 0;

  const handleAddToCart = () => {
    for (let i = 0; i < localQuantity; i++) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category
      });
    }
    setLocalQuantity(1);
  };

  const handleUpdateCartQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  if (currentQuantity > 0) {
    // Item já está no carrinho - mostrar controles de edição
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-green-800 font-medium text-sm">No carrinho</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateCartQuantity(currentQuantity - 1)}
              className="w-8 h-8 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center justify-center"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-green-800 min-w-[24px] text-center">
              {currentQuantity}
            </span>
            <button
              onClick={() => handleUpdateCartQuantity(currentQuantity + 1)}
              className="w-8 h-8 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center justify-center"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Item não está no carrinho - mostrar opções de adição
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
            className="w-8 h-8 hover:bg-gray-100 transition-colors flex items-center justify-center"
            disabled={localQuantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="px-3 py-1 font-semibold min-w-[40px] text-center">
            {localQuantity}
          </span>
          <button
            onClick={() => setLocalQuantity(localQuantity + 1)}
            className="w-8 h-8 hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <Plus size={14} />
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <ShoppingCart size={16} />
          Adicionar
        </button>
      </div>
      
      <div className="mt-2 text-center">
        <span className="text-sm text-gray-600">
          Total: R$ {(item.price * localQuantity).toFixed(2).replace('.', ',')}
        </span>
      </div>
    </div>
  );
};

export default QuickAddToCart;
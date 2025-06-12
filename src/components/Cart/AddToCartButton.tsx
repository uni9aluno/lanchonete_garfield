import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MenuItemType } from '../../types';

interface AddToCartButtonProps {
  item: MenuItemType;
  quantity?: number;
  className?: string;
  showText?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  item, 
  quantity = 1, 
  className = '', 
  showText = true 
}) => {
  const { addItem, updateQuantity, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const itemInCart = items.find(cartItem => cartItem.id === item.id);
  const currentQuantity = itemInCart?.quantity || 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      // Simula um pequeno delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category
        });
      }
      
      // Mostra feedback de sucesso
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  // Se o item já está no carrinho e não é uma adição específica de quantidade
  if (currentQuantity > 0 && quantity === 1) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showText && (
          <span className="text-sm text-green-700 font-medium">
            {currentQuantity} no carrinho
          </span>
        )}
        <div className="flex items-center bg-green-50 border border-green-200 rounded-lg">
          <button
            onClick={() => handleUpdateQuantity(currentQuantity - 1)}
            className="p-2 text-green-700 hover:bg-green-100 transition-colors rounded-l-lg"
            disabled={currentQuantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-2 font-semibold text-green-800 min-w-[40px] text-center">
            {currentQuantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(currentQuantity + 1)}
            className="p-2 text-green-700 hover:bg-green-100 transition-colors rounded-r-lg"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Botão de adicionar ao carrinho
  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`
        inline-flex items-center justify-center gap-2 
        bg-amber-500 hover:bg-amber-600 active:bg-amber-700
        text-white font-semibold
        transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${showSuccess ? 'bg-green-500 hover:bg-green-500' : ''}
        ${showText ? 'px-4 py-2' : 'p-2'}
        ${className}
      `}
      title={showText ? undefined : 'Adicionar ao carrinho'}
    >
      {isAdding ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {showText && <span>Adicionando...</span>}
        </>
      ) : showSuccess ? (
        <>
          <Check size={showText ? 18 : 16} />
          {showText && <span>Adicionado!</span>}
        </>
      ) : (
        <>
          <ShoppingCart size={showText ? 18 : 16} />
          {showText && (
            <span>
              {quantity > 1 ? `Adicionar ${quantity}` : 'Adicionar'}
              {showText && quantity > 1 && (
                <span className="ml-1 text-amber-100">
                  (R$ {(item.price * quantity).toFixed(2).replace('.', ',')})
                </span>
              )}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
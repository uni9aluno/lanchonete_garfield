import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 30 ? 0 : 5.99;
  const finalTotal = totalPrice + deliveryFee;

  if (totalItems === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Carrinho vazio</h3>
        <p className="text-gray-500 text-sm">
          Adicione alguns itens deliciosos ao seu pedido!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header do Carrinho */}
      <div className="bg-amber-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShoppingCart size={20} />
            Seu Pedido ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </h3>
          <button
            onClick={clearCart}
            className="text-amber-100 hover:text-white transition-colors text-sm"
            title="Limpar carrinho"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="max-h-80 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="border-b border-gray-100 p-4 last:border-b-0">
            <div className="flex gap-3">
              {/* Imagem do Item */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              
              {/* Informações do Item */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-amber-900 text-sm mb-1 truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                
                {/* Controles de Quantidade */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 hover:bg-gray-100 transition-colors flex items-center justify-center"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-2 py-1 text-sm font-semibold min-w-[32px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-amber-600 text-sm">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo de Preços */}
      <div className="bg-gray-50 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
          <span className="font-semibold">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxa de entrega</span>
          <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
            {deliveryFee === 0 ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
          </span>
        </div>
        
        {deliveryFee > 0 && (
          <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
            💡 Faltam R$ {(30 - totalPrice).toFixed(2).replace('.', ',')} para entrega grátis!
          </div>
        )}
        
        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-bold text-lg text-amber-900">Total</span>
          <span className="font-bold text-xl text-amber-600">
            R$ {finalTotal.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="p-4 space-y-3">
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Finalizar Pedido
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Continuar Comprando
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
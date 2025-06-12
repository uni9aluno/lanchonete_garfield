import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, AlertTriangle, Eye } from 'lucide-react';
import { detailedMenuData } from '../data/detailedMenu';
import { useCart } from '../context/CartContext';
import AddToCartButton from './Cart/AddToCartButton';
import CartSummary from './Cart/CartSummary';

const MenuItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const item = detailedMenuData.find(item => item.id === parseInt(id || '0'));

  useEffect(() => {
    if (!item) return;
    document.title = `${item.name} | Lanchonete do Garfield`;
    window.scrollTo(0, 0);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const favorites = JSON.parse(localStorage.getItem('garfield_favorites') || '[]');
    setIsFavorite(favorites.includes(item.id));
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Item não encontrado</h2>
          <p className="text-gray-600 mb-6">Parece que este item não existe ou foi removido do cardápio.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = item.price * quantity;
  const itemInCart = items.find(cartItem => cartItem.id === item.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - Lanchonete do Garfield`,
          text: `Confira este delicioso ${item.name}! ${item.description}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência! 📋');
    }
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('garfield_favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((favId: number) => favId !== item.id);
    } else {
      newFavorites = [...favorites, item.id];
    }
    
    localStorage.setItem('garfield_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          
          <div className="flex items-center gap-3">
            {itemInCart && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {itemInCart.quantity} no carrinho
              </div>
            )}
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? 'text-red-500 bg-red-50 scale-110' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
              title="Compartilhar"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1 e 2: Produto */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Imagens */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
                  <img
                    src={item.gallery[selectedImage]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.isPopular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                      <Star size={16} fill="currentColor" />
                      Mais Vendido
                    </div>
                  )}
                </div>
                
                {/* Galeria de miniaturas */}
                {item.gallery.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {item.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          selectedImage === index 
                            ? 'border-amber-500 scale-110 shadow-lg' 
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${item.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <div className="space-y-6">
                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Título e Preço */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3 leading-tight">
                    {item.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-4xl font-bold text-amber-600">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                    <span className="text-sm text-gray-500">{item.servingInfo}</span>
                  </div>
                </div>

                {/* Descrição */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.longDescription}
                  </p>
                </div>

                {/* Ingredientes */}
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <span>🥘</span> Ingredientes
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {item.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Informações Nutricionais */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span>📊</span> Informações Nutricionais
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-2xl text-green-700">{item.nutritionalInfo.calories}</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">Calorias</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-2xl text-green-700">{item.nutritionalInfo.protein}g</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">Proteína</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-2xl text-green-700">{item.nutritionalInfo.carbs}g</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">Carboidratos</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-2xl text-green-700">{item.nutritionalInfo.fat}g</div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide">Gorduras</div>
                    </div>
                  </div>
                </div>

                {/* Alérgenos */}
                {item.allergens.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-red-900 mb-2">Contém Alérgenos:</h3>
                        <div className="flex flex-wrap gap-2">
                          {item.allergens.map((allergen, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-medium"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Produtos Relacionados */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">
                Você também pode gostar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {detailedMenuData
                  .filter(relatedItem => 
                    relatedItem.id !== item.id && 
                    relatedItem.category === item.category
                  )
                  .slice(0, 3)
                  .map(relatedItem => (
                    <div 
                      key={relatedItem.id}
                      onClick={() => navigate(`/menu/item/${relatedItem.id}`)}
                      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <img 
                        src={relatedItem.image} 
                        alt={relatedItem.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-amber-900 mb-2">{relatedItem.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{relatedItem.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-600">
                            R$ {relatedItem.price.toFixed(2).replace('.', ',')}
                          </span>
                          <button className="text-amber-600 hover:text-amber-800 transition-colors">
                            Ver detalhes →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Coluna 3: Carrinho e Compra */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Controles de Compra */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-amber-900 mb-4">Adicionar ao Pedido</h3>
                
                {/* Quantidade */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-900">Quantidade:</span>
                    <div className="flex items-center border-2 border-amber-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 text-amber-600 hover:bg-amber-50 transition-colors font-bold text-lg"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-6 py-3 font-bold text-amber-900 text-lg bg-amber-50">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 text-amber-600 hover:bg-amber-50 transition-colors font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total do item */}
                  <div className="bg-amber-100 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-amber-900">Subtotal:</span>
                      <span className="text-3xl font-bold text-amber-900">
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Botão de Adicionar */}
                  <AddToCartButton 
                    item={item} 
                    quantity={quantity}
                    className="w-full py-4 px-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    showText={true}
                  />
                </div>
              </div>

              {/* Resumo do Carrinho */}
              <CartSummary />

              {/* Informações de Entrega */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  🚚 Informações de Entrega
                </h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>• Entrega grátis acima de R$ 30</p>
                  <p>• Tempo estimado: 25-35 minutos</p>
                  <p>• Rastreamento em tempo real</p>
                  <p>• Pagamento na entrega ou online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemPage;
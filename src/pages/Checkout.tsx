import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Clock, Phone, User, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: '',
    email: '',
    phone: '',
    
    // Endereço de entrega
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zipCode: '',
    
    // Pagamento
    paymentMethod: 'credit_card',
    
    // Cartão (se aplicável)
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    
    // Observações
    observations: ''
  });

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 30 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (totalItems === 0) {
      navigate('/');
    }
  }, [totalItems, navigate]);

  useEffect(() => {
    document.title = 'Finalizar Pedido | Lanchonete do Garfield';
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'address', 'number', 'neighborhood', 'city', 'zipCode'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return false;
      }
    }

    if (formData.paymentMethod === 'credit_card') {
      const cardFields = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'];
      for (const field of cardFields) {
        if (!formData[field as keyof typeof formData]) {
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simula processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Gerar número do pedido
      const orderNumber = Math.floor(Math.random() * 900000) + 100000;
      
      // Salvar dados do pedido
      const orderData = {
        orderNumber,
        items,
        customer: formData,
        totals: {
          subtotal,
          deliveryFee,
          total
        },
        timestamp: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 35 * 60 * 1000).toISOString() // 35 minutos
      };

      localStorage.setItem('garfield_last_order', JSON.stringify(orderData));
      clearCart();
      navigate('/pedido-confirmado');

    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar o pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <h1 className="text-3xl font-bold text-amber-900">Finalizar Pedido</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dados Pessoais */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <User size={20} />
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <MapPin size={20} />
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="00000-000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Sua cidade"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Rua, avenida, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="123"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Apt, casa, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Seu bairro"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <CreditCard size={20} />
                Forma de Pagamento
              </h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                    className="text-amber-500"
                  />
                  <CreditCard size={20} className="text-gray-600" />
                  <span className="font-medium">Cartão de Crédito</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit_card"
                    checked={formData.paymentMethod === 'debit_card'}
                    onChange={handleInputChange}
                    className="text-amber-500"
                  />
                  <CreditCard size={20} className="text-gray-600" />
                  <span className="font-medium">Cartão de Débito</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="text-amber-500"
                  />
                  <span className="text-xl">💰</span>
                  <span className="font-medium">Dinheiro</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={formData.paymentMethod === 'pix'}
                    onChange={handleInputChange}
                    className="text-amber-500"
                  />
                  <span className="text-xl">📱</span>
                  <span className="font-medium">PIX</span>
                </label>
              </div>

              {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Cartão *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Nome como no cartão"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade *
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Observações */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Observações</h2>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Alguma observação especial para o seu pedido?"
              />
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-amber-900 mb-6">Resumo do Pedido</h2>
                
                {/* Lista de Itens */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-amber-900 text-sm mb-1 truncate">
                          {item.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {item.quantity}x
                          </span>
                          <span className="font-semibold text-amber-600">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totais */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} itens)</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'GRÁTIS' : formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-bold text-lg text-amber-900">Total</span>
                    <span className="font-bold text-xl text-amber-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Tempo de Entrega */}
                <div className="mt-6 bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Clock size={18} />
                    <span className="font-medium">Tempo de entrega</span>
                  </div>
                  <p className="text-amber-700 text-sm mt-1">25-35 minutos</p>
                </div>

                {/* Botão de Finalizar */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    `Finalizar Pedido - ${formatCurrency(total)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
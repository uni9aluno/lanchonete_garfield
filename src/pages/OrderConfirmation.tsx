import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Phone, Mail, ArrowRight, Copy, Share2 } from 'lucide-react';

interface OrderData {
  orderNumber: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    zipCode: string;
    paymentMethod: string;
    observations?: string;
  };
  totals: {
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
  timestamp: string;
  estimatedDelivery: string;
}

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const savedOrder = localStorage.getItem('garfield_last_order');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderData(parsedOrder);
      } catch (error) {
        console.error('Erro ao carregar dados do pedido:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!orderData) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const deliveryTime = new Date(orderData.estimatedDelivery).getTime();
      const difference = deliveryTime - now;

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeRemaining('Entrega realizada!');
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [orderData]);

  useEffect(() => {
    document.title = 'Pedido Confirmado! | Lanchonete do Garfield';
  }, []);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      credit_card: 'Cartão de Crédito',
      debit_card: 'Cartão de Débito',
      cash: 'Dinheiro',
      pix: 'PIX'
    };
    return methods[method] || method;
  };

  const copyOrderNumber = () => {
    if (orderData) {
      navigator.clipboard.writeText(orderData.orderNumber.toString());
      alert('Número do pedido copiado! 📋');
    }
  };

  const shareOrder = async () => {
    if (!orderData) return;

    const shareData = {
      title: 'Meu Pedido - Lanchonete do Garfield',
      text: `Acabei de fazer um pedido na Lanchonete do Garfield! 🍔\nPedido #${orderData.orderNumber}\nTotal: ${formatCurrency(orderData.totals.total)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert('Informações do pedido copiadas! 📋');
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-800">Carregando dados do pedido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header de Sucesso */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Pedido Confirmado! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Obrigado por escolher a Lanchonete do Garfield!<br />
            Seu pedido foi recebido e está sendo preparado com carinho.
          </p>
          
          {/* Número do Pedido */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-sm font-medium text-gray-600 mb-2">Número do Pedido</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-amber-600">#{orderData.orderNumber}</span>
              <button
                onClick={copyOrderNumber}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copiar número do pedido"
              >
                <Copy size={18} className="text-gray-500" />
              </button>
              <button
                onClick={shareOrder}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Compartilhar pedido"
              >
                <Share2 size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status do Pedido */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline do Pedido */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6">Status do Pedido</h2>
              
              <div className="space-y-6">
                {/* Pedido Confirmado */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-700">Pedido Confirmado</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(orderData.timestamp).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Preparando */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-700">Preparando seu pedido</h3>
                    <p className="text-sm text-gray-600">Nossa equipe está preparando seu pedido com todo carinho</p>
                  </div>
                </div>

                {/* Saiu para Entrega */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-500">Saiu para entrega</h3>
                    <p className="text-sm text-gray-400">Em breve seu pedido sairá para entrega</p>
                  </div>
                </div>

                {/* Entregue */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-500">Entregue</h3>
                    <p className="text-sm text-gray-400">Pedido entregue com sucesso</p>
                  </div>
                </div>
              </div>

              {/* Tempo Estimado */}
              <div className="mt-8 bg-amber-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-amber-600" />
                    <span className="font-semibold text-amber-800">Tempo estimado para entrega</span>
                  </div>
                  <span className="text-2xl font-bold text-amber-600">{timeRemaining}</span>
                </div>
                <p className="text-sm text-amber-700 mt-2">
                  Previsão: {new Date(orderData.estimatedDelivery).toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6">Itens do Pedido</h2>
              
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Quantidade: {item.quantity}
                        </span>
                        <span className="font-bold text-amber-600">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total do Pedido */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(orderData.totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span className={`font-semibold ${orderData.totals.deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {orderData.totals.deliveryFee === 0 ? 'GRÁTIS' : formatCurrency(orderData.totals.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-bold text-lg text-amber-900">Total</span>
                    <span className="font-bold text-xl text-amber-600">
                      {formatCurrency(orderData.totals.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Observações */}
            {orderData.customer.observations && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-amber-900 mb-4">Observações</h2>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {orderData.customer.observations}
                </p>
              </div>
            )}
          </div>

          {/* Informações Laterais */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dados de Entrega */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <MapPin size={20} />
                Endereço de Entrega
              </h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Nome:</span>
                  <p className="text-gray-600">{orderData.customer.name}</p>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Endereço:</span>
                  <p className="text-gray-600">
                    {orderData.customer.address}, {orderData.customer.number}
                    {orderData.customer.complement && `, ${orderData.customer.complement}`}
                  </p>
                  <p className="text-gray-600">
                    {orderData.customer.neighborhood} - {orderData.customer.city}
                  </p>
                  <p className="text-gray-600">CEP: {orderData.customer.zipCode}</p>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Telefone:</span>
                  <p className="text-gray-600">{orderData.customer.phone}</p>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">E-mail:</span>
                  <p className="text-gray-600">{orderData.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Pagamento</h2>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl">
                  {orderData.customer.paymentMethod === 'credit_card' && '💳'}
                  {orderData.customer.paymentMethod === 'debit_card' && '💳'}
                  {orderData.customer.paymentMethod === 'cash' && '💰'}
                  {orderData.customer.paymentMethod === 'pix' && '📱'}
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    {getPaymentMethodName(orderData.customer.paymentMethod)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: {formatCurrency(orderData.totals.total)}
                  </p>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Precisa de Ajuda?</h2>
              
              <div className="space-y-3">
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <Phone size={18} className="text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-800">Telefone</p>
                    <p className="text-sm text-amber-600">(11) 99999-9999</p>
                  </div>
                </a>
                
                <a
                  href="mailto:contato@lanchonetegarfield.com"
                  className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <Mail size={18} className="text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-800">E-mail</p>
                    <p className="text-sm text-amber-600">contato@lanchonetegarfield.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Ações */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Fazer Novo Pedido
                <ArrowRight size={18} />
              </button>
              
              <button
                onClick={() => window.print()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Imprimir Comprovante
              </button>
            </div>
          </div>
        </div>

        {/* Footer da Confirmação */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-6 py-3 rounded-full">
            <span className="text-2xl">🍔</span>
            <span className="font-semibold">Obrigado por escolher a Lanchonete do Garfield!</span>
            <span className="text-2xl">😸</span>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Acompanhe o status do seu pedido pelo número #{orderData.orderNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
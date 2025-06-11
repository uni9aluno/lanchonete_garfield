import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Faça uma visita</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-amber-800 mb-6">Informações de contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Endereço</h4>
                  <p className="text-gray-700">Rua Vergueiro, 235/249 - Liberdade, 01525-000</p>
                  <p className="text-gray-700"> São Paulo - SP,Brasil</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Telefone</h4>
                  <p className="text-gray-700">(11)99853-4756</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Email</h4>
                  <p className="text-gray-700">lanchonete.garfield@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900">Horários</h4>
                  <p className="text-gray-700">Segunda - Sexta: 7am - 8pm</p>
                  <p className="text-gray-700">Sábado - Domingo: 10am - 9pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-amber-800 mb-6">Envie uma mensagem</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-amber-900 font-medium mb-1">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Seu Nome"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-amber-900 font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="eu email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-amber-900 font-medium mb-1">Mensagem</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Sua Mensagem"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors w-full"
              >
                Envie a mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
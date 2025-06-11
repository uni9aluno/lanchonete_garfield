import React from 'react';
import { Clock, Award, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="rounded-xl overflow-hidden shadow-xl z-10 relative">
              <img 
                src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our café interior" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-200 rounded-xl -z-10 transform -rotate-6"></div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900">Sobre Lanchonete do Garfield</h2>
            <p className="text-gray-700">
              Somos uma empresa criada em 2024 com o objetivo de trazer uma experiência gastronomica satisfatória no setor de fastfood, oferencendo
              opções de lanches e sobremesas de alta qualidade com um preço justo, além de resgatarmos aquele início dos fastfoods com lanches usando 
              produtos naturais 
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-amber-50">
                <Clock className="w-8 h-8 text-amber-500 mb-2" />
                <h3 className="font-bold text-amber-800">Horários de abertura</h3>
                <p className="text-sm text-gray-600">Seg-Sex: 7am - 8pm</p>
                <p className="text-sm text-gray-600">Sab-Dom: 10am - 9pm</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-amber-50">
                <Award className="w-8 h-8 text-amber-500 mb-2" />
                <h3 className="font-bold text-amber-800">Qualidade da comida</h3>
                <p className="text-sm text-gray-600">ingredientes frescos e bem armazenados</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-amber-50">
                <Users className="w-8 h-8 text-amber-500 mb-2" />
                <h3 className="font-bold text-amber-800">Família</h3>
                <p className="text-sm text-gray-600">Servindo com amor desde 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
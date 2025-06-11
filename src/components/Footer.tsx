import React from 'react';
import { Coffee, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Coffee className="h-8 w-8 text-amber-300 mr-2" />
            <span className="text-xl font-bold text-amber-100">Lanchonete do Garfield</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-amber-200 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-amber-200 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-amber-200 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between border-t border-amber-800 pt-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold text-amber-200 mb-4">Sobre nós</h3>
            <p className="text-amber-300 text-sm">
              Somos uma empresa criada em 2024 com o objetivo de trazer uma experiência gastronomica satisfatória no setor de fastfood, oferencendo
              opções de lanches e sobremesas de alta qualidade com um preço justo, além de resgatarmos aquele início dos fastfoods com lanches usando 
              produtos naturais 
            </p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-amber-200 mb-4">Links rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-amber-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#menu" className="text-amber-300 hover:text-white transition-colors">Menu</a></li>
              <li><a href="#about" className="text-amber-300 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#contact" className="text-amber-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-amber-200 mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-amber-300">Rua Vergueiro, 235/249 - Liberdade, 01525-000</li>
              <li className="text-amber-300">(11)99853-4756</li>
              <li className="text-amber-300">lachonete.Garfield@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-400 text-sm">
            &copy; {new Date().getFullYear()} Lanchonete do Garfield.Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
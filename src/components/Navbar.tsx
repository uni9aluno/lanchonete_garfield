import React, { useState, useEffect } from 'react';
import { Menu, X, } from 'lucide-react';
import { Link } from '../components/Link';
import minhaImagem from "../data/logo-Photoroom.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={minhaImagem} alt="Minha Imagem" className="w-24 h-24" />
            <span className="text-xl font-bold text-amber-800">Lanchonete do garfield</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="#home" className="text-amber-900 hover:text-amber-600 transition-colors">
              Inicio
            </Link>
            <Link href="#menu" className="text-amber-900 hover:text-amber-600 transition-colors">
              Menu
            </Link>
            <Link href="#about" className="text-amber-900 hover:text-amber-600 transition-colors">
              Sobre
            </Link>
            <Link href="#contact" className="text-amber-900 hover:text-amber-600 transition-colors">
              Contato
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-900 hover:text-amber-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="#home" 
              className="text-amber-900 hover:text-amber-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#menu" 
              className="text-amber-900 hover:text-amber-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link 
              href="#about" 
              className="text-amber-900 hover:text-amber-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className="text-amber-900 hover:text-amber-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
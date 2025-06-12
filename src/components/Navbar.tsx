// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link } from './Link';
import minhaImagem from "../data/logo-Photoroom.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Se estiver em uma página de item, sempre mostrar navbar com fundo
  const isItemPage = location.pathname.includes('/menu/item/');

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

  // Fechar menu mobile quando a rota mudar
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || isItemPage ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo e Nome */}
          <RouterLink 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity group"
          >
            <img 
              src={minhaImagem} 
              alt="Logo Lanchonete do Garfield" 
              className="w-16 h-16 md:w-20 md:h-20 transition-transform group-hover:scale-105" 
            />
            <span className="text-lg md:text-xl font-bold text-amber-800 ml-2 hidden sm:block">
              Lanchonete do Garfield
            </span>
            <span className="text-sm md:text-base font-bold text-amber-800 ml-2 sm:hidden">
              Garfield
            </span>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {location.pathname === '/' ? (
              // Se estiver na página inicial, usar scroll suave
              <>
                <Link 
                  href="#home" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                >
                  Início
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </Link>
                <Link 
                  href="#menu" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                >
                  Menu
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </Link>
                <Link 
                  href="#about" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                >
                  Sobre
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </Link>
                <Link 
                  href="#contact" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                >
                  Contato
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </Link>
              </>
            ) : (
              // Se estiver em outras páginas, usar navegação normal
              <>
                <RouterLink 
                  to="/" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                >
                  Início
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </RouterLink>
                <RouterLink 
                  to="/#menu" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                  onClick={() => {
                    // Se estiver em uma página diferente, navegar primeiro e depois fazer scroll
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        const element = document.getElementById('menu');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  Menu
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </RouterLink>
                <RouterLink 
                  to="/#about" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                  onClick={() => {
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        const element = document.getElementById('about');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  Sobre
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </RouterLink>
                <RouterLink 
                  to="/#contact" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium relative group"
                  onClick={() => {
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  Contato
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
                </RouterLink>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-900 hover:text-amber-600 transition-colors p-2 rounded-lg hover:bg-amber-50"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {location.pathname === '/' ? (
              // Se estiver na página inicial, usar scroll suave
              <>
                <Link 
                  href="#home" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  href="#menu" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Menu
                </Link>
                <Link 
                  href="#about" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sobre
                </Link>
                <Link 
                  href="#contact" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Contato
                </Link>
              </>
            ) : (
              // Se estiver em outras páginas, usar navegação normal
              <>
                <RouterLink 
                  to="/" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Início
                </RouterLink>
                <RouterLink 
                  to="/#menu" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => {
                    setIsOpen(false);
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        const element = document.getElementById('menu');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  Menu
                </RouterLink>
                <RouterLink 
                  to="/#about" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => {
                    setIsOpen(false);
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        const element = document.getElementById('about');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  Sobre
                </RouterLink>
                <RouterLink 
                  to="/#contact" 
                  className="text-amber-900 hover:text-amber-600 transition-colors font-medium py-2 px-3 rounded-lg hover:bg-amber-50"
                  onClick={() => {
                    setIsOpen(false);
                    if (location.pathname !== '/') {
                      setTimeout(() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                >
                  Contato
                </RouterLink>
              </>
            )}
            
            {/* Informações adicionais no menu mobile */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="text-sm text-gray-600 text-center">
                <p className="font-medium text-amber-800">Horário de Funcionamento:</p>
                <p>Seg-Sex: 7h às 20h</p>
                <p>Sáb-Dom: 10h às 21h</p>
              </div>
              <div className="text-center mt-3">
                <a 
                  href="tel:+5511998534756" 
                  className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  📞 (11) 99853-4756
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
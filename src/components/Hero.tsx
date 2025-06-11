import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from './Link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
              Lanchonete do Garfield <br />
              <span className="text-amber-600">Momentos Felizes</span>
            </h1>
            <div className="flex gap-4">
              <Link
                href="#menu"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors flex items-center gap-2 group"
              >
                Ver Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                Nossas informações
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <div className="rounded-xl overflow-hidden shadow-xl transform md:rotate-2 transition-transform hover:rotate-0 duration-300">
              <img
                src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Delicious sandwich and coffee"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center gap-2">
                <span className="inline-block p-1.5 bg-green-100 rounded-full">
                  <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
                </span>
                <span className="font-medium text-gray-800">aberto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MenuItemPage from './components/MenuItemPage';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ChatBot from './ChatBot';

// Componente da página principal
const HomePage: React.FC = () => (
  <>
    <Hero />
    <MenuSection />
    <AboutSection />
    <ContactSection />
  </>
);

function App() {
  useEffect(() => {
    document.title = 'Lanchonete do Garfield - Onde a preguiça encontra a delícia!';
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu/item/:id" element={<MenuItemPage />} />
            <Route path="/menu" element={<MenuSection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedido-confirmado" element={<OrderConfirmation />} />
          </Routes>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
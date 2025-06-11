import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatBot from './ChatBot';

function App() {
  useEffect(() => {
    document.title = 'Del\u00EDciaCaf\u00E9 - Delicious Food, Happier Moments';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      {/* Chatbot component */}
      <ChatBot />
    </div>
  );
}

export default App;
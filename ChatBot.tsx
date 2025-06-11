import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getBotResponse } from './chatService';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat is first opened
      addBotMessage("Olá! Bem-vindo à Lanchonete do Garfield! Como posso ajudar você hoje?");
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text, isBot: true }]);
  };

  const simulateTyping = async () => {
    setIsTyping(true);
    // Simulate typing delay (between 1-2 seconds)
    const typingTime = Math.floor(Math.random() * 1000) + 1000;
    await new Promise(resolve => setTimeout(resolve, typingTime));
    setIsTyping(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text, isBot: false }]);
    
    // Simulate bot typing
    await simulateTyping();
    
    // Get bot response
    const response = getBotResponse(text);
    addBotMessage(response);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300">
          {/* Chat header */}
          <div className="bg-orange-500 text-white p-3 flex justify-between items-center">
            <h3 className="font-bold">Chat Lanchonete do Garfield</h3>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-orange-200"
              aria-label="Fechar chat"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-orange-50">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                text={message.text} 
                isBot={message.isBot} 
              />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1 mt-2 text-gray-500">
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce"></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
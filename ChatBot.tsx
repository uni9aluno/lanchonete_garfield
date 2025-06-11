// src/ChatBot.tsx - Versão com Gemini
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, RotateCcw } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { geminiChatService } from './services/geminiService';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isGeminiMode, setIsGeminiMode] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error' | 'loading'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Olá! Sou o assistente virtual da Lanchonete do Garfield! 🐱 Posso te ajudar com nosso cardápio, horários, localização e muito mais. Como posso ajudar você hoje?");
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text, 
      isBot: true, 
      timestamp: new Date() 
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text, 
      isBot: false, 
      timestamp: new Date() 
    }]);
  };

  const simulateTyping = async () => {
    setIsTyping(true);
    // Delay menor para Flash - respostas mais rápidas
    const typingTime = Math.floor(Math.random() * 1500) + 800; // 0.8-2.3s
    await new Promise(resolve => setTimeout(resolve, typingTime));
    setIsTyping(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Adicionar mensagem do usuário
    addUserMessage(text);
    
    // Simular digitação
    await simulateTyping();
    
    if (isGeminiMode) {
      try {
        setConnectionStatus('loading');
        const response = await geminiChatService.sendMessage(text);
        addBotMessage(response);
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Erro ao obter resposta do Gemini:', error);
        setConnectionStatus('error');
        addBotMessage("Desculpe, estou com problemas técnicos. Tente novamente ou entre em contato pelo telefone (11) 99853-4756.");
      }
    } else {
      // Fallback para sistema original
      const { getBotResponse } = await import('./chatService');
      const response = getBotResponse(text);
      addBotMessage(response);
    }
  };

  const resetChat = () => {
    setMessages([]);
    if (isGeminiMode) {
      geminiChatService.resetChat();
    }
    addBotMessage("Chat reiniciado! Como posso ajudar você?");
  };

  const toggleAIMode = () => {
    setIsGeminiMode(!isGeminiMode);
    addBotMessage(
      isGeminiMode 
        ? "Agora usando sistema de respostas básico." 
        : "Agora usando Gemini Flash! ⚡ Respostas mais rápidas e inteligentes!"
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          connectionStatus === 'error' 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-orange-500 hover:bg-orange-600'
        } text-white`}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {connectionStatus === 'loading' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-orange-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="font-bold">Lanchonete do Garfield</h3>
                <span className="text-xs opacity-90">
                  {isGeminiMode ? '⚡ Gemini Flash' : '📝 Respostas Básicas'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAIMode}
                className="text-white hover:text-orange-200 p-1"
                title={isGeminiMode ? "Usar respostas básicas" : "Usar IA Gemini"}
              >
                <Bot size={16} />
              </button>
              <button
                onClick={resetChat}
                className="text-white hover:text-orange-200 p-1"
                title="Reiniciar conversa"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-orange-200"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Status indicator */}
          {connectionStatus === 'error' && (
            <div className="bg-red-100 text-red-700 text-xs p-2 text-center">
              ⚠️ Problema de conexão - Usando modo básico
            </div>
          )}
          
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
                <span className="text-xs ml-2">
                  {isGeminiMode ? '⚡ Flash pensando...' : 'Digitando...'}
                </span>
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
import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 flex">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-orange-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-r-lg transition-colors"
        onClick={handleSend}
        aria-label="Enviar mensagem"
      >
        <Send size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
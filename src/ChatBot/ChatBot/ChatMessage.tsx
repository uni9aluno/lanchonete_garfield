import React from 'react';
import { Cat } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      {isBot && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-400 flex items-center justify-center mr-2">
          <Cat size={20} className="text-white" />
        </div>
      )}
      <div 
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isBot 
            ? 'bg-white text-gray-800 shadow-sm' 
            : 'bg-orange-500 text-white shadow-sm'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
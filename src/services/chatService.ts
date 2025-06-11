// src/services/chatService.ts - Atualizado
export const getChatResponse = async (message: string): Promise<string> => {
  // Tentar Gemini primeiro
  try {
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      return await geminiChatService.sendMessage(message);
    }
  } catch (error) {
    console.warn('Gemini falhou, usando sistema básico:', error);
  }
  
  // Fallback para sistema original
  return getBotResponse(message);
};
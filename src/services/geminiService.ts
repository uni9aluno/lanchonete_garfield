// src/services/geminiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { menuData } from '../data/menu';
import { BUSINESS_INFO } from '../config/businessInfo';

class GeminiChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatSession: any = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não configurado');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    // Usar Gemini Flash para respostas mais rápidas e eficientes
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512, // Reduzido para respostas mais concisas
      }
    });
    this.initializeChat();
  }

  private initializeChat() {
    const context = this.buildContextPrompt();
    
    this.chatSession = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: context }]
        },
        {
          role: "model", 
          parts: [{ text: "Entendi! Sou o assistente virtual da Lanchonete do Garfield. Posso ajudar com informações sobre nosso cardápio, horários, localização e pedidos. Como posso ajudar você hoje?" }]
        }
      ]
    });
  }

  private buildContextPrompt(): string {
    const menuText = menuData.map(item => 
      `${item.name} (${item.category}) - R$ ${item.price.toFixed(2).replace('.', ',')} - ${item.description}${item.isPopular ? ' [POPULAR]' : ''}`
    ).join('\n');

    return `
Você é o assistente virtual da Lanchonete do Garfield, um restaurante temático inspirado no famoso gato laranja.

INFORMAÇÕES DO NEGÓCIO:
- Nome: ${BUSINESS_INFO.name}
- Endereço: ${BUSINESS_INFO.address}
- Telefone: ${BUSINESS_INFO.phone}
- Email: ${BUSINESS_INFO.email}
- Horários: Segunda a Sexta ${BUSINESS_INFO.hours.weekdays.open} às ${BUSINESS_INFO.hours.weekdays.close}, Sábado e Domingo ${BUSINESS_INFO.hours.weekends.open} às ${BUSINESS_INFO.hours.weekends.close}

CARDÁPIO COMPLETO:
${menuText}

SERVIÇOS OFERECIDOS:
- Refeições no local
- Delivery (iFood, WhatsApp, site próprio)
- WiFi gratuito
- Estacionamento próprio e gratuito
- Reservas para grupos (acima de 5 pessoas)
- Formas de pagamento: Cartões, PIX, Dinheiro

PERSONALIDADE E INSTRUÇÕES:
- Seja amigável, prestativo e conciso
- Use referências sutis ao Garfield quando apropriado (mas sem exagerar)
- Responda SEMPRE em português brasileiro
- Mantenha respostas entre 1-3 frases para agilidade
- Seja específico sobre preços (sempre em reais: R$)
- Se não souber algo, seja honesto e direcione para contato humano
- Para pedidos, sempre mencione as opções de delivery disponíveis
- Para reservas, sempre peça para ligar no telefone

REGRAS IMPORTANTES:
- NUNCA invente informações que não estão no contexto
- SEMPRE confirme disponibilidade para pedidos grandes
- Para delivery, mencione: iFood, WhatsApp e site próprio
- Para alergias/restrições, SEMPRE oriente a consultar atendente presencialmente
- Mantenha o foco no restaurante - não responda perguntas muito fora do contexto
- Use emojis moderadamente (máximo 1-2 por resposta)
`;
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      if (!this.chatSession) {
        this.initializeChat();
      }

      // Adicionar timeout para Gemini Flash
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const result = await this.chatSession.sendMessage(userMessage);
      clearTimeout(timeoutId);
      
      const response = await result.response;
      let text = response.text();
      
      // Pós-processamento para garantir qualidade da resposta
      text = this.postProcessResponse(text);
      
      return text;
      
    } catch (error) {
      console.error('Erro ao comunicar com Gemini Flash:', error);
      
      // Tratamento específico de erros do Gemini
      if (error.message?.includes('timeout')) {
        return "Desculpe, estou demorando para responder. Tente uma pergunta mais simples ou entre em contato pelo telefone (11) 99853-4756.";
      }
      
      return this.getFallbackResponse();
    }
  }

  private postProcessResponse(text: string): string {
    // Limitar tamanho da resposta para melhor UX
    if (text.length > 300) {
      const sentences = text.split('. ');
      let truncated = sentences[0];
      
      for (let i = 1; i < sentences.length; i++) {
        if ((truncated + '. ' + sentences[i]).length <= 300) {
          truncated += '. ' + sentences[i];
        } else {
          break;
        }
      }
      
      return truncated + (truncated.endsWith('.') ? '' : '.');
    }
    
    return text;
  }

  private getFallbackResponse(): string {
    const fallbacks = [
      "Desculpe, estou com dificuldades técnicas no momento. Por favor, entre em contato pelo telefone (11) 99853-4756.",
      "Ops! Algo deu errado. Que tal ligar para nós? (11) 99853-4756",
      "Estou temporariamente indisponível. Para atendimento imediato, use nosso WhatsApp!"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Método para resetar conversa
  resetChat() {
    this.chatSession = null;
    this.initializeChat();
  }
}

export const geminiChatService = new GeminiChatService();
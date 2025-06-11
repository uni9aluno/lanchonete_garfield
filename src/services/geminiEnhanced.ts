// src/services/geminiEnhanced.ts
export class EnhancedGeminiService extends GeminiChatService {
  
  async analyzeUserIntent(message: string): Promise<{
    intent: 'menu' | 'order' | 'info' | 'complaint' | 'general';
    confidence: number;
    suggestions: string[];
  }> {
    const prompt = `
Analise esta mensagem de cliente e identifique:
1. Intenção principal (menu, order, info, complaint, general)
2. Nível de confiança (0-1)
3. Sugestões de resposta

Mensagem: "${message}"

Responda em JSON:
{
  "intent": "categoria",
  "confidence": 0.95,
  "suggestions": ["sugestão1", "sugestão2"]
}
`;

    try {
      const result = await this.model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch {
      return {
        intent: 'general',
        confidence: 0.5,
        suggestions: []
      };
    }
  }

  async generateMenuRecommendation(preferences: string[]): Promise<string> {
    const prompt = `
Com base nestas preferências do cliente: ${preferences.join(', ')}
E nosso cardápio: ${this.getMenuSummary()}

Gere uma recomendação personalizada em português, mencionando preços e explicando por que cada item foi escolhido.
`;

    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  private getMenuSummary(): string {
    return menuData.map(item => 
      `${item.name} - R$${item.price.toFixed(2)} (${item.category}) - ${item.description.substring(0, 50)}...`
    ).join('\n');
  }
}
// src/utils/messageValidator.ts
export class MessageValidator {
  static sanitize(message: string): string {
    return message
      .trim()
      .replace(/<[^>]*>/g, '') // Remove HTML
      .substring(0, 500); // Limita tamanho
  }

  static isValid(message: string): boolean {
    if (!message || message.length === 0) return false;
    if (message.length > 500) return false;
    
    // Verificar se não é spam
    const spamPatterns = [
      /(.)\1{10,}/, // Caracteres repetidos
      /http[s]?:\/\//, // URLs suspeitas
    ];
    
    return !spamPatterns.some(pattern => pattern.test(message));
  }
}
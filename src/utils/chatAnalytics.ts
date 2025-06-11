// src/utils/chatAnalytics.ts
export class ChatAnalytics {
  static trackEvent(event: string, data?: any) {
    // Google Analytics ou similar
    if (typeof gtag !== 'undefined') {
      gtag('event', event, {
        custom_parameter: data,
        event_category: 'chatbot'
      });
    }
    
    // Log local para desenvolvimento
    console.log(`[Chat Analytics] ${event}:`, data);
  }

  static trackMessageSent(isUser: boolean, messageLength: number) {
    this.trackEvent('message_sent', {
      sender: isUser ? 'user' : 'bot',
      length: messageLength
    });
  }

  static trackSessionStart() {
    this.trackEvent('chat_session_start');
  }

  static trackSessionEnd(duration: number, messageCount: number) {
    this.trackEvent('chat_session_end', {
      duration_seconds: Math.round(duration / 1000),
      message_count: messageCount
    });
  }
}
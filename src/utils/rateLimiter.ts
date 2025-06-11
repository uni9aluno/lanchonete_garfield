// src/utils/rateLimiter.ts
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests = 10;
  private readonly timeWindow = 60000; // 1 minuto

  canMakeRequest(userId: string = 'anonymous'): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove requests antigas
    const recentRequests = userRequests.filter(
      time => now - time < this.timeWindow
    );
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(userId, recentRequests);
    
    return true;
  }
}
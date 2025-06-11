// src/hooks/useChatFeedback.ts
export const useChatFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Array<{
    messageId: number;
    rating: 'good' | 'bad';
    comment?: string;
  }>>([]);

  const addFeedback = async (messageId: number, rating: 'good' | 'bad', comment?: string) => {
    const feedback = { messageId, rating, comment };
    setFeedbacks(prev => [...prev, feedback]);
    
    // Aqui você poderia enviar para analytics
    console.log('Feedback coletado:', feedback);
  };

  return { feedbacks, addFeedback };
};
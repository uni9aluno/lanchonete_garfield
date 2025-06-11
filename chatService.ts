// Define patterns and responses for the chatbot
interface PatternResponse {
  pattern: RegExp;
  responses: string[];
}

const botResponses: PatternResponse[] = [
  {
    pattern: /ol[áa]|oi|e a[íi]|bom dia|boa tarde|boa noite/i,
    responses: [
      "Olá! Em que posso ajudar?",
      "E aí! Bem-vindo à Lanchonete do Garfield! Como posso ser útil?",
    ]
  },
  {
    pattern: /card[áa]pio|menu|op[çc][õo]es|lanches|comidas|bebidas/i,
    responses: [
      "Nosso cardápio inclui: hambúrgueres,sobremesas, saladas, batatas fritas, bebidas.Qual você gostaria de conhecer melhor?",
      "Temos diversas opções no cardápio! Nosso famoso Cheeseburger Clássico saladas especiais. O que você gostaria de experimentar?",
      "No cardápio da Lanchonete do Garfield você encontra sobremesas,batatas fritas, hambúrgueres e bebidas variadas. Quer experimentar algo?",
    ]
  },
  {
    pattern: /hor[áa]rio|funcionamento|aberto|fechado|abre|fecha/i,
    responses: [
      "Estamos abertos todos os dias das 07h às 20h!",
      "Nossa lanchonete funciona de segunda a domingo, das 07h às 20h.",
      "O horário de funcionamento é das 07h às 20h, todos os dias da semana!"
    ]
  },
  {
    pattern: /pre[çc]o|valor|quanto custa|pagamento|pagar/i,
    responses: [
      "Nossos preços são bem acessiveis! Hambúrgueres a partir de R$9,99, pizzas a partir de R$35. Aceitamos todos os cartões, PIX e dinheiro.",
      "Temos opções para todos os bolsos! Lanches a partir de R$9. Aceitamos todos os métodos de pagamento.",
      "Os preços variam conforme o produto, mas trabalhamos com valores justos! Aceitamos dinheiro, cartões e PIX."
    ]
  },
  {
    pattern: /delivery|entrega|pedido online|ifood|entregam/i,
    responses: [
      "Sim, fazemos delivery! Você pode pedir pelo nosso WhatsApp, pelo iFood ou pelo nosso site!",
      "Entregamos em toda a cidade! Peça pelo iFood ou diretamente conosco por telefone e WhatsApp.",
      "O delivery funciona todos os dias, no mesmo horário da loja. Pedidos podem ser feitos pelo iFood ou diretamente conosco!"
    ]
  },
  {
    pattern: /endere[çc]o|localiza[çc][ãa]o|onde fica|como chegar/i,
    responses: [
      "Estamos localizados na Rua Vergueiro, 235.",
      "Nossa lanchonete fica na Rua Vergueiro, 235 .",
      "Você pode nos encontrar na Rua Vergueiro, 235."
    ]
  },
  {
    pattern: /reserva|reservar|mesa/i,
    responses: [
      "Aceitamos reservas! Por favor, entre em contato pelo telefone para reservar sua mesa.",
      "Para fazer uma reserva, basta ligar no telefone com pelo menos 2 horas de antecedência.",
      "Reservas podem ser feitas pelo telefone (11) 9999-8888. Recomendamos para grupos acima de 5 pessoas!"
    ]
  },
  {
    pattern: /wifi|internet|senha do wifi/i,
    responses: [
      "Sim, oferecemos WiFi gratuito para nossos clientes! A senha é fornecida na comanda.",
      "Temos WiFi disponível! Peça a senha para nossos atendentes quando estiver no local.",
      "O WiFi é cortesia para todos os clientes. A senha está impressa nos guardanapos!"
    ]
  },
  {
    pattern: /estacionamento|parar o carro|estacionar/i,
    responses: [
      "Temos estacionamento próprio e gratuito para clientes!",
      "Nosso estacionamento é gratuito para clientes da lanchonete.",
      "Disponibilizamos estacionamento próprio com manobrista nos horários de pico."
    ]
  },
  {
    pattern: /obrigad[ao]|valeu|grat[oi]|thanks/i,
    responses: [
      "De nada! Estou aqui para ajudar!",
      "Por nada! Se precisar de mais alguma coisa, é só perguntar!",
      "Disponha! O Garfield e toda nossa equipe estão à disposição!"
    ]
  }
];

// Fallback responses when no pattern matches
const fallbackResponses = [
  "Desculpe, não entendi. Pode reformular sua pergunta?",
  "Hmm, não consegui compreender. Poderia perguntar de outra forma?",
  "Não tenho essa informação. Gostaria de saber sobre nosso cardápio, horários ou localização?"
];

export const getBotResponse = (userMessage: string): string => {
  // Check if any pattern matches
  for (const item of botResponses) {
    if (item.pattern.test(userMessage)) {
      // Return a random response from the matching pattern
      const randomIndex = Math.floor(Math.random() * item.responses.length);
      return item.responses[randomIndex];
    }
  }
  
  // Return a random fallback response if no pattern matches
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
};
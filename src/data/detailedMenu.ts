import { MenuItemDetailed } from '../types/menuItemDetailed';

export const detailedMenuData: MenuItemDetailed[] = [
  {
    id: 1,
    name: "Cheeseburger Clássico",
    description: "Suculento hambúrguer de carne, queijo cheddar, alface, tomate e nosso molho especial no pão brioche",
    longDescription: "Nosso Cheeseburger Clássico é preparado com um suculento hambúrguer de carne bovina grelhado na hora, coberto com queijo cheddar derretido, alface fresca, tomate maduro e nosso molho especial da casa, tudo servido em um macio pão brioche tostado.",
    price: 18.99,
    category: "Hambúrgueres",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    isPopular: true,
    ingredients: [
      "Pão brioche artesanal",
      "Hambúrguer de carne bovina (150g)",
      "Queijo cheddar",
      "Alface americana",
      "Tomate fresco",
      "Molho especial da casa"
    ],
    nutritionalInfo: {
      calories: 685,
      protein: 35,
      carbs: 42,
      fat: 38,
      sodium: 1250
    },
    allergens: ["Glúten", "Lactose", "Ovos"],
    servingInfo: "1 porção - 320g",
    gallery: [
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      "https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg",
      "https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg"
    ],
    tags: ["Mais Vendido", "Clássico", "Proteína"]
  },
  {
    id: 2,
    name: "Chicken Club",
    description: "Peito de frango grelhado com bacon, abacate, alface, tomate e maionese em pão de fermentação natural",
    longDescription: "Um sanduíche premium com peito de frango grelhado temperado, bacon crocante, abacate fresco, alface, tomate e maionese caseira, servido em pão de fermentação natural tostado.",
    price: 16.99,
    category: "Lanches",
    image: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg",
    isPopular: false,
    ingredients: [
      "Pão de fermentação natural",
      "Peito de frango grelhado (120g)",
      "Bacon crocante",
      "Abacate fresco",
      "Alface crespa",
      "Tomate",
      "Maionese caseira"
    ],
    nutritionalInfo: {
      calories: 520,
      protein: 28,
      carbs: 35,
      fat: 28,
      sodium: 890
    },
    allergens: ["Glúten", "Ovos"],
    servingInfo: "1 porção - 280g",
    gallery: [
      "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg",
      "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg"
    ],
    tags: ["Premium", "Frango", "Saudável"]
  },
  {
    id: 3,
    name: "Veggie Wrap",
    description: "Homus, legumes assados, mix de folhas verdes e queijo feta em wrap de trigo integral",
    longDescription: "Uma opção saudável e saborosa com homus cremoso, legumes frescos assados (abobrinha, berinjela, pimentão), mix de folhas verdes e queijo feta, tudo envolvido em tortilla de trigo integral.",
    price: 15.99,
    category: "Lanches",
    image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
    isPopular: false,
    ingredients: [
      "Tortilla de trigo integral",
      "Homus de grão-de-bico",
      "Legumes assados (abobrinha, berinjela, pimentão)",
      "Mix de folhas verdes",
      "Queijo feta",
      "Temperos mediterrâneos"
    ],
    nutritionalInfo: {
      calories: 385,
      protein: 15,
      carbs: 45,
      fat: 18,
      sodium: 680
    },
    allergens: ["Glúten", "Lactose"],
    servingInfo: "1 porção - 250g",
    gallery: [
      "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    ],
    tags: ["Vegetariano", "Saudável", "Mediterrâneo"]
  },
  {
    id: 4,
    name: "Salada Caesar",
    description: "Alface romana crocante, queijo parmesão, croutons e nosso molho caesar caseiro",
    longDescription: "A clássica Salada Caesar com alface romana fresca e crocante, queijo parmesão ralado na hora, croutons dourados e nosso molho caesar caseiro cremoso.",
    price: 16.49,
    category: "Saladas",
    image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
    isPopular: false,
    ingredients: [
      "Alface romana",
      "Queijo parmesão",
      "Croutons artesanais",
      "Molho caesar caseiro",
      "Anchovas (opcional)",
      "Pimenta-do-reino"
    ],
    nutritionalInfo: {
      calories: 285,
      protein: 12,
      carbs: 18,
      fat: 20,
      sodium: 780
    },
    allergens: ["Lactose", "Glúten", "Ovos", "Peixes"],
    servingInfo: "1 porção - 220g",
    gallery: [
      "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    ],
    tags: ["Clássico", "Vegetariano", "Leve"]
  },
  {
    id: 5,
    name: "Batata Frita",
    description: "Batatas fritas douradas e crocantes temperadas com nossa mistura especial de ervas",
    longDescription: "Batatas selecionadas cortadas em bastões e fritas até ficarem douradas e crocantes por fora, macias por dentro, temperadas com nossa mistura especial de ervas e sal marinho.",
    price: 7.99,
    category: "Acompanhamentos",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
    isPopular: true,
    ingredients: [
      "Batatas frescas",
      "Óleo vegetal",
      "Sal marinho",
      "Mix de ervas especiais",
      "Alecrim",
      "Páprica"
    ],
    nutritionalInfo: {
      calories: 365,
      protein: 4,
      carbs: 45,
      fat: 18,
      sodium: 580
    },
    allergens: [],
    servingInfo: "1 porção - 200g",
    gallery: [
      "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
      "https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg"
    ],
    tags: ["Mais Vendido", "Crocante", "Acompanhamento"]
  },
  {
    id: 6,
    name: "Cappuccino",
    description: "Espresso com leite vaporizado e uma leve camada de espuma",
    longDescription: "Cappuccino tradicional preparado com café espresso premium, leite fresco vaporizado na temperatura ideal e uma delicada camada de espuma cremosa, finalizado com canela.",
    price: 8.50,
    category: "Bebidas",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    isPopular: true,
    ingredients: [
      "Café espresso premium",
      "Leite integral fresco",
      "Espuma de leite",
      "Canela em pó (opcional)",
      "Açúcar (opcional)"
    ],
    nutritionalInfo: {
      calories: 85,
      protein: 4,
      carbs: 8,
      fat: 3,
      sodium: 55
    },
    allergens: ["Lactose"],
    servingInfo: "1 xícara - 150ml",
    gallery: [
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
    ],
    tags: ["Mais Vendido", "Café", "Cremoso"]
  },
  {
    id: 7,
    name: "Brownie de Chocolate",
    description: "Brownie rico e cremoso servido quente com sorvete de baunilha",
    longDescription: "Irresistível brownie de chocolate meio-amargo, úmido e intenso, servido quentinho acompanhado de uma generosa bola de sorvete de baunilha premium.",
    price: 11.99,
    category: "Sobremesas",
    image: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg",
    isPopular: false,
    ingredients: [
      "Chocolate meio-amargo",
      "Manteiga",
      "Ovos frescos",
      "Farinha de trigo",
      "Açúcar mascavo",
      "Sorvete de baunilha"
    ],
    nutritionalInfo: {
      calories: 485,
      protein: 8,
      carbs: 58,
      fat: 25,
      sodium: 180
    },
    allergens: ["Lactose", "Ovos", "Glúten"],
    servingInfo: "1 fatia + sorvete - 170g",
    gallery: [
      "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg",
      "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg"
    ],
    tags: ["Sobremesa", "Chocolate", "Quente"]
  }
];
// src/config/businessInfo.ts
export const BUSINESS_INFO = {
  name: 'Lanchonete do Garfield',
  address: 'Rua Vergueiro, 235/249 - Liberdade, 01525-000, São Paulo - SP',
  phone: '(11) 99853-4756',
  email: 'lanchonete.garfield@gmail.com',
  whatsapp: '5511998534756',
  hours: {
    weekdays: { open: '07:00', close: '20:00' },
    weekends: { open: '10:00', close: '21:00' }
  },
  services: [
    'Refeições no local',
    'Delivery (iFood, WhatsApp, site)',
    'WiFi gratuito',
    'Estacionamento próprio',
    'Sistema de reservas'
  ],
  paymentMethods: ['Cartões', 'PIX', 'Dinheiro']
} as const;
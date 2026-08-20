export const orders = [
  {
    id: 'ORD-001',
    customer: 'María García López',
    email: 'maria.garcia@example.com',
    date: '2024-12-01',
    total: 780000,
    status: 'Entregado',
    items: [
      { name: 'Crema Hidratante Velours 100ml', qty: 1, price: 420000 },
      { name: 'Protector Solar Matifiante 50ml', qty: 2, price: 195000 },
    ],
    shipping: 'Envío estándar',
    address: 'Calle 85 #12-45, Bogotá',
  },
  {
    id: 'ORD-002',
    customer: 'Carlos Rodríguez',
    email: 'carlos.r@example.com',
    date: '2024-12-03',
    total: 520000,
    status: 'En proceso',
    items: [
      { name: 'Sérum Iluminador Éclat 30ml', qty: 1, price: 520000 },
    ],
    shipping: 'Envío express',
    address: 'Carrera 15 #90-20, Medellín',
  },
  {
    id: 'ORD-003',
    customer: 'Ana María Torres',
    email: 'ana.torres@example.com',
    date: '2024-12-05',
    total: 245000,
    status: 'Enviado',
    items: [
      { name: 'Aceite Limpiador Doux 200ml', qty: 1, price: 350000 },
      { name: 'Bálsamo Labial Reparador 4.5g', qty: 2, price: 85000 },
    ],
    shipping: 'Envío estándar',
    address: 'Avenida 7 #28-55, Cali',
  },
  {
    id: 'ORD-004',
    customer: 'Juan Pablo Méndez',
    email: 'juan.mendez@example.com',
    date: '2024-12-06',
    total: 165000,
    status: 'Cancelado',
    items: [
      { name: 'Mascarilla de Arcilla Purificante 75ml', qty: 1, price: 165000 },
    ],
    shipping: 'Envío estándar',
    address: 'Calle 100 #20-10, Bogotá',
  },
  {
    id: 'ORD-005',
    customer: 'Laura Fernández',
    email: 'laura.f@example.com',
    date: '2024-12-07',
    total: 340000,
    status: 'Entregado',
    items: [
      { name: 'Contorno de Ojos Antioxidante 15ml', qty: 1, price: 340000 },
    ],
    shipping: 'Envío express',
    address: 'Transversal 25 #50-30, Barranquilla',
  },
];

export const getOrderById = (id) => orders.find((o) => o.id === id);

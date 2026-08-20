export const dashboardStats = {
  revenue: {
    total: 28456000,
    change: 12.5,
    label: 'Ingresos del mes',
  },
  orders: {
    total: 342,
    change: 8.2,
    label: 'Pedidos',
  },
  customers: {
    total: 1284,
    change: 4.1,
    label: 'Clientes activos',
  },
  avgTicket: {
    total: 83200,
    change: -2.4,
    label: 'Ticket promedio',
  },
};

export const recentOrders = [
  { id: 'ORD-001', customer: 'María García', total: 780000, status: 'Entregado', date: '2024-12-01' },
  { id: 'ORD-002', customer: 'Carlos Rodríguez', total: 520000, status: 'En proceso', date: '2024-12-03' },
  { id: 'ORD-003', customer: 'Ana María Torres', total: 245000, status: 'Enviado', date: '2024-12-05' },
  { id: 'ORD-004', customer: 'Juan Pablo Méndez', total: 165000, status: 'Cancelado', date: '2024-12-06' },
  { id: 'ORD-005', customer: 'Laura Fernández', total: 340000, status: 'Entregado', date: '2024-12-07' },
];

export const lowStockAlerts = [
  { name: 'Mascarilla de Arcilla Purificante', stock: 0, min: 10, alert: 'Agotado' },
  { name: 'Bálsamo Labial Reparador', stock: 3, min: 20, alert: 'Crítico' },
  { name: 'Sérum Iluminador Éclat', stock: 8, min: 15, alert: 'Bajo' },
  { name: 'Contorno de Ojos Antioxidante', stock: 18, min: 10, alert: 'Normal' },
];

export const monthlyRevenue = [
  { month: 'Ene', revenue: 18500000 },
  { month: 'Feb', revenue: 21000000 },
  { month: 'Mar', revenue: 19800000 },
  { month: 'Abr', revenue: 24500000 },
  { month: 'May', revenue: 26800000 },
  { month: 'Jun', revenue: 25200000 },
  { month: 'Jul', revenue: 28900000 },
  { month: 'Ago', revenue: 27500000 },
  { month: 'Sep', revenue: 30100000 },
  { month: 'Oct', revenue: 31500000 },
  { month: 'Nov', revenue: 34200000 },
  { month: 'Dic', revenue: 28456000 },
];

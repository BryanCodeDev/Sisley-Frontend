export const categories = [
  {
    id: 'hidratacion',
    name: 'Hidratación',
    description: 'Crema hidratante y sueros para todo tipo de piel.',
    image: null,
    count: 12,
  },
  {
    id: 'tratamiento',
    name: 'Tratamiento',
    description: 'Sérums y tratamientos concentrados para resultados visibles.',
    image: null,
    count: 8,
  },
  {
    id: 'proteccion',
    name: 'Protección Solar',
    description: 'Filtros solares avanzados para cada necesidad.',
    image: null,
    count: 6,
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    description: 'Limpiadores, tónicos y desmaquillantes suaves.',
    image: null,
    count: 10,
  },
  {
    id: 'contorno',
    name: 'Contorno de Ojos',
    description: 'Cuidado específico para la zona ocular.',
    image: null,
    count: 5,
  },
  {
    id: 'labios',
    name: 'Labios',
    description: 'Bálsamos y tratamientos para unos labios perfectos.',
    image: null,
    count: 4,
  },
  {
    id: 'mascarillas',
    name: 'Mascarillas',
    description: 'Mascarillas faciales para cada tipo de piel.',
    image: null,
    count: 7,
  },
  {
    id: 'tonicos',
    name: 'Tónicos',
    description: 'Tónicos y aguas micelares para equilibrar.',
    image: null,
    count: 6,
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.id === slug);

'use client';

const CATEGORY_PALETTES = {
  mujer: { from: '#f5e6d3', to: '#e8d5c4', text: '#5c4a3a', accent: '#c4a98f' },
  hombre: { from: '#e5e7eb', to: '#d1d5db', text: '#1f2937', accent: '#9ca3af' },
  'nueva-coleccion': { from: '#fafafa', to: '#f3f4f6', text: '#171717', accent: '#a3a3a3' },
  ofertas: { from: '#fce7f3', to: '#fbcfe8', text: '#831843', accent: '#f472b6' },
  accesorios: { from: '#fef3c7', to: '#fde68a', text: '#78350f', accent: '#d4a053' },
  denim: { from: '#dbeafe', to: '#bfdbfe', text: '#1e3a8a', accent: '#60a5fa' },
  outerwear: { from: '#d1fae5', to: '#a7f3d0', text: '#064e3b', accent: '#34d399' },
};

const EDITORIAL_GRADIENTS = [
  'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)',
  'linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #e8e8e8 100%)',
  'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 50%, #f5f5f5 100%)',
];

function getCategoryPalette(slug) {
  return CATEGORY_PALETTES[slug] || { from: '#f5f5f5', to: '#e5e5e5', text: '#262626', accent: '#a3a3a3' };
}

function getGradient(index = 0) {
  return EDITORIAL_GRADIENTS[index % EDITORIAL_GRADIENTS.length];
}

export default function EditorialPlaceholder({
  title = '',
  subtitle = '',
  categorySlug = '',
  index = 0,
  className = '',
  aspectRatio = 'product',
  ...props
}) {
  const palette = getCategoryPalette(categorySlug);
  const gradient = getGradient(index);
  const displayTitle = title || 'Sisley';
  const displaySubtitle = subtitle || '';

  const aspectClasses = {
    product: 'aspect-[3/4]',
    editorial: 'aspect-[4/5]',
    banner: 'aspect-[16/9]',
    square: 'aspect-square',
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectClasses[aspectRatio] || aspectClasses.product} ${className}`}
      style={{ background: gradient }}
      {...props}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${palette.accent}40 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${palette.accent}30 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10 max-w-xs">
          {displaySubtitle && (
            <p className="text-[10px] uppercase tracking-[0.2em] mb-3 opacity-60" style={{ color: palette.text }}>
              {displaySubtitle}
            </p>
          )}
          <h3 className="font-serif text-lg md:text-xl font-light leading-tight" style={{ color: palette.text }}>
            {displayTitle}
          </h3>
          <div
            className="w-8 h-px mx-auto mt-4 mb-3 opacity-40"
            style={{ backgroundColor: palette.accent }}
          />
          <p className="text-[10px] uppercase tracking-[0.15em] opacity-50" style={{ color: palette.text }}>
            Sisley Colombia
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

const FALLBACK_IMAGES = [
  '/assets/catalog/1.webp',
  '/assets/catalog/2.webp',
  '/assets/catalog/3.webp',
  '/assets/catalog/4.webp',
  '/assets/catalog/5.webp',
  '/assets/catalog/6.webp',
  '/assets/catalog/7.webp',
  '/assets/catalog/8.webp',
  '/assets/catalog/9.webp',
  '/assets/catalog/blusa-satinada.webp',
  '/assets/catalog/pantalon-wide-leg.webp',
  '/assets/catalog/vestido-midi-plisado.webp',
];

function resolveImage(src) {
  if (!src) return null;
  if (typeof src === 'string') {
    if (src.startsWith('/assets/')) return src;
    if (src.startsWith('http')) return src;
    return src;
  }
  if (typeof src === 'object' && src.url) {
    return resolveImage(src.url);
  }
  return null;
}

function getFallbackImage(index = 0) {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export default function ImageWithPlaceholder({
  src,
  alt = '',
  className = '',
  aspectRatio = 'product',
  categorySlug = '',
  index = 0,
  title = '',
  subtitle = '',
  ...props
}) {
  const resolvedSrc = resolveImage(src);
  const imageSrc = resolvedSrc || getFallbackImage(index);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`object-cover ${className}`}
      {...props}
    />
  );
}

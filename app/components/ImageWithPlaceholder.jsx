'use client';

import EditorialPlaceholder from './EditorialPlaceholder';

const LOCAL_IMAGES = {
  '/assets/catalog/blusa-satinada.webp': '/assets/catalog/blusa-satinada.webp',
  '/assets/catalog/pantalon-wide-leg.webp': '/assets/catalog/pantalon-wide-leg.webp',
  '/assets/catalog/vestido-midi-plisado.webp': '/assets/catalog/vestido-midi-plisado.webp',
  '/assets/logo.webp': '/assets/logo.webp',
};

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

  if (resolvedSrc) {
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={`object-cover ${className}`}
        {...props}
      />
    );
  }

  return (
    <EditorialPlaceholder
      title={title}
      subtitle={subtitle}
      categorySlug={categorySlug}
      index={index}
      aspectRatio={aspectRatio}
      className={className}
      {...props}
    />
  );
}

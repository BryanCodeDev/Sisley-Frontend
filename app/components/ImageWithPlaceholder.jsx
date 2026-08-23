'use client';

const CATEGORY_IMAGES = {
  mujer: '/assets/catalog/Hero-principal.webp',
  hombre: '/assets/catalog/Hero-alterno.webp',
  'nueva-coleccion': '/assets/catalog/Hero-Nueva-Colección.webp',
  ofertas: '/assets/catalog/1.webp',
  accesorios: '/assets/catalog/2.webp',
  denim: '/assets/catalog/3.webp',
  outerwear: '/assets/catalog/4.webp',
};

const PRODUCT_IMAGES = [
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

function getCategoryImage(slug) {
  return CATEGORY_IMAGES[slug] || CATEGORY_IMAGES.mujer;
}

function getProductImage(index = 0) {
  return PRODUCT_IMAGES[index % PRODUCT_IMAGES.length];
}

export default function ImageWithPlaceholder({
  src,
  alt = '',
  className = '',
  categorySlug = '',
  index = 0,
  ...props
}) {
  let imageSrc = null;

  if (src) {
    if (typeof src === 'string') {
      imageSrc = src;
    } else if (typeof src === 'object' && src?.url) {
      imageSrc = src.url;
    }
  }

  if (!imageSrc && categorySlug) {
    imageSrc = getCategoryImage(categorySlug);
  }

  if (!imageSrc) {
    imageSrc = getProductImage(index);
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`object-cover ${className}`}
      {...props}
    />
  );
}

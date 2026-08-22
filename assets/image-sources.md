# Image Sources

## Existing Local Assets

| File | Path | Usage | Notes |
|------|------|-------|-------|
| logo.webp | `/assets/logo.webp` | Header, footer, favicon | Brand asset |
| 1.webp | `/assets/catalog/1.webp` | Product fallback / blusa | Local catalog image |
| 2.webp | `/assets/catalog/2.webp` | Product fallback / pantalon | Local catalog image |
| 3.webp | `/assets/catalog/3.webp` | Product fallback / vestido | Local catalog image |
| 4.webp | `/assets/catalog/4.webp` | Product fallback | Local catalog image |
| 5.webp | `/assets/catalog/5.webp` | Product fallback | Local catalog image |
| 6.webp | `/assets/catalog/6.webp` | Product fallback | Local catalog image |
| 7.webp | `/assets/catalog/7.webp` | Product fallback | Local catalog image |
| 8.webp | `/assets/catalog/8.webp` | Product fallback | Local catalog image |
| 9.webp | `/assets/catalog/9.webp` | Product fallback | Local catalog image |
| blusa-satinada.webp | `/assets/catalog/blusa-satinada.webp` | Blusa product image | Local catalog image |
| pantalon-wide-leg.webp | `/assets/catalog/pantalon-wide-leg.webp` | Pantalon product image | Local catalog image |
| vestido-midi-plisado.webp | `/assets/catalog/vestido-midi-plisado.webp` | Vestido product image | Local catalog image |

## Placeholder Strategy

This phase does **not** add external fashion images.

Missing imagery is handled with an **editorial CSS placeholder** (`EditorialPlaceholder`) instead of broken images or generic stock photos.

Rationale:
- Avoid inconsistent or low-quality stock imagery.
- Avoid mixing brands or styles.
- Keep the demo legally safe and visually coherent.
- Maintain premium/modern/urban aesthetic through typography and color rather than questionable photography.

## Future Image Additions

When real fashion photography is available, prefer:
- Product images mapped by product slug in `frontend/app/services/products.js`
- Category images loaded from `category.imageUrl` returned by the API
- Editorial/hero images added as local assets under `/assets/editorial/`

Do not add random external URLs unless they are confirmed licensed for commercial use.

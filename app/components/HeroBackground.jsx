'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const HERO_IMAGES = [
  {
    src: '/assets/catalog/Hero-principal.webp',
    alt: 'Nueva colección Sisley — look editorial 1',
    objectPosition: 'center 40% md:center',
  },
  {
    src: '/assets/catalog/Hero-Nueva-Colección.webp',
    alt: 'Nueva colección Sisley — look editorial 2',
    objectPosition: 'center 35% md:center',
  },
  {
    src: '/assets/catalog/Hero-alterno.webp',
    alt: 'Nueva colección Sisley — look editorial 3',
    objectPosition: 'center 25% md:center',
  },
];

const VISIBLE_MS = 6000;

export default function HeroBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible');
    onChange();
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || !visible) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, VISIBLE_MS);
    return () => clearInterval(interval);
  }, [reduceMotion, visible]);

  return (
    <div className="absolute inset-0 scale-110">
      {HERO_IMAGES.map((image, i) => {
        const imageProps = {
          src: image.src,
          alt: image.alt,
          fill: true,
          sizes: '100vw',
          className: `object-cover transition-opacity duration-[1200ms] ease-out motion-reduce:duration-0 ${
            i === currentIndex ? 'opacity-100' : 'opacity-0'
          }`,
          style: { objectPosition: image.objectPosition },
        };
        return i === 0 ? (
          <Image {...imageProps} priority key={i} />
        ) : (
          <Image {...imageProps} loading="lazy" key={i} />
        );
      })}
    </div>
  );
}

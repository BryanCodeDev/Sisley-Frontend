'use client';

import { useEffect, useRef, useState } from 'react';

export default function ImageReveal({
  src,
  alt = '',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  priority = false,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
          isVisible && isLoaded ? 'image-reveal visible scale-100' : 'image-reveal scale-105'
        }`}
      />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

export default function ImageReveal({
  src,
  alt = '',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  priority = false,
  fallbackLetter = '',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const showFallback = !src || hasError;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      {...props}
    >
      {showFallback ? (
        <div className="absolute inset-0 bg-sisley-smoke flex items-center justify-center">
          {fallbackLetter ? (
            <span className="text-6xl font-serif text-sisley-text/20 select-none">
              {fallbackLetter}
            </span>
          ) : (
            <div className="w-12 h-12 border-2 border-sisley-border rounded-full animate-pulse" />
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
            isVisible && isLoaded ? 'image-reveal visible scale-100' : 'image-reveal scale-105'
          }`}
        />
      )}
    </div>
  );
}

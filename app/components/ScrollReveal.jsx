'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  animation = 'reveal',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const animationClasses = {
    reveal: 'reveal',
    'reveal-up': 'reveal-up',
    'reveal-scale': 'reveal-scale',
    'reveal-fade': 'reveal-fade',
    'text-reveal': 'text-reveal',
    'image-reveal': 'image-reveal',
    'line-reveal': 'line-reveal',
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation] || 'reveal'} ${isVisible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

'use client';

export default function Marquee({
  children,
  speed = 'normal',
  pauseOnHover = true,
  className = '',
}) {
  const speedClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex whitespace-nowrap ${speedClass} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        <div className="flex items-center gap-8 px-4">
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

'use client';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', className = '' }) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignClasses[align]} mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <p className="text-meta uppercase tracking-[0.25em] text-sisley-muted mb-4">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-serif title-xl md:title-lg font-light text-sisley-text tracking-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-sisley-text-secondary leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

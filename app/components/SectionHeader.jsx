'use client';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', className = '' }) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-10 md:mb-14 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-3">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-sm text-sisley-text-secondary leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

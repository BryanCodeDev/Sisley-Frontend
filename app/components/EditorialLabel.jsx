'use client';

export default function EditorialLabel({ number = '', label = '', className = '' }) {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      {number && (
        <span className="text-[11px] uppercase tracking-[0.2em] text-sisley-muted font-sans">
          {number}
        </span>
      )}
      {number && label && (
        <span className="w-8 h-px bg-sisley-border-strong" />
      )}
      {label && (
        <span className="section-label mb-0">{label}</span>
      )}
    </div>
  );
}

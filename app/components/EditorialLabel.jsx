'use client';

export default function EditorialLabel({ number = '', label = '', className = '' }) {
  return (
    <div className={`flex items-center gap-4 mb-8 ${className}`}>
      {number && (
        <span className="text-[11px] uppercase tracking-[0.3em] text-sisley-muted font-sans tabular-nums">
          {number}
        </span>
      )}
      {number && label && (
        <span className="w-8 h-px bg-sisley-border-strong" />
      )}
      {label && (
        <span className="text-[11px] uppercase tracking-[0.25em] text-sisley-muted">{label}</span>
      )}
    </div>
  );
}

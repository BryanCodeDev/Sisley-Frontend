'use client';

export default function ImageWithPlaceholder({
  src,
  alt = '',
  className = '',
  aspectRatio = 'product',
  ...props
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`object-cover ${className}`}
        {...props}
      />
    );
  }

  return (
    <div className={`bg-sisley-bg flex items-center justify-center ${className}`} {...props}>
      <svg className="w-12 h-12 text-sisley-border-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

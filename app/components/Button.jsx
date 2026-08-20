'use client';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-sisley-black text-white hover:bg-sisley-gray-800 active:scale-[0.98]',
    secondary: 'bg-transparent border border-sisley-black text-sisley-black hover:bg-sisley-black hover:text-white',
    ghost: 'bg-transparent text-sisley-gray-600 hover:text-sisley-black underline underline-offset-4',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-xs uppercase tracking-widest',
    md: 'px-6 py-3 text-xs uppercase tracking-widest',
    lg: 'px-8 py-4 text-sm uppercase tracking-widest',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

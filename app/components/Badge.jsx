'use client';

const ecommerceVariants = {
  default: 'bg-sisley-bg text-sisley-text',
  outline: 'bg-transparent border border-sisley-border text-sisley-text',
  dark: 'bg-sisley-black text-white',
};

const adminVariants = {
  default: 'bg-sisley-bg text-sisley-text',
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
};

export default function Badge({ children, variant = 'default', size = 'md', className = '', mode = 'ecommerce' }) {
  const variants = mode === 'admin' ? adminVariants : ecommerceVariants;

  const sizes = {
    sm: 'px-2 py-1 text-[10px] uppercase tracking-wider',
    md: 'px-3 py-1.5 text-[11px] uppercase tracking-wider',
    lg: 'px-4 py-2 text-xs uppercase tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center font-sans ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

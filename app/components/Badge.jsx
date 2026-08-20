'use client';

const variants = {
  default: 'bg-sisley-gray-100 text-sisley-gray-700',
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
};

const sizes = {
  sm: 'px-2 py-1 text-[10px]',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm',
};

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  return (
    <span
      className={`inline-flex items-center uppercase tracking-wider font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

'use client';

import Link from 'next/link';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  href,
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-sans rounded-sm transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-sisley-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-sisley-black text-white hover:bg-sisley-charcoal active:scale-[0.98]',
    secondary: 'bg-transparent border border-sisley-black text-sisley-black hover:bg-sisley-black hover:text-white',
    ghost: 'bg-transparent text-sisley-text hover:text-sisley-black underline underline-offset-4 decoration-sisley-border-strong hover:decoration-sisley-black',
    text: 'bg-transparent text-sisley-text hover:text-sisley-black underline underline-offset-4 decoration-sisley-border-strong hover:decoration-sisley-black',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[11px] uppercase tracking-widest',
    md: 'px-6 py-3 text-xs uppercase tracking-widest',
    lg: 'px-8 py-4 text-xs uppercase tracking-widest',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sisley-muted mb-8">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-3 h-3" strokeWidth={1.5} />}
          {item.href ? (
            <Link href={item.href} className="hover:text-sisley-black transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-sisley-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

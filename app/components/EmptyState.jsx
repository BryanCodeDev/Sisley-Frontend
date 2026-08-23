'use client';

import Button from './Button';
import Link from 'next/link';

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryAction,
}) {
  const actionButton = actionLabel && (actionHref || onAction) && (
    <Button href={actionHref} onClick={onAction}>
      {actionLabel}
    </Button>
  );

  return (
    <div className="py-16 text-center">
      {icon && (
        <div className="w-20 h-20 mx-auto mb-6 bg-sisley-bg rounded-full flex items-center justify-center text-sisley-muted">
          {icon}
        </div>
      )}
      <h2 className="font-serif text-xl font-light text-sisley-text mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-sisley-muted mb-6 max-w-sm mx-auto">{description}</p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {actionButton}
        {secondaryAction}
      </div>
    </div>
  );
}

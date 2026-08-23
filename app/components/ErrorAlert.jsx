'use client';

import { X, AlertCircle } from 'lucide-react';

export default function ErrorAlert({ message, onRetry, onDismiss }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3" role="alert">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs text-red-600 underline mt-1 hover:text-red-800"
          >
            Intentar de nuevo
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 p-1"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

'use client';

import ErrorFallback from './components/ErrorFallback';

export default function Error({ error, reset }) {
  return (
    <ErrorFallback
      error={error}
      reset={reset}
      title="No pudimos cargar esta página"
      message="Ocurrió un error inesperado. Intenta recargar la sección o vuelve al inicio."
    />
  );
}

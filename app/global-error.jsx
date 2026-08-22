'use client';

import ErrorFallback from './components/ErrorFallback';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-sisley-white text-sisley-text">
        <ErrorFallback
          error={error}
          reset={reset}
          title="Hubo un problema con la aplicación"
          message="Estamos trabajando para solucionarlo. Puedes reintentar o volver al inicio."
        />
      </body>
    </html>
  );
}

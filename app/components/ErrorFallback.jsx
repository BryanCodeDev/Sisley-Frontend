'use client';

export default function ErrorFallback({ error, reset, title = 'Algo salió mal', message }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-sisley-bg">
      <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-3">Error inesperado</p>
      <h2 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-sm text-sisley-text-secondary leading-relaxed max-w-md mb-8">
        {message || 'Ocurrió un problema al cargar esta sección. Puedes intentarlo de nuevo o volver más tarde.'}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {reset && (
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 text-[11px] uppercase tracking-widest text-white bg-sisley-black hover:bg-sisley-text transition-colors"
          >
            Reintentar
          </button>
        )}
        <a
          href="/"
          className="px-6 py-3 text-[11px] uppercase tracking-widest text-sisley-text border border-sisley-border hover:border-sisley-black transition-colors"
        >
          Volver al inicio
        </a>
      </div>
      {error && error.message && process.env.NODE_ENV !== 'production' && (
        <pre className="mt-8 max-w-lg w-full overflow-auto rounded bg-black/5 p-4 text-left text-xs text-sisley-muted">
          {error.message}
        </pre>
      )}
    </div>
  );
}

'use client';

export default function KPICard({ label, value, change, prefix = '', suffix = '', icon }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-sisley-white border border-sisley-border p-6 hover:border-sisley-border-strong transition-colors duration-200">
      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] uppercase tracking-widest text-sisley-muted">{label}</p>
        {icon && (
          <div className="p-2 bg-sisley-bg text-sisley-text-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </div>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-2">
        {prefix}{typeof value === 'number' ? value.toLocaleString('es-CO') : value}{suffix}
      </p>
      {change !== undefined && (
        <p className={`text-xs ${isPositive ? 'text-green-700' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% vs mes anterior
        </p>
      )}
    </div>
  );
}

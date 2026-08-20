'use client';

export default function StatCard({ label, value, change, suffix = '', prefix = '' }) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-sisley-white border border-sisley-gray-200 p-6 hover:border-sisley-gray-400 transition-colors duration-200">
      <p className="text-xs uppercase tracking-widest text-sisley-gray-400 mb-2">{label}</p>
      <p className="text-2xl md:text-3xl font-light text-sisley-black mb-2">
        {prefix}{typeof value === 'number' ? value.toLocaleString('es-CO') : value}{suffix}
      </p>
      {change !== undefined && (
        <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change}% vs mes anterior
        </p>
      )}
    </div>
  );
}

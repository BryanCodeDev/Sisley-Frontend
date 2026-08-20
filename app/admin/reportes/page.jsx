'use client';

import StatCard from '@/app/components/StatCard';
import { dashboardStats, monthlyRevenue } from '@/data/dashboard';

export default function AdminReportes() {
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
  const avgMonthly = Math.round(totalRevenue / monthlyRevenue.length);
  const bestMonth = [...monthlyRevenue].sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light text-sisley-text">Reportes</h1>
        <p className="text-sm text-sisley-text-secondary mt-1">Análisis y métricas del negocio</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        <StatCard label="Ingresos totales" value={totalRevenue} prefix="$" />
        <StatCard label="Promedio mensual" value={avgMonthly} prefix="$" />
        <StatCard label="Mejor mes" value={bestMonth.revenue} prefix="$" suffix={` (${bestMonth.month})`} />
        <StatCard label="Pedidos totales" value={dashboardStats.orders.total} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-sisley-white border border-sisley-border p-6">
          <h2 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-6">Ingresos mensuales</h2>
          <div className="h-64 flex items-end gap-2">
            {monthlyRevenue.map((item) => {
              const max = Math.max(...monthlyRevenue.map((r) => r.revenue));
              const height = (item.revenue / max) * 100;
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-sisley-border hover:bg-sisley-text-secondary transition-colors"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <span className="text-[10px] text-sisley-muted">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-sisley-white border border-sisley-border p-6">
          <h2 className="text-[11px] uppercase tracking-widest text-sisley-muted mb-6">Distribución por categoría</h2>
          <div className="space-y-4">
            {[
              { name: 'Hidratación', percentage: 35, color: 'bg-sisley-text' },
              { name: 'Tratamiento', percentage: 25, color: 'bg-sisley-text-secondary' },
              { name: 'Protección', percentage: 20, color: 'bg-sisley-muted' },
              { name: 'Limpieza', percentage: 12, color: 'bg-sisley-border-strong' },
              { name: 'Otros', percentage: 8, color: 'bg-sisley-border' },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-sisley-text">{item.name}</span>
                  <span className="text-sisley-text-secondary">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-sisley-bg">
                  <div
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

export default function ActivityList({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-4 py-3 border-b border-sisley-border last:border-0">
          <div className="w-8 h-8 bg-sisley-bg flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-sisley-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-sisley-text truncate">{item.title}</p>
            <p className="text-xs text-sisley-muted mt-0.5">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

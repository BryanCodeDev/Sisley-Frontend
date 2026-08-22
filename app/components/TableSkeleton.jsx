'use client';

export default function TableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-sisley-gray-200">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="py-3 px-4 text-xs uppercase tracking-widest text-sisley-gray-500 font-medium">
                <div className="h-3 w-16 bg-sisley-border rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-sisley-gray-100">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  <div className="h-4 bg-sisley-border rounded animate-pulse" style={{ width: `${60 + ((rowIndex * colIndex) % 40)}%` }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

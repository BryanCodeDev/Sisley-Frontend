'use client';

export default function Table({ columns, data, emptyMessage = 'No hay datos para mostrar' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-sisley-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className="py-3 px-4 text-xs uppercase tracking-widest text-sisley-gray-500 font-medium"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-sisley-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                className="border-b border-sisley-gray-100 hover:bg-sisley-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4 text-sisley-gray-700">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

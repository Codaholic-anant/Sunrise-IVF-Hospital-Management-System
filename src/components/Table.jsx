export default function Table({ columns, data = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-teal-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-14 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <svg className="w-10 h-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M9 7a3 3 0 116 0 3 3 0 01-6 0M3 20a9 9 0 0118 0" />
                  </svg>
                  <p className="text-sm font-medium">No records found</p>
                  <p className="text-xs text-slate-300">Records will appear here once added.</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-teal-50/40 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3 whitespace-nowrap text-slate-700">
                    {col.render ? col.render(row) : row[col.key]}
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

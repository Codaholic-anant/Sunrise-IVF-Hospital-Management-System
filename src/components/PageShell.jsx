import { FiSearch, FiPlus } from 'react-icons/fi';
import Button from './Button';
import Table from './Table';

export default function PageShell({ title, columns, data = [], onAdd, addLabel = 'Add New', searchPlaceholder = 'Search...' }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage and view all {title.toLowerCase()} records</p>
        </div>
        {onAdd && (
          <Button onClick={onAdd}>
            <FiPlus /> {addLabel}
          </Button>
        )}
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

const styles = {
  active:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
  inactive:   'bg-slate-100 text-slate-500 border border-slate-200',
  pending:    'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed:  'bg-teal-50 text-teal-700 border border-teal-200',
  completed:  'bg-blue-50 text-blue-700 border border-blue-200',
  cancelled:  'bg-rose-50 text-rose-600 border border-rose-200',
  paid:       'bg-emerald-50 text-emerald-700 border border-emerald-200',
  unpaid:     'bg-rose-50 text-rose-600 border border-rose-200',
  partial:    'bg-amber-50 text-amber-700 border border-amber-200',
  available:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  low:        'bg-amber-50 text-amber-700 border border-amber-200',
  'out of stock': 'bg-rose-50 text-rose-600 border border-rose-200',
  normal:     'bg-blue-50 text-blue-700 border border-blue-200',
  abnormal:   'bg-rose-50 text-rose-600 border border-rose-200',
};

export default function StatusBadge({ status }) {
  const key = status?.toLowerCase();
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[key] || 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  );
}

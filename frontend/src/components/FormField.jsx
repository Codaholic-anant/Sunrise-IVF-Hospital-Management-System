export default function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

const cls = 'w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all';

export function Input(props) {
  return <input className={cls} {...props} />;
}

export function Select({ children, ...props }) {
  return <select className={cls} {...props}>{children}</select>;
}

export function Textarea(props) {
  return <textarea className={`${cls} resize-none`} rows={3} {...props} />;
}

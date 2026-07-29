const palette = {
  teal:   { bar: 'bg-teal-500',   icon: 'bg-teal-50 text-teal-600',   val: 'text-teal-700'   },
  green:  { bar: 'bg-emerald-500',icon: 'bg-emerald-50 text-emerald-600', val: 'text-emerald-700' },
  violet: { bar: 'bg-violet-500', icon: 'bg-violet-50 text-violet-600', val: 'text-violet-700' },
  amber:  { bar: 'bg-amber-500',  icon: 'bg-amber-50 text-amber-600',  val: 'text-amber-700'  },
  // legacy aliases so existing pages still work
  blue:   { bar: 'bg-teal-500',   icon: 'bg-teal-50 text-teal-600',   val: 'text-teal-700'   },
  purple: { bar: 'bg-violet-500', icon: 'bg-violet-50 text-violet-600', val: 'text-violet-700' },
  orange: { bar: 'bg-amber-500',  icon: 'bg-amber-50 text-amber-600',  val: 'text-amber-700'  },
};

export default function Card({ title, value, icon, color = 'teal' }) {
  const c = palette[color] || palette.teal;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 relative overflow-hidden">
      {/* Left color bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${c.bar}`} />
      <div className={`p-3 rounded-xl text-xl ml-2 ${c.icon}`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{title}</p>
        <p className={`text-2xl font-bold mt-0.5 ${c.val}`}>{value}</p>
      </div>
    </div>
  );
}

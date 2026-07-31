const variants = {
  primary:   'bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-200',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  danger:    'bg-rose-500 hover:bg-rose-600 text-white',
  outline:   'border border-teal-600 text-teal-600 hover:bg-teal-50',
};

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

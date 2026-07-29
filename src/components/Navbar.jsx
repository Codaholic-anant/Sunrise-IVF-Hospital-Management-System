import { FiBell, FiMenu, FiUser, FiChevronDown } from 'react-icons/fi';
import { BRAND } from '../config/brand';

export default function Navbar({ onMenuClick,role = BRAND.appName }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm shrink-0">
      <button
        onClick={onMenuClick}
        className="text-slate-500 hover:text-teal-600 transition-colors lg:hidden"
      >
        <FiMenu size={22} />
      </button>

      {/* Page breadcrumb area — left side on desktop */}
      <div className="hidden lg:flex items-center gap-2 text-sm text-slate-400">
        <img src={BRAND.logoUrl} alt={`${BRAND.hospitalName} logo`} className="h-7 w-7 object-contain" />
        <span className="text-teal-600 font-semibold text-base">{BRAND.appName}</span>
        <span className="text-slate-300">|</span>
        <span>{role}</span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all">
          <FiBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* User */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white shrink-0">
            <FiUser size={15} />
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-slate-700 group-hover:text-teal-600 transition-colors">
  {role}
</p>

<p className="text-[11px] text-slate-400">
  {role}
</p>
          </div>
          <FiChevronDown size={14} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

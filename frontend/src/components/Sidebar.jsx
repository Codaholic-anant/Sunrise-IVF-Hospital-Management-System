import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiUserCheck, FiCalendar, FiLayers,
  FiShoppingBag, FiActivity, FiDollarSign, FiBarChart2,
  FiSettings, FiLogOut, FiShield,
} from 'react-icons/fi';
import { BRAND } from '../config/brand';

const links = [
  { to: '/dashboard',    icon: <FiGrid />,        label: 'Dashboard'    },
  { to: '/patients',     icon: <FiUsers />,       label: 'Patients'     },
  { to: '/doctors',      icon: <FiUserCheck />,   label: 'Doctors'      },
  { to: '/appointments', icon: <FiCalendar />,    label: 'Appointments' },
  { to: '/departments',  icon: <FiLayers />,      label: 'Departments'  },
  { to: '/pharmacy',     icon: <FiShoppingBag />, label: 'Pharmacy'     },
  { to: '/laboratory',   icon: <FiActivity />,    label: 'Laboratory'   },
  { to: '/billing',      icon: <FiDollarSign />,  label: 'Billing'      },
  { to: '/reports',      icon: <FiBarChart2 />,   label: 'Reports'      },
  { to: '/admins',       icon: <FiShield />,      label: 'Admins'       },
  { to: '/settings',     icon: <FiSettings />,    label: 'Settings'     },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-62 bg-slate-900 z-30 flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-700/60">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-1">
            <img src={BRAND.logoUrl} alt={`${BRAND.hospitalName} logo`} className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-base tracking-wide">{BRAND.shortName}</p>
            <p className="text-teal-400 text-[10px] font-semibold tracking-widest uppercase">{BRAND.tagline}</p>
          </div>
        </div>

        {/* Section label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest">Main Menu</p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-teal-500/20 text-teal-400 border-l-2 border-teal-400 pl-[10px]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`
              }
            >
              <span className="text-base shrink-0">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-700/60">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all">
            <FiLogOut className="text-base" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign, FiActivity, FiBarChart2 } from 'react-icons/fi';
import Table from '../components/Table';
import useLocalStorage from '../hooks/useLocalStorage';

const columns = [
  { key: 'module',    label: 'Module'        },
  { key: 'total',     label: 'Total Records' },
  { key: 'paid',      label: 'Paid / Active' },
  { key: 'pending',   label: 'Pending'       },
];

export default function Reports() {
  const [patients]     = useLocalStorage('hms_patients');
  const [doctors]      = useLocalStorage('hms_doctors');
  const [appointments] = useLocalStorage('hms_appointments');
  const [bills]        = useLocalStorage('hms_billing');
  const [medicines]    = useLocalStorage('hms_pharmacy');
  const [tests]        = useLocalStorage('hms_laboratory');

  const totalRevenue   = bills.reduce((s, b) => s + parseFloat(b.paid || 0), 0);

  const summaryCards = [
    { label: 'Total Patients',     value: patients.length,     icon: <FiUsers />,      color: 'bg-teal-50 text-teal-600'       },
    { label: 'Total Doctors',      value: doctors.length,      icon: <FiUserCheck />,  color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Appointments',       value: appointments.length, icon: <FiCalendar />,   color: 'bg-violet-50 text-violet-600'   },
    { label: 'Revenue Collected',  value: `$${totalRevenue.toFixed(2)}`, icon: <FiDollarSign />, color: 'bg-amber-50 text-amber-600' },
    { label: 'Lab Tests',          value: tests.length,        icon: <FiActivity />,   color: 'bg-blue-50 text-blue-600'       },
    { label: 'Invoices',           value: bills.length,        icon: <FiBarChart2 />,  color: 'bg-rose-50 text-rose-500'       },
  ];

  const tableData = [
    { module: 'Patients',     total: patients.length,     paid: patients.filter(p => p.status === 'Active').length,         pending: patients.filter(p => p.status === 'Inactive').length },
    { module: 'Doctors',      total: doctors.length,      paid: doctors.filter(d => d.status === 'Active').length,          pending: doctors.filter(d => d.status !== 'Active').length },
    { module: 'Appointments', total: appointments.length, paid: appointments.filter(a => a.status === 'Completed').length,  pending: appointments.filter(a => a.status === 'Pending').length },
    { module: 'Billing',      total: bills.length,        paid: bills.filter(b => b.status === 'Paid').length,              pending: bills.filter(b => b.status === 'Unpaid').length },
    { module: 'Pharmacy',     total: medicines.length,    paid: medicines.filter(m => m.status === 'Available').length,     pending: medicines.filter(m => m.status !== 'Available').length },
    { module: 'Laboratory',   total: tests.length,        paid: tests.filter(t => t.status === 'Completed').length,         pending: tests.filter(t => t.status === 'Pending').length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Reports</h2>
        <p className="text-xs text-slate-400 mt-0.5">Live overview of hospital data from local storage</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {summaryCards.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center gap-2 text-center">
            <div className={`p-2.5 rounded-xl text-lg ${color}`}>{icon}</div>
            <p className="text-xs text-slate-500 font-medium leading-tight">{label}</p>
            <p className="text-xl font-bold text-slate-700">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Module Breakdown</h3>
        </div>
        <Table columns={columns} data={tableData} />
      </div>
    </div>
  );
}

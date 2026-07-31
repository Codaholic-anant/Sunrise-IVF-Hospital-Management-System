import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Table from '../components/Table';
import StatusBadge from '../components/StatusBadge';
import useLocalStorage from '../hooks/useLocalStorage';

const patientColumns = [
  { key: 'id',     label: 'ID'     },
  { key: 'name',   label: 'Name'   },
  { key: 'age',    label: 'Age'    },
  { key: 'gender', label: 'Gender' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

const appointmentColumns = [
  { key: 'patient', label: 'Patient' },
  { key: 'doctor',  label: 'Doctor'  },
  { key: 'date',    label: 'Date'    },
  { key: 'time',    label: 'Time'    },
  { key: 'status',  label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [patients]     = useLocalStorage('hms_patients');
  const [doctors]      = useLocalStorage('hms_doctors');
  const [appointments] = useLocalStorage('hms_appointments');
  const [bills]        = useLocalStorage('hms_billing');

  const today = new Date().toLocaleDateString();
  const todayAppts = appointments.filter((a) => a.date === today);
  const totalRevenue = bills.reduce((s, b) => s + parseFloat(b.paid || 0), 0);

  const stats = [
    { title: 'Total Patients',        value: patients.length,     icon: <FiUsers />,      color: 'teal'   },
    { title: 'Total Doctors',         value: doctors.length,      icon: <FiUserCheck />,  color: 'green'  },
    { title: "Today's Appointments",  value: todayAppts.length,   icon: <FiCalendar />,   color: 'violet' },
    { title: 'Revenue Collected',     value: `$${totalRevenue.toFixed(2)}`, icon: <FiDollarSign />, color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, Super Admin. Here's what's happening today.</p>
      </div>

      {/* Live Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => <Card key={s.title} {...s} />)}
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Recent Patients</h3>
          <span onClick={() => navigate('/patients')} className="text-xs text-teal-600 font-medium cursor-pointer hover:underline">View all →</span>
        </div>
        <Table columns={patientColumns} data={[...patients].reverse().slice(0, 5)} />
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Today's Appointments</h3>
          <span onClick={() => navigate('/appointments')} className="text-xs text-teal-600 font-medium cursor-pointer hover:underline">View all →</span>
        </div>
        <Table columns={appointmentColumns} data={todayAppts} />
      </div>
    </div>
  );
}







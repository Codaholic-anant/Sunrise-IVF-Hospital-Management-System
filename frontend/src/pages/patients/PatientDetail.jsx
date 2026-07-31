import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiPhone, FiMail, FiMapPin, FiDroplet, FiUser, FiCalendar } from 'react-icons/fi';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patients] = useLocalStorage('hms_patients');
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="space-y-5">
        <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors">
          <FiArrowLeft size={16} /> Back to Patients
        </button>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center">
          <p className="text-slate-400 text-sm">Patient record not found.</p>
          <p className="text-slate-300 text-xs mt-1">ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={() => navigate('/patients')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors">
        <FiArrowLeft size={16} /> Back to Patients
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-2xl font-bold shrink-0">
          {patient.name?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800">{patient.name}</h2>
          <p className="text-sm text-slate-400">{patient.id} · {patient.gender} · {patient.age} yrs</p>
          <div className="mt-2"><StatusBadge status={patient.status} /></div>
        </div>
        <Button onClick={() => navigate('/patients')} variant="secondary"><FiEdit2 size={14} /> Edit Patient</Button>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-3">Personal Information</h3>
          {[
            { icon: <FiPhone />,   label: 'Phone',       value: patient.phone      },
            { icon: <FiMail />,    label: 'Email',       value: patient.email      },
            { icon: <FiMapPin />,  label: 'Address',     value: patient.address    },
            { icon: <FiDroplet />, label: 'Blood Group', value: patient.bloodGroup },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-teal-500 mt-0.5">{icon}</span>
              <div>
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm text-slate-700 font-medium">{value || '—'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-100 pb-3">Medical Information</h3>
          {[
            { icon: <FiUser />,     label: 'Assigned Doctor',  value: patient.doctor },
            { icon: <FiCalendar />, label: 'Registered Date',  value: patient.date   },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-teal-500 mt-0.5">{icon}</span>
              <div>
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm text-slate-700 font-medium">{value || '—'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

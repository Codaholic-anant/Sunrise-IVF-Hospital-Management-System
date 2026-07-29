import { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input, Select } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const empty = { patient: '', doctor: '', date: '', time: '', type: 'Consultation', notes: '', status: 'Pending' };
const types = ['Consultation','Follow-up','Emergency','Surgery','Lab Test','Checkup'];
const statuses = ['All','Pending','Confirmed','Completed','Cancelled'];

export default function Appointments() {
  const [appointments, setAppointments] = useLocalStorage('hms_appointments');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (a) => { setEditing(a); setForm(a); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setAppointments(appointments.map((a) => (a.id === editing.id ? { ...form, id: editing.id } : a)));
    } else {
      setAppointments([...appointments, { ...form, id: genId('A') }]);
    }
    setModal(false);
  };

  const updateStatus = (id, status) =>
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));

  const handleDelete = (id) => {
    if (confirm('Cancel this appointment?')) setAppointments(appointments.filter((a) => a.id !== id));
  };

  const filtered = appointments.filter((a) => {
    const matchSearch = a.patient?.toLowerCase().includes(search.toLowerCase()) || a.doctor?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const columns = [
    { key: 'id',      label: 'Appt. ID' },
    { key: 'patient', label: 'Patient'  },
    { key: 'doctor',  label: 'Doctor'   },
    { key: 'date',    label: 'Date'     },
    { key: 'time',    label: 'Time'     },
    { key: 'type',    label: 'Type'     },
    { key: 'status',  label: 'Status',  render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-1.5">
          {r.status === 'Pending' && (
            <button onClick={() => updateStatus(r.id, 'Confirmed')} title="Confirm"
              className="p-1.5 rounded-lg text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all"><FiCheck size={15} /></button>
          )}
          {r.status === 'Confirmed' && (
            <button onClick={() => updateStatus(r.id, 'Completed')} title="Mark Completed"
              className="p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"><FiCheck size={15} /></button>
          )}
          <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all"><FiEdit2 size={15} /></button>
          <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"><FiX size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Appointments</h2>
          <p className="text-xs text-slate-400 mt-0.5">Schedule and manage appointments · {appointments.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Book Appointment</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or doctor..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${filterStatus === s ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-400'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Appointment' : 'Book Appointment'} onClose={() => setModal(false)} size="lg">
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Patient Name"><Input required placeholder="Patient full name" value={form.patient} onChange={f('patient')} /></FormField>
            <FormField label="Doctor"><Input required placeholder="Dr. Name" value={form.doctor} onChange={f('doctor')} /></FormField>
            <FormField label="Date"><Input required type="date" value={form.date} onChange={f('date')} /></FormField>
            <FormField label="Time"><Input required type="time" value={form.time} onChange={f('time')} /></FormField>
            <FormField label="Type">
              <Select value={form.type} onChange={f('type')}>
                {types.map(t => <option key={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Status">
              <Select value={form.status} onChange={f('status')}>
                <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
              </Select>
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Notes"><Input placeholder="Additional notes (optional)" value={form.notes} onChange={f('notes')} /></FormField>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Book Appointment'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

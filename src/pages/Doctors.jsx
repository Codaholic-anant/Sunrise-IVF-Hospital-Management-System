import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import FormField, { Input, Select } from '../components/FormField';
import useLocalStorage from '../hooks/useLocalStorage';
import { genId } from '../utils/genId';

const empty = { name: '', specialization: '', department: '', phone: '', email: '', experience: '', status: 'Active' };
const specializations = ['Cardiology','Neurology','Orthopedics','Pediatrics','Dermatology','Oncology','Radiology','General Surgery','Internal Medicine','Gynecology'];
const departments = ['Cardiology','Neurology','Orthopedics','Pediatrics','Emergency','ICU','Pharmacy','Laboratory','Radiology','General'];

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useLocalStorage('hms_doctors');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState('');

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const openAdd  = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (d) => { setEditing(d); setForm(d); setModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setDoctors(doctors.map((d) => (d.id === editing.id ? { ...form, id: editing.id } : d)));
    } else {
      setDoctors([...doctors, { ...form, id: genId('D') }]);
    }
    setModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this doctor?')) setDoctors(doctors.filter((d) => d.id !== id));
  };

  const filtered = doctors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase()) ||
    d.department?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'id',             label: 'Doctor ID'      },
    { key: 'name',           label: 'Full Name'      },
    { key: 'specialization', label: 'Specialization' },
    { key: 'department',     label: 'Department'     },
    { key: 'phone',          label: 'Phone'          },
    { key: 'experience',     label: 'Experience'     },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/doctors/${r.id}`)} className="p-1.5 rounded-lg text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-all"><FiEye size={15} /></button>
          <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all"><FiEdit2 size={15} /></button>
          <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"><FiTrash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Doctors</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage all doctor records · {doctors.length} total</p>
        </div>
        <Button onClick={openAdd}><FiPlus /> Add Doctor</Button>
      </div>

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, specialization..."
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table columns={columns} data={filtered} />
      </div>

      {modal && (
        <Modal title={editing ? 'Edit Doctor' : 'Add New Doctor'} onClose={() => setModal(false)} size="lg">
          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full Name"><Input required placeholder="Dr. John Smith" value={form.name} onChange={f('name')} /></FormField>
            <FormField label="Specialization">
              <Select value={form.specialization} onChange={f('specialization')} required>
                <option value="">Select specialization</option>
                {specializations.map(s => <option key={s}>{s}</option>)}
              </Select>
            </FormField>
            <FormField label="Department">
              <Select value={form.department} onChange={f('department')} required>
                <option value="">Select department</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </Select>
            </FormField>
            <FormField label="Experience"><Input placeholder="e.g. 5 years" value={form.experience} onChange={f('experience')} /></FormField>
            <FormField label="Phone"><Input required placeholder="+1 555 000 0000" value={form.phone} onChange={f('phone')} /></FormField>
            <FormField label="Email"><Input type="email" required placeholder="doctor@hospital.com" value={form.email} onChange={f('email')} /></FormField>
            <FormField label="Status">
              <Select value={form.status} onChange={f('status')}>
                <option>Active</option><option>Inactive</option><option>On Leave</option>
              </Select>
            </FormField>
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit">{editing ? 'Save Changes' : 'Add Doctor'}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
